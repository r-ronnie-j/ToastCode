import React, { useContext, useState } from "react"
import { ConfigurationContext } from "../context/configurationProvider"
import { getThemeColors } from "../themes/getThemeColors"
import { RequestContext } from "../context/requestContext"
import { HttpMethod, Methods } from "../../common/constants/enums/methodsEnums"
import BarInputSuggestions from "../component/Input/BarInputSuggestions"
import AwesomeButton from "../component/Button/AwesomButton"
import SecondaryTopBar from "../component/Topbar/SecondaryTopBar"
import CopyableText from "./responseWidget/copyableText"
import KeyValueRenderer from "./responseWidget/keyValueRenderer"
import CookieRenderer from "./responseWidget/cookieRenderer"
import ResponseViewer from "./responseWidget/responseViewer"
import saveContentHandler from "../handler/eventHandler/fileHandler/saveContentHandler"
import saveRequestHandler from "../handler/eventHandler/apis/saveRequestHandler"


export default function ResponseComponent({ requestIndex }: { requestIndex: number }) {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)
    let api = useContext(RequestContext)
    let [name, setName] = useState("")
    let [secondary, setSecondary] = useState(0)

    async function saveExample() {
        let file = await saveContentHandler({
            name: name,
            req: api.data,
            res: api.response,
        })
        if (typeof file === 'string') {
            if (api.data.examples.findIndex((a) => a.path === file) === -1) {
                api.data.examples.push({
                    name: name,
                    path: file,
                });
                saveRequestHandler(api.data, requestIndex);
                setName("");
                api.setData({ ...api.data });
            }
        }
    }

    const renderInputValue = () => {
        const parts = api.data.url.split(/(\$\{.*?\}|\#\{.*?\})/g);

        return parts.map((part, index) => {
            if (!part) return null;
            if (part.startsWith("${") && part.endsWith("}")) {
                return (
                    <span key={index} style={{ color: theme.infoColor }}>
                        {part}
                    </span>
                );
            }
            if (part.startsWith("#{") && part.endsWith("}")) {
                return (
                    <span key={index} style={{ color: theme.accentColor }}>
                        {api.data.path[part.replace("#{", "").replace("}", "")]}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    if (api.response === null) {
        if (api.processing) {
            return (
                <div style={{
                    padding: '20px',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        color: theme.accentColor,
                        marginTop: '10px'
                    }}>Processing...</h3>
                    <p style={{
                        fontSize: '16px',
                        color: theme.generalText
                    }}>Your request is being processed. Click to cancel.</p>
                </div>
            );
        } else {
            return (
                <div style={{ padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ color: theme.primaryContainer }}>Not Invoked Yet</h3>
                    <p style={{ fontSize: '16px', color: theme.generalText }}>It seems like the API request has not been triggered yet.</p>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: theme.primaryContainer,
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }} onClick={() => {

                    }}>Invoke Request</button>
                </div>
            );
        }
    } else {
        return <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '10px',
                alignItems: 'center',
                width: "100%",
                fontSize: config.fontSize * 1.2,
                color: theme.generalText
            }}>
                <div style={{
                    color: Methods[HttpMethod[api.data.method] as keyof typeof Methods].colors[config.theme],
                    fontWeight: "bold",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    minWidth: "fit-content",
                    wordBreak: "keep-all"
                }}>{Methods[HttpMethod[api.data.method] as keyof typeof Methods].label}:</div>
                <div style={{
                    flexGrow: 1,
                    color: theme.generalText,
                    fontSize: config.fontSize,
                    fontWeight: "bold",
                    wordBreak: "break-all"
                }}>
                    <CopyableText text={api.response?.parsedUrl ?? ""}>
                        {renderInputValue()}
                    </CopyableText>
                </div>
                {api.response?.invoked && <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: theme.accentColor,
                    fontSize: "14px",
                    fontWeight: "500",
                    minWidth: "fit-content",
                    wordBreak: "keep-all"
                }}>
                    ⏱️ <span>:</span>
                    <span style={{ fontWeight: "bold" }}>{api.response.timeTaken} ms</span>
                </div>}
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                margin: "10px"
            }}>
                <div style={{
                    flexGrow: 3,
                    width: "10px",
                }}>
                    <BarInputSuggestions
                        value={name}
                        onSuggestionSelect={(x) => {
                            setName(x)
                        }}
                        suggestions={[]}
                        setValue={(x) => {
                            setName(x)
                        }}
                        placeholder="Save as Example ...."
                    />
                </div>
                {
                    name !== "" &&
                    <AwesomeButton
                        type="primary"
                        onClick={() => {
                            saveExample()
                        }}
                    >
                        Save
                    </AwesomeButton>
                }
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                marginTop: "10px",
                marginLeft: "10px",
                fontSize: config.fontSize,
            }}>
                <div>Status : <span style={{ color: theme.accentColor }}>
                    {api.response?.status}
                </span></div>
                <div>Status Text : <span style={{ color: theme.accentColor }}>
                    {api.response?.statusText}
                </span></div>
                <div>Size : <span style={{ color: theme.accentColor }}>
                    {api.response?.size}
                </span></div>
                <div>Mime-Type : <span style={{ color: theme.accentColor }}>
                    {api.response?.mime?.split(";").at(0)}
                </span></div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
            }}>
                <SecondaryTopBar
                    items={[
                        {
                            name: "Headers",
                            msg: 0,
                        },
                        {
                            name: "Set-Cookie",
                            msg: Object.values(api.data.path ?? {}).length,
                        },
                        {
                            name: "Body",
                            msg: 1,
                        },
                        {
                            name: "Cookie",
                            msg: 0
                        }
                    ]}
                    selectedIndex={secondary}
                    onSelect={setSecondary}
                />
            </div>
            {secondary === 0 && <KeyValueRenderer data={api.response.headers} title={["Key", "Value"]} />}
            {secondary === 1 && <CookieRenderer data={api.response.cookie} />}
            {secondary === 2 && <ResponseViewer res={null} />}
            {secondary === 3 && <CookieRenderer data={api.response.cookie} />}
        </div>
    }
}




