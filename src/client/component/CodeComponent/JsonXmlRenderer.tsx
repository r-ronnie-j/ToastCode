import React, { useContext, useEffect, useRef, useState } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { loader } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { getThemeColors } from "../../themes/getThemeColors";
import { getVsCodeTheme } from "../../themes/vsCodeThemes";

const JsonXmlRenderer = ({ value, type = "json", key }: {
    value: string;
    type: "json" | "xml" | "text" | "html" | "javascript";
    key: string | number;
}) => {
    const config = useContext(ConfigurationContext);
    const theme = getThemeColors(config.theme)
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [minHeight, setMinHeight] = useState(400)
    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.editor.defineTheme('myTransparentTheme', getVsCodeTheme(config.theme));

            if (!containerRef.current) return;

            const m = monaco.editor.create(containerRef.current, {
                value,
                language: type,
                automaticLayout: true,
                lineHeight: 20,
                scrollBeyondLastLine: false,
                theme: "myTransparentTheme",
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    verticalScrollbarSize: 5
                },
                readOnly: true,
                wordWrap: "on",
            });

            editorRef.current = m;

            const handleResize = () => {
                formatDocument(m)
            };

            window.addEventListener('resize', handleResize);
            formatDocument(m);

            function scrollEventListener(event: WheelEvent) {
                event.preventDefault();

                let scrollAmountY = event.deltaY;
                let scrollAmountX = event.deltaX;

                if (event.deltaMode === 1) {
                    scrollAmountY *= 40;
                    scrollAmountX *= 40;
                } else if (event.deltaMode === 2) {
                    scrollAmountY *= window.innerHeight;
                    scrollAmountX *= window.innerWidth;
                }

                window.scrollBy({
                    top: scrollAmountY,
                    left: scrollAmountX,
                    behavior: "auto"
                });
            }
            if (type !== "html") {
                containerRef.current.addEventListener("wheel", scrollEventListener, {
                    capture: true,
                    passive: false,
                })
            }

            return () => {
                if (editorRef.current) {
                    editorRef.current.dispose();
                }
                if (type !== "html") {
                    containerRef.current?.removeEventListener("wheel", scrollEventListener)
                }
                window.removeEventListener('resize', handleResize);
            };
        });
    }, [value, type, config.theme]); // Recreate editor only when these change

    const formatDocument = async (editor: editor.IStandaloneCodeEditor) => {
        await editor.getAction("editor.action.formatDocument")?.run()
        const contentHeight = editor.getContentHeight();
        setMinHeight(Math.min(contentHeight * 1.05, 400))
        editor.layout();
    };

    return (
        <div style={{
            height: "100%",
            minHeight: `${minHeight}px`,
            overflow: "hidden",
            width: "100%",
            background: theme.generalContainer
        }}>
            <div
                ref={containerRef}
                style={{
                    width: "100%",
                    height: "100%",
                    minHeight: `${minHeight}px`
                }}
            />
        </div>
    );
};

export default JsonXmlRenderer;
