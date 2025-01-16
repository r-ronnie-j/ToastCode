import React, { useContext, useState } from "react"
import { ConfigurationContext } from "../context/configurationProvider";
import { getThemeColors } from "../themes/getThemeColors";
import { Https, Methods } from "../../common/constants/enums/methodsEnums";
import { TimeOutType } from "../../common/constants/enums/variableEnums";
import CustomSelect, { Option } from "../component/Select/CustomSelect";
import { RequestContext } from "../context/requestContext";
import RequestCodeComponent from "../component/CodeComponent/RequestCodeComponent";
import InputWithSuggestions from "../component/Input/InputWithSuggestions";
import AwesomeButton from "../component/Button/AwesomButton";
import DocumentedInput from "../component/Input/DocumentedInput";
import SecondaryTopBar from "../component/Topbar/SecondaryTopBar";
import RequestHeaders from "./requestWidget/requestHeaders";
import RequestPath from "./requestWidget/requestPath";
import RequestParams from "./requestWidget/requestParams";
import RequestBody from "./requestWidget/requestBody";
import RequestCookies from "./requestWidget/requestCookies";
import { generatorFuncDescriptions } from "../../common/generators/generatorDocumentation"
import RequestTests from "./requestWidget/requestTests";

export default function RequestComponent({ isCodeView, index }: { isCodeView: boolean, index: number }) {
    let config = useContext(ConfigurationContext);
    const theme = getThemeColors(config.theme);
    let allMethods: Option[] = Object.values(Methods).map(x => ({
        label: x.label,
        value: x.method,
        color: x.colors[config.theme]
    }));

    let allHttps: Option[] = Object.values(Https).filter((x) => typeof x !== 'number')
        .map((x, i) => ({
            label: x.toString(),
            value: i,
        }))
    let allTimeOut: Option[] = Object.values(TimeOutType).filter(x => typeof x !== 'number').map((x, i) => ({
        label: x.toString(),
        value: i,
    }))
    let configuration = useContext(ConfigurationContext);
    let requestData = useContext(RequestContext)
    let [secondary, setSecondary] = useState(0)

    if (isCodeView) {
        return <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: "100%",
            minHeight: "10px",
        }}>
            <RequestCodeComponent index={index} />
        </div>
    } else {
        return <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
                background: "transparent",
            }}>
                <div style={{ width: "110px" }}>
                    <CustomSelect
                        options={allMethods}
                        value={requestData.data.method}
                        onChange={(e) => {
                            requestData.data.method = e
                            requestData.setData({ ...requestData.data });
                        }}
                        theme={getThemeColors(configuration.theme)}
                    />
                </div>
                <div style={{
                    fontSize: `${configuration.fontSize}px`
                }}>Timeout : </div>
                <div style={{ width: "40px" }}>
                    <InputWithSuggestions
                        suggestions={[]}
                        onSuggestionSelect={() => { }}
                        inputValue={requestData.data.timeout}
                        setInputValue={(x) => {
                            requestData.data.timeout = x;
                            requestData.setData({ ...requestData.data });
                        }}
                    />
                </div>
                <div style={{ width: "5px" }}></div>
                <div style={{ width: "70px" }}>
                    <CustomSelect
                        options={allTimeOut}
                        value={requestData.data.timeoutType}
                        onChange={(e) => {
                            requestData.data.timeoutType = e
                            requestData.setData({ ...requestData.data })
                        }}
                        theme={getThemeColors(configuration.theme)}
                    />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "flex-end",
                    flexGrow: 1
                }}>
                    <div style={{ width: "100px" }}>
                        <CustomSelect
                            options={allHttps}
                            value={requestData.data.https}
                            onChange={(e) => {
                                requestData.data.https = e
                                requestData.setData({ ...requestData.data })
                            }}
                            theme={getThemeColors(configuration.theme)}
                            styles={{
                                border: "none"
                            }}
                        />
                    </div>
                    <AwesomeButton
                        type="primary"
                        onClick={() => {
                            requestData.invoke()
                        }}
                    >
                        Send
                    </AwesomeButton>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
            }}>
                <div style={{
                    fontWeight: "bold",
                    fontSize: `${config.fontSize * 1.2}px`,
                    color: theme.primaryContainer,
                    wordBreak: "keep-all"
                }}>URL : </div>
                <div style={{ flexGrow: 1 }}><DocumentedInput
                    suggestions={generatorFuncDescriptions}
                    placeholder={" Enter URL"}
                    inputValue={requestData.data.url}
                    setInputValue={(x) => {
                        requestData.data.url = x;
                        requestData.setData({ ...requestData.data });
                    }}
                />
                </div>
            </div>
            <SecondaryTopBar
                items={[
                    {
                        name: "Headers",
                        msg: Object.values(requestData.data.headers ?? {}).length,
                    },
                    {
                        name: "Path",
                        msg: Object.values(requestData.data.path ?? {}).length,
                    },
                    {
                        name: "Params",
                        msg: Object.keys(requestData.data.params ?? {}).length,
                    },
                    {
                        name: "Body",
                        msg: 0
                    },
                    {
                        name: "Cookie",
                        msg: Object.keys(requestData.data.requestCookies ?? {}).length
                    },
                    {
                        name: "Tests",
                        msg: 0
                    }
                ]}
                selectedIndex={secondary}
                onSelect={setSecondary}
            />
            {secondary === 0 && <RequestHeaders />}
            {secondary === 1 && <RequestPath />}
            {secondary === 2 && <RequestParams />}
            {secondary === 3 && <RequestBody />}
            {secondary === 4 && <RequestCookies />}
            {secondary === 5 && <RequestTests />}
        </div>
    }
}