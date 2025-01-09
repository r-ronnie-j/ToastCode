import React, { useContext, useEffect, useRef, useState } from "react";
import { loader } from "@monaco-editor/react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import getVsCodeTheme from "../../themes/vsCodeThemes";
import { editor } from "monaco-editor";

const JsonXmlCodeComponent = ({ setValue, type = "json", flex, id, border, value }: {
    setValue: (a: string) => void,
    value: string,
    type: "xml" | "json" | "text" | "html" | "javascript",
    flex: number,
    id: any,
    border: boolean
}) => {
    const config = useContext(ConfigurationContext)
    const theme = getThemeColors(config.theme)
    const editorRef = useRef<any>(null);
    const [lines, setLines] = useState(24);

    function updateEditorHeight(x:editor.IStandaloneCodeEditor){
        let length = x.getModel()?.getLineCount()
        console.log("pringting scroll heingt",x.getDomNode()?.scrollHeight)
        if(length){
            setLines(length)
        }
    }

    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.editor.defineTheme('myTransparentTheme', getVsCodeTheme(config.theme));
            let x = document.getElementById(`editor-container-${id}`)!
            const m = monaco.editor.create(x, {
                value: value,
                language: type,
                automaticLayout: true,
                lineHeight: 20,
                scrollBeyondLastLine: false,
                theme: "myTransparentTheme",
                minimap: {
                    enabled: false
                },
                scrollbar: {
                    verticalScrollbarSize: 8
                },
            });


            editorRef.current = m;

            m.onDidChangeModelContent(() => {
                const newValue = m.getValue();
                console.log(typeof newValue, "Checking type of new value")
                setValue(newValue);
                updateEditorHeight(m);
            });

            window.addEventListener('resize', () => {
                editorRef.current.layout();
            });

            updateEditorHeight(m);

            function scrollEventListener(event: WheelEvent) {
                event.preventDefault();

                // Normalize scroll amount across different input devices
                let scrollAmountY = event.deltaY;
                let scrollAmountX = event.deltaX;
            
                // Adjust scroll amount based on deltaMode
                if (event.deltaMode === 1) { // deltaMode 1 indicates lines
                    scrollAmountY *= 40; // Rough approximation for line height
                    scrollAmountX *= 40;
                } else if (event.deltaMode === 2) { // deltaMode 2 indicates pages
                    scrollAmountY *= window.innerHeight; // Full page height
                    scrollAmountX *= window.innerWidth; // Full page width
                }
            
                // Smooth scrolling for better touchpad support
                window.scrollBy({
                    top: scrollAmountY,
                    left: scrollAmountX,
                    behavior: "auto" // Use smooth scrolling for better UX
                });
            }

            x.addEventListener("wheel", scrollEventListener, {
                capture: true,
                passive:false,
            })

            return () => {
                if (editorRef.current) {
                    editorRef.current.dispose();
                }
                window.removeEventListener('resize', () => {
                    editorRef.current.layout();
                });
                x.removeEventListener("wheel", scrollEventListener)
            };
        });
    }, []);

  

    return <div style={{
        position: "relative",
        width: "10px",
        flexGrow: flex,
        borderLeft: border ? `solid 1px ${theme.simpleBorder}` : "none",
        background: theme.alternativeContainer,
        borderRadius: "10px",
        margin:"10px"
    }}>
        <div style={{
            minHeight: `${lines  * 20+ 120}px`,
            padding: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row"
        }}>
            <div
                id={`editor-container-${id}`}
                style={{
                    flexGrow: 1,
                    width: "10px",
                    overflow: "hidden",
                    background: theme.generalContainer
                }}
            />
        </div>
    </div>
};

export default JsonXmlCodeComponent;
