import React, { useContext, useEffect, useState } from "react"
import BodyNone from "./BodyWidget/BodyNone"
import BodyFormData from "./BodyWidget/BodyFormData"
import BodyUrlEncoded from "./BodyWidget/BodyUrlEncoded"
import BodyBinary from "./BodyWidget/BodyBinary"
import BodyRaw from "./BodyWidget/BodyRaw"
import { RequestContext } from "../../context/requestContext"
import { RequestDataType } from "../../../common/constants/enums/variableEnums"
import HorizontalRadioGroup from "../../component/Select/HorizontalSelect"
import SimpleSelectBox from "../../component/Select/SimpleSelect"

export default function RequestBody() {
    let [bodyType, setBodyType] = useState(1)
    let [raw, setRaw] = useState(0)
    let requestData = useContext(RequestContext)

    useEffect(() => {
        let requestType = RequestDataType.none
        if (bodyType === 0) requestType = RequestDataType.none
        else if (bodyType === 1) requestType = RequestDataType.formData
        else if (bodyType === 2) requestType = RequestDataType.urlEncoded
        else if (bodyType === 3) requestType = RequestDataType.binary
        else {
            if (raw === 0) requestType = RequestDataType.rawJson
            else if (raw === 1) requestType = RequestDataType.rawXml
            else if (raw === 2) requestType = RequestDataType.rawText
            else if (raw === 3) requestType = RequestDataType.rawHtml
            else if (raw === 4) requestType = RequestDataType.rawJs
        }
        requestData.data.requestDataType = requestType;
        requestData.setData({ ...requestData.data });
    }, [bodyType, raw])

    return <div style={{
        borderRadius: "4px",
        marginTop: '10px',
    }}>
        <div style={{
            display: 'flex',
        }}>
            <HorizontalRadioGroup
                onChange={(x) => setBodyType(x)}
                options={[
                    {
                        label: "None",
                        value: 0
                    },
                    {
                        label: "Form-Data",
                        value: 1
                    },
                    {
                        label: "URL-Encoded",
                        value: 2
                    },
                    {
                        label: "Binary",
                        value: 3
                    },
                    {
                        label: 'Raw',
                        value: 4
                    }
                ]}
                selectedValue={bodyType}
            />
            {
                bodyType === 4 &&
                <div style={{
                    width: "120px",
                    display: "flex",
                    flexDirection: 'row'
                }}>
                    <SimpleSelectBox
                        options={[
                            {
                                label: "json",
                                value: 0
                            },
                            {
                                label: "xml",
                                value: 1
                            },
                            {
                                label: "text",
                                value: 2
                            },
                            {
                                label: "html",
                                value: 3
                            },
                            {
                                label: "javascript",
                                value: 4
                            }
                        ]}
                        flex={1}
                        selectedValue={raw}
                        setSelectedValue={(value) => {
                            setRaw(value)
                        }}
                    />
                </div>
            }
        </div>
        {bodyType === 0 && <BodyNone />}
        {bodyType === 1 && <BodyFormData />}
        {bodyType === 2 && <BodyUrlEncoded />}
        {bodyType === 3 && <BodyBinary />}
        {bodyType === 4 && <BodyRaw raw={raw} />}
    </div>
}