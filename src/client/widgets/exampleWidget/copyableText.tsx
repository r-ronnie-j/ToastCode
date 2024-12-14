import React, { ReactNode, useState } from "react";

export default function CopyableText({ children, text }: { children: ReactNode, text: string }) {
    const [isCopied, setIsCopied] = useState(false);
    let [jsonText, setJsonText] = useState("");
    let [isJson, setIsJson] = useState(true);

    try {
        let t = JSON.stringify(JSON.parse(text), null, 2);
        setJsonText(t);
    } catch (_) { }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    return (
        <div style={{ display: "flex", alignItems: "start", width: "100%" }}>
            {jsonText !== "" && isJson ?
                <pre style={{
                    flexGrow: 1,
                    whiteSpace: "pre-wrap",   // Allows text wrapping
                    wordBreak: "break-all",   // Break long words arbitrarily
                    maxHeight: "200px",       // Limit the height for large content
                    overflowY: "auto"         // Add scroll for long content
                }}>
                    {jsonText}
                </pre> :
                <span style={{
                    flexGrow: 1,
                    whiteSpace: "pre-wrap",   // Same style for regular text
                    wordBreak: "break-all",   // Ensure single long words break
                    maxHeight: "200px",
                    overflowY: "auto"
                }}>
                    {children}
                </span>
            }

            <div style={{
                display: "flex",
                gap: "5px",
                alignItems: "center"
            }}>
                {jsonText !== "" && (isJson ?
                    <span style={{ marginLeft: "10px", color: "green", cursor: "pointer" }} onClick={() => setIsJson(!isJson)}>📜</span> :
                    <span style={{ cursor: "pointer", marginLeft: "10px" }} onClick={() => setIsJson(!isJson)}>🔤</span>)}

                {isCopied ?
                    <span style={{ marginLeft: "10px", color: "green" }}>✅</span> :
                    <span style={{ cursor: "pointer", marginLeft: "10px" }} onClick={copyToClipboard}>📋</span>
                }
            </div>
        </div>
    );
};


export function SimpleCopyableText({ text }: { text: string }) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    return (
        <div style={{ display: "flex", alignItems: "start", width: "100%" }}>

            <span style={{
                flexGrow: 1,
                whiteSpace: "pre-wrap",   // Same style for regular text
                wordBreak: "break-all",   // Ensure single long words break
                maxHeight: "200px",
                overflowY: "auto"
            }}>
                {text}
            </span>


            <div style={{
                display: "flex",
                gap: "5px",
                alignItems: "center"
            }}>
                {isCopied ?
                    <span style={{ marginLeft: "10px", color: "green" }}>✅</span> :
                    <span style={{ cursor: "pointer", marginLeft: "10px" }} onClick={copyToClipboard}>📋</span>
                }
            </div>
        </div>
    );
};