import React, { useContext, useEffect, useState } from "react";
import { ConfigurationContext } from "../context/configurationProvider";
import { getThemeColors } from "../themes/getThemeColors";
import RequestProvider, { RequestContext } from "../context/requestContext";
import DeleteButton from "../component/Button/DeleteConfirmButton";
import PrimaryTopBar from "../component/Topbar/primaryTopBar";
import ExpandableWidget from "../component/Expandable/expandableComponent";
import RequestComponent from "./requestWidgets";
import ResponseComponent from "./responseWidget";
import ExampleWidget from "./exampleWidget";

export default function MainWidget({ raw, index, onDelete }: {
    raw: string, index: number, onDelete: (a: number, b: { name: string, path: string }[]) => void
}) {

    const [isVerticalView, setIsVerticalView] = useState(false);
    const [isCodeView, setIsCodeView] = useState(false);
    const configuration = useContext(ConfigurationContext)
    const theme = getThemeColors(configuration.theme)
    const [isExample, setIsExample] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setIsVerticalView(true);
            } else {
                setIsVerticalView(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <RequestProvider raw={raw} index={index}>
            <ExpandableWidget
                isExample={isExample}
                setIsExample={setIsExample}
                title={<DeleteRequest onDelete={onDelete} index={index} />}>
                {!isExample &&
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <PrimaryTopBar
                            isVerticalView={isVerticalView}
                            setIsVerticalView={setIsVerticalView}
                            isCodeView={isCodeView}
                            setIsCodeView={setIsCodeView}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: isVerticalView ? "column" : "row",
                                maxWidth: "100%",
                            }}
                        >
                            <div style={{
                                flex: 1,
                                padding: "5px",
                            }}>
                                <RequestComponent isCodeView={isCodeView} index={index} />
                            </div>
                            <div
                                style={{
                                    width: isVerticalView ? "100%" : "2px",
                                    minHeight: "2px",
                                    margin: isVerticalView ? "10px 0" : "0 4px",
                                    backgroundColor: theme.primaryBorder,
                                    alignSelf: "stretch",
                                }}
                            ></div>
                            <div style={{ flex: 1, padding: "5px" }}>
                                <ResponseComponent requestIndex={index} />
                            </div>
                        </div>
                    </div>
                }
                {
                    isExample && <ExampleWidget />
                }
            </ExpandableWidget>
        </RequestProvider>
    );
}


function DeleteRequest({ onDelete, index }: {
    onDelete: (a: number, b: { name: string, path: string }[]) => void,
    index: number
}) {
    let api = useContext(RequestContext)
    return <DeleteButton
        onDelete={() => {
            onDelete(index, api.data.examples);
        }}
        timeoutSeconds={5}
        title="Delete"
    />
}