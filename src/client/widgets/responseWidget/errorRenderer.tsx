import React, { useContext } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";

export default function ErrorComponent({ value, isWarning = false }: {
    value: string[],
    isWarning: boolean
}) {
    const config = useContext(ConfigurationContext);
    const selectedStyle = getThemeColors(config.theme);

    // Check if there are no errors or warnings
    if (!value || value.length === 0) {
        return (
            <div style={{
                padding: "20px",
                borderRadius: "8px",
                fontSize: "18px",
                color: selectedStyle.generalText,
                textAlign: "center",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: selectedStyle.alternativeContainer,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}>
                <div>
                    <span role="img" aria-label="thumbs-up" style={{ fontSize: '28px', marginRight: '8px' }}>👍</span>
                    <strong style={{ display: "block", fontSize: "22px", fontWeight: "bold" }}>
                        Awesome! No errors or warnings encountered!
                    </strong>
                    <p style={{ fontSize: "16px", marginTop: "5px", color: selectedStyle.primaryContainer }}>
                        Everything is running smoothly. Keep up the great work!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {value.map((error, index) => (
                <div key={index} style={{
                    padding: "15px",
                    borderRadius: "8px",
                    fontSize: "18px",
                    color: isWarning ? selectedStyle.warningText : selectedStyle.errorText,
                    marginBottom: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s ease",
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}>
                        <strong style={{
                            minWidth: "30px"
                        }}>{index + 1})</strong>
                        <div style={{
                            flexGrow: 1
                        }}>{error}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
