import React, { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { ApiData, ApiResponse } from "../../common/interfaces/apiRequests"
import { FormDataItem, RequestDataType, TimeOutType } from "../../common/constants/enums/variableEnums";
import getNonce from "../../common/utilities/getNonce"
import { HttpMethod, Https } from "../../common/constants/enums/methodsEnums";
import populateInputFormData from "../monaco/populateInputFromText";
import formDefaultText from "../monaco/formDefaultText";
import saveRequestHandler from "../handler/eventHandler/apis/saveRequestHandler";
import generateResponseHandler from "../handler/eventHandler/apis/generateResponseHandler";
import getResponseFromNonceHandler from "../handler/eventHandler/apis/getResponseFromNonceHandler";


function getDefaultReqValue(rawCode: string): ApiData {
    return {
        url: "",
        nonce: getNonce(),
        name: '',
        method: HttpMethod.GET,
        https: Https["HTTP/1.1"],
        path: {},
        params: [{
            key: "",
            value: "",
            enabled: true,
        }],
        headers: [{
            key: "",
            value: "",
            enabled: true,
        }],
        rawCode: rawCode,
        requestCookies: [],
        timeout: 30,
        timeoutType: TimeOutType.s,
        requestDataType: RequestDataType.none,
        json: undefined,
        xml: undefined,
        js: undefined,
        html: undefined,
        text: undefined,
        formData: [{
            enabled: true,
            key: "",
            value: "",
            type: FormDataItem.text
        }],
        urlEncoded: [{
            key: "",
            value: "",
            enabled: true,
        }],
        binary: undefined,
        tests: [],
        examples: []
    }
}

export const RequestContext = createContext<{
    data: ApiData,
    response: ApiResponse | null,
    setData: React.Dispatch<ApiData>,
    init: boolean,
    invoke: () => void,
    processing: boolean,
}>({
    data: getDefaultReqValue(""),
    setData: () => { },
    init: false,
    response: null,
    invoke: () => { },
    processing: false,
})

export default function RequestProvider({ children, raw, index }: {
    children: ReactElement,
    raw: string,
    index: number
}) {
    let [init, setInit] = useState(false);

    let [processing, setProcessing] = useState(false);
    let [apiData, setApiData] = useState<ApiData>(getDefaultReqValue(raw))
    let [response, setResponse] = useState<ApiResponse | null>(null)

    async function invoke() {
        setProcessing(true)
        generateResponseHandler({ data: apiData }).then((a) => {
            setResponse(a)
            setProcessing(false)
        })
    }

    useEffect(() => {
        if (apiData.rawCode.length != 0) {
            populateInputFormData(apiData, setApiData)
        }
        setInit(true)
    }, [])

    useEffect(() => {
        getResponseFromNonceHandler(apiData.nonce).then((x) => {
            setResponse(x);
        })
    }, [apiData.nonce])

    useEffect(() => {
        if (init) {
            const regex = /#\{(.*?)\}/g;
            const matches = [];
            let match;
            while ((match = regex.exec(apiData.url)) !== null) {
                matches.push(match[1]);
            }
            let p = apiData.path
            matches.map((x) => {
                if (!(x in p)) {
                    p[x] = "";
                }
            })
            for (let x in p) {
                if (!matches.includes(x)) {
                    delete p[x];
                }
            }
            apiData.path = p
            let u = apiData.url
            for (let x in apiData.path) {
                if (apiData.path[x].trim().length !== 0) {
                    u = u.replace(`#{${x}}`, apiData.path[x])
                }
            }
            try {
                const parsedUrl = new URL(u);
                apiData.params.forEach((v) => {
                    if (v.enabled && v.key.trim() !== "" && v.value.trim() !== "") {
                        parsedUrl.searchParams.append(v.key, v.value);
                    }
                });
                setApiData({ ...apiData });
            } catch (err) {
            }
            let rawCode = formDefaultText(apiData)
            apiData.rawCode = rawCode
            setApiData({ ...apiData });
        }
    }, [
        apiData.url,
        apiData.name,
        apiData.method,
        apiData.https,
        apiData.params,
        apiData.headers,
        apiData.path,
        apiData.requestCookies,
        apiData.timeout,
        apiData.timeoutType,
        apiData.requestDataType,
        apiData.json,
        apiData.xml,
        apiData.js,
        apiData.html,
        apiData.text,
        apiData.formData,
        apiData.urlEncoded,
        apiData.binary,
    ])


    useEffect(() => {
        if (init) {
            saveRequestHandler(apiData, index)
            populateInputFormData(apiData, setApiData)
        }
    }, [apiData.rawCode])

    return <RequestContext.Provider value={{
        data: apiData,
        setData: setApiData,
        init,
        response,
        invoke,
        processing,
    }}>
        {children}
    </RequestContext.Provider>
}

