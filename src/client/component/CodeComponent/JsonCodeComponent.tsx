import React, { useContext, useEffect, useRef, useState } from "react";
import { loader } from "@monaco-editor/react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import getVsCodeTheme from "../../themes/vsCodeThemes";
import { editor } from "monaco-editor";
import { createTokenizationSupport } from "../../monaco/jsonWithInterPolation";
import { getLanguageService } from 'vscode-json-languageservice';
import { Range, Position } from "vscode-languageserver-textdocument";

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

    function updateEditorHeight(x: editor.IStandaloneCodeEditor) {
        let length = x.getModel()?.getLineCount()
        if (length) {
            setLines(length)
        }
    }

    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.languages.register({
                id: "jsonCode"
            })

            monaco.languages.setTokensProvider("jsonCode", createTokenizationSupport(false))

            monaco.editor.defineTheme('myTransparentTheme', getVsCodeTheme(config.theme));

            let x = document.getElementById(`editor-container-${id}`)!

            const m = monaco.editor.create(x, {
                value: value,
                language: type == "json" ? "jsonCode" : type,
                // language: type,
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

            const jsonService = getLanguageService({
                schemaRequestService: async (uri) => {
                    return '{}';
                }
            });


            monaco.editor.onDidCreateModel(function (model) {
                async function validate() {
                    const document = {
                        uri: model.uri.toString(),
                        languageId: 'json',
                        version: model.getVersionId(),
                        getText: () => model.getValue().replace("{{", '"{{').replace("}}", '}}"'),
                        positionAt: (offset: any) => {
                            const pos = model.getPositionAt(offset);
                            return { line: pos.lineNumber - 1, character: pos.column - 1 };
                        },
                        offsetAt: (position: any) => model.getOffsetAt({
                            lineNumber: position.line + 1,
                            column: position.character + 1
                        }),
                        lineCount: model.getLineCount()
                    };

                    const jsonDocument = jsonService.parseJSONDocument(document);
                    const diagnostics = await jsonService.doValidation(document, jsonDocument);

                    const markers = diagnostics.map(diagnostic => ({
                        severity: monaco.MarkerSeverity.Error,
                        message: diagnostic.message,
                        startLineNumber: diagnostic.range.start.line + 1,
                        startColumn: diagnostic.range.start.character + 1,
                        endLineNumber: diagnostic.range.end.line + 1,
                        endColumn: diagnostic.range.end.character + 1
                    }));

                    console.log("THe error markers are ", markers)

                    monaco.editor.setModelMarkers(model, 'json', markers);
                }

                let handle: any = null;
                model.onDidChangeContent(() => {
                    clearTimeout(handle);
                    handle = setTimeout(() => validate(), 500);
                });

                // Initial validation
                validate();
            });



            editorRef.current = m;

            m.onDidChangeModelContent((mod) => {
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

            x.addEventListener("wheel", scrollEventListener, {
                capture: true,
                passive: false,
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
        margin: "10px"
    }}>
        <div style={{
            minHeight: `${lines * 20 + 120}px`,
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
