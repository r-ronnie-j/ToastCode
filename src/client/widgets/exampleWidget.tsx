import React, { useContext, useEffect, useState } from "react";
import { ConfigurationContext } from "../context/configurationProvider";
import { getThemeColors } from "../themes/getThemeColors";
import { RequestContext } from "../context/requestContext";
import CustomSelect from "../component/Select/CustomSelect";
import SecondaryTopBar from "../component/Topbar/SecondaryTopBar";
import KeyValueRenderer from "./responseWidget/keyValueRenderer";
import CookieRenderer from "./responseWidget/cookieRenderer";
import ResponseViewer from "./responseWidget/responseViewer";
import { ApiData, ApiResponse } from "../../common/interfaces/apiRequests";
import loadExampleHandler from "../handler/eventHandler/examples/loadExampleHandler";
import BodyViewer from "./exampleWidget/bodyViewer";
import { getRequestTypeString, HttpMethod, Methods } from "../../common/constants/enums/methodsEnums";
import CopyableText from "./responseWidget/copyableText";
import DeleteButton from "../component/Button/DeleteConfirmButton";
import fileDeleteHandler from "../handler/eventHandler/fileHandler/deleteFileHandler";

function arrayToObject(arr: { key: string; value: string }[]): Record<string, string> {
    let accumulator: any = {}
    for (let x of arr) {
        if (!(x.key.trim().length === 0 && x.value.trim().length === 0)) {
            accumulator[x.key] = x.value
        }
    }
    return accumulator;
}

