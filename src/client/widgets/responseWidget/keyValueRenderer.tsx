import React, { useContext } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import { SimpleCopyableText } from "./copyableText";


export default function KeyValueRenderer({ data, title }: { data: Record<string, any>, title: string[] }) {
    const config = useContext(ConfigurationContext)
    const themeStyle = getThemeColors(config.theme)
    const isEmpty = !data || Object.keys(data).length === 0;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
            backgroundColor: 'transparent',
            border: `1px solid ${themeStyle.simpleBorder}`,
            borderRadius: "8px",
            padding: "10px",
            color: themeStyle.generalText
        }}>
            {/* Body */}
            {isEmpty ? (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    textAlign: "center",
                }}>
                    <span style={{ fontSize: "24px" }}>😞</span>
                    <span style={{ fontSize: "18px", marginTop: "10px" }}>No data were found!</span>
                </div>
            ) : (<>
                <div style={{
                    display: "flex",
                    borderBottom: `2px solid ${themeStyle.simpleBorder}`,
                    padding: "4px 0",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderTop: `2px solid ${themeStyle.simpleBorder}`
                }}>
                    <div style={{ flex: 1, padding: "4px", borderRight: `1px solid ${themeStyle.simpleBorder}` }}>
                        {title[0]}
                    </div>
                    <div style={{ flex: 3, padding: "4px" }}>
                        {title[1]}
                    </div>
                </div>
                {Object.entries(data).map(([key, value], index) => {
                    const valueString = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;

                    return (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                borderBottom: `1px solid ${themeStyle.simpleBorder}`,
                                padding: "4px 0",
                            }}
                        >
                            <div style={{ flex: 1, padding: "4px", borderRight: `1px solid ${themeStyle.simpleBorder}` }}>
                                <SimpleCopyableText text={key} />
                            </div>
                            <div style={{ flex: 3, padding: "4px" }}>
                                <SimpleCopyableText text={valueString} />
                            </div>
                        </div>
                    );
                })}
            </>
            )}
        </div>
    );
};