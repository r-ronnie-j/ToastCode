import React, { useContext } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import CustomCheckbox from "../../component/Input/CheckBox";

export default function BodyReadFormData({
    formData,
}: {
    formData: any[];
}) {
    const config = useContext(ConfigurationContext)
    const theme = getThemeColors(config.theme);

    return (
        <div
            style={{
                borderRadius: "4px",
                marginTop: "10px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: "5px",
                    boxSizing: "border-box",
                    alignItems: "center",
                }}
            >
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                >
                    <span
                        style={{
                            width: "15px", // Maximum size
                            height: "15px", // Maximum size
                            borderRadius: "3px", // Slightly rounded corners
                            display: "flex",
                            alignItems: "center",
                            fontSize: "20px",
                            fontWeight: "900",
                            color: theme.primaryContainer,
                            justifyContent: "center",
                            transition: "background-color 0.3s, border-color 0.3s",
                        }}
                    >
                        ✓
                    </span>
                </label>
                <div
                    style={{
                        flexGrow: 1,
                        width: "10px",
                        textAlign: "center",
                    }}
                >
                    Key
                </div>
                <div
                    style={{
                        flexGrow: 1,
                        width: "10px",
                        textAlign: "center",
                    }}
                >
                    Type
                </div>
                <div
                    style={{
                        flexGrow: 3,
                        width: "10px",
                        textAlign: "center",
                    }}
                >
                    Value
                </div>
            </div>
            {formData.map((dataItem, index) => (
                <ReadOnlyFormComponent key={index} data={dataItem} />
            ))}
        </div>
    );
}

function ReadOnlyFormComponent({ data }: { data: any }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "5px",
                boxSizing: "border-box",
                alignItems:
                    data.type === "json" || data.type === "xml"
                        ? "start"
                        : "center",
            }}
        >
            <div
                style={{
                    padding: "5px 0 0 0",
                }}
            >
                <CustomCheckbox checked={data.enabled} />
            </div>
            <div
                style={{
                    padding: "3px 0 3px 0",
                    flexGrow: 1,
                    width: "10px",
                }}
            >
                <span>{data.key}</span>
            </div>
            <div
                style={{
                    padding: "3px 0 3px 0",
                    flexGrow: 1,
                    width: "10px",
                }}
            >
                <span>{data.type}</span>
            </div>
            <div
                style={{
                    padding: "3px 0 3px 0",
                    flexGrow: 3,
                    width: "10px",
                }}
            >
                {data.type === "json" || data.type === "xml" ? (
                    <pre
                        style={{
                            background: "#f4f4f4",
                            padding: "8px",
                            borderRadius: "4px",
                            overflowX: "auto",
                        }}
                    >
                        {JSON.stringify(data.value, null, 2)}
                    </pre>
                ) : (
                    <span>{data.value}</span>
                )}
            </div>
        </div>
    );
}