export default function ExampleWidget() {
    const config = useContext(ConfigurationContext);
    const theme = getThemeColors(config.theme);

    const [exampleIndex, setExampleIndex] = useState(0)

    const api = useContext(RequestContext)

    async function deleteExample() {
        await fileDeleteHandler(api.data.examples[exampleIndex].path)
        api.data.examples.splice(exampleIndex, 1);
        api.setData({ ...api.data });
        if (exampleIndex !== 0) {
            setExampleIndex(exampleIndex - 1)
        }
    }

    useEffect(() => {
        if (exampleIndex < api.data.examples.length) {
            loadExampleHandler(api.data.examples[exampleIndex].path).then((x) => {
                if (x !== null) {
                    setName(x.name)
                    setReq(x.req)
                    setRes(x.res)
                }
            })
        }
    }, [
        exampleIndex,
        api.data.examples
    ])

    let [name, setName] = useState("");
    let [req, setReq] = useState<ApiData | null>(null);
    let [res, setRes] = useState<ApiResponse | null>(null);

    let [reqIndex, setReqIndex] = useState(0)
    let [resIndex, setResIndex] = useState(0)

    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1200);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 1200);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (api.data.examples.length === 0 || req === null || res === null) {
        return <div
            style={{
                textAlign: "center",
                width: "100%",
                padding: "20px",
                marginTop: "50px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: theme.generalText,
                borderRadius: "10px",
                maxWidth: "400px",
                margin: "auto",
            }}
        >
            <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
                No Saved Examples
            </p>
            <p style={{ fontSize: "14px", color: "#888" }}>
                You haven’t saved any examples yet. Start adding some to see them here!
            </p>
        </div>
    } else {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        marginRight: "30px",
                        minWidth: "250px",
                        maxWidth: "250px",
                    }}>
                        <CustomSelect
                            options={api.data.examples.map((x, i) => ({
                                label: x.name,
                                value: i
                            })) ?? []}
                            theme={theme}
                            onChange={(x) => {
                                setExampleIndex(x);
                            }}
                            value={exampleIndex}
                        />

                    </div>
                    <DeleteButton
                        onDelete={deleteExample}
                        timeoutSeconds={3}
                        title="Delete example"
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '10px',
                    alignItems: 'center',
                    padding: "0 10px",
                    fontSize: config.fontSize * 1.2,
                    color: theme.generalText
                }}>
                    <div style={{
                        color: Methods[HttpMethod[api.data.method] as keyof typeof Methods].colors[config.theme],
                        fontWeight: "bold"
                    }}>{Methods[HttpMethod[api.data.method] as keyof typeof Methods].label} : </div>
                    <div style={{
                        flexGrow: 1,
                        color: theme.generalText,
                        fontSize: config.fontSize,
                        fontWeight: "bold",
                    }}>
                        <CopyableText text={res.parsedUrl ?? ""} >
                            {res.parsedUrl}
                        </CopyableText>
                    </div>
                    {api.response?.invoked && (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            color: theme.accentColor,
                            fontSize: "14px",
                            fontWeight: "500",
                        }}>
                            ⏱️ : 
                            <span style={{ fontWeight: "bold" }}>{api.response.timeTaken} ms</span>
                        </div>
                    )}

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
                        {res.status}
                    </span></div>
                    <div>Status Text : <span style={{ color: theme.accentColor }}>
                        {res.statusText}
                    </span></div>
                    <div>Size : <span style={{ color: theme.accentColor }}>
                        {res.size}
                    </span></div>
                    <div>Mime-Type : <span style={{ color: theme.accentColor }}>
                        {res.mime?.split(";").at(0)}
                    </span></div>
                    <div>Mime-Type : <span style={{ color: theme.accentColor }}>
                        {res.mime?.split(";").at(0)}
                    </span></div>
                </div>
                <div style={{
                    display: isWideScreen ? "flex" : "block",
                    flexDirection: isWideScreen ? "row" : "column",
                    gap: isWideScreen ? "10px" : "5px",
                }}>
                    <div style={{ flex: 1 }}>

                        <h2 style={{
                            color: theme.generalText
                        }}>Request</h2>
                        <SecondaryTopBar
                            items={[
                                {
                                    name: "Headers",
                                    msg: Object.values(req.headers).length,
                                },
                                {
                                    name: "Path",
                                    msg: Object.values(req.path ?? {}).length,
                                },
                                {
                                    name: "Params",
                                    msg: Object.keys(req.params ?? {}).length,
                                },
                                {
                                    name: "Body",
                                    msg: 0
                                },
                                {
                                    name: "Cookie",
                                    msg: Object.keys(req.requestCookies ?? {}).length
                                }
                            ]}
                            selectedIndex={reqIndex}
                            onSelect={setReqIndex}
                        />
                        {reqIndex === 0 && <KeyValueRenderer data={arrayToObject(req?.headers ?? [])} title={["Key", "Value"]} />}
                        {reqIndex === 1 && <KeyValueRenderer data={req?.path ?? {}} title={["Key", "Value"]} />}
                        {reqIndex === 2 && <KeyValueRenderer data={arrayToObject(req?.params ?? [])} title={["Key", "Value"]} />}
                        {reqIndex === 3 && (
                            res
                                ? <BodyViewer request={req!} title={getRequestTypeString(req.requestDataType)} />
                                : "Loading ..."
                        )}
                        {reqIndex === 4 && <CookieRenderer data={req?.requestCookies ?? []} />}
                    </div>
                    <div
                        style={{
                            width: isWideScreen ? "2px" : "100%",
                            minHeight: "2px",
                            margin: isWideScreen ? "4px 0" : "0 4px",
                            backgroundColor: theme.primaryBorder,
                            alignSelf: "stretch",
                        }}
                    ></div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                        }}>
                            <h2 style={{
                                color: theme.generalText
                            }}>Response</h2>
                            <SecondaryTopBar
                                items={[
                                    {
                                        name: "Headers",
                                        msg: Object.values(res.headers).length,
                                    },
                                    {
                                        name: "Set-Cookie",
                                        msg: Object.values(res.cookie).length,
                                    },
                                    {
                                        name: "Body",
                                        msg: 0,
                                    },
                                    {
                                        name: "Cookie",
                                        msg: Object.values(res.cookie).length
                                    }
                                ]}
                                selectedIndex={resIndex}
                                onSelect={setResIndex}
                            />
                        </div>
                        {resIndex === 0 && <KeyValueRenderer data={res?.headers ?? {}} title={["Key", "Value"]} />}
                        {resIndex === 1 && <CookieRenderer data={res?.cookie ?? []} />}
                        {resIndex === 2 && <ResponseViewer res={res} />}
                        {resIndex === 3 && <CookieRenderer data={res?.cookie ?? []} />}
                    </div>
                </div>
            </div>
        );
    }
}







