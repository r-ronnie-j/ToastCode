import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import { loader } from "@monaco-editor/react";
import { helperLib } from "../../monaco/helperLib";
import { getVsCodeTheme } from "../../themes/vsCodeThemes";

const VariableCodeComponent = ({ local }: { local: boolean }) => {
    const config = useContext(ConfigurationContext)
    const theme = getThemeColors(config.theme)
    const editorRef = useRef<any>(null);
    const [lines, setLines] = useState(20);

    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.languages.typescript.javascriptDefaults.addExtraLib(helperLib);
            monaco.editor.defineTheme('myTransparentTheme', getVsCodeTheme(config.theme));
            let x = document.getElementById(`editor-container-var-${local ? "local" : "global"}`)!
            const m = monaco.editor.create(x, {
                value: '',
                language: 'javascript',
                automaticLayout: true,
                lineHeight: 20,
                scrollBeyondLastLine: false,
                theme: "myTransparentTheme",
                minimap: {
                    enabled: false
                },
            });

            editorRef.current = m;

            m.onDidChangeModelContent(() => {
                const newValue = m.getValue();
                updateEditorHeight(m);
            });

            window.addEventListener('resize', () => {
                editorRef.current.layout();
            });

            updateEditorHeight(m);

            function scrollEventListener(event: WheelEvent) {
                event.preventDefault();
                const scrollAmountY = event.deltaY;
                const scrollAmountX = event.deltaX;
                window.scrollBy({
                    top: scrollAmountY,
                    left: scrollAmountX,
                    behavior: "smooth"
                });
            }

            x.addEventListener("wheel", scrollEventListener, {
                capture: true,
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

    const updateEditorHeight = (editor: any) => {
        const lineCount = editor.getModel()?.getLineCount() || 1;
        if (lineCount > lines) {
            setLines(lineCount)
        }
        editor.layout();
    };

    return <div style={{ width: "100%" }}>
        <div style={{
            height: `${lines * 20 + 20}px`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "row"
        }}>
            <div
                id={`editor-container-var-${local ? "local" : "global"}`}
                style={{
                    flexGrow: 1,
                    width: "10px",
                    overflow: "hidden",
                    height: '100%',
                }}
            />
        </div>
    </div>
};

export default VariableCodeComponent