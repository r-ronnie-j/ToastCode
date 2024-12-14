import React, { useContext, useEffect, useState } from "react";
import { ConfigurationContext } from "../context/configurationProvider";
import { getThemeColors } from "../themes/getThemeColors";
import RequestProvider from "../context/requestContext";
import DeleteButton from "../component/Button/DeleteConfirmButton";
import PrimaryTopBar from "../component/Topbar/primaryTopBar";
import ExpandableWidget from "../component/Expandable/expandableComponent";
import RequestComponent from "./requestWidgets";
import ResponseComponent from "./responseWidget";
import ExampleComponent from "./exampleWidget";

export default function MainWidget({ raw, index, onDelete }: {
    raw: string, index: number, onDelete: (a: number) => void
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
                title={
                    <>
                        <DeleteButton
                            onDelete={() => {
                                onDelete(index)
                            }}
                            timeoutSeconds={5}
                            title="Delete"
                        />
                    </>
                }>
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
                                    margin: isVerticalView ? "4px 0" : "0 4px",
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
                    isExample && <ExampleComponent />
                }
            </ExpandableWidget>
        </RequestProvider>
    );
}