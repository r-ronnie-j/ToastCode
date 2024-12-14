import React, { useContext, useState } from "react";
import CustomCheckbox from "../../component/Input/CheckBox";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";

export interface KeyValueCheckRecord {
    key: string;
    value: string;
    enabled: boolean;
}

export default function BodyReadUrlEncoded({
    data,
}: {
    data: KeyValueCheckRecord[];
}) {
    const [showAll, setShowAll] = useState(true);

    const filteredData = showAll ? data : data.filter((item) => item.enabled);

    return (
        <div
            style={{
                borderRadius: "4px",
                marginTop: "10px",
                border: "1px solid #ddd",
                padding: "10px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <CustomCheckbox
                    checked={showAll}
                    onChange={(e) => setShowAll(e)}
                />
                <label style={{ marginLeft: "8px", cursor: "pointer" }}>
                    {showAll ? "Show All" : "Show Enabled"}
                </label>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: "5px",
                    boxSizing: "border-box",
                    alignItems: "center",
                    fontWeight: "bold",
                    marginBottom: "8px",
                }}
            >
                <div style={{ width: "50px", textAlign: "center" }}>
                    ✓
                </div>
                <div style={{ flexGrow: 1, width: "10px", textAlign: "center" }}>
                    Key
                </div>
                <div style={{ flexGrow: 3, width: "10px", textAlign: "center" }}>
                    Value
                </div>
            </div>

            {/* Data Rows */}
            {filteredData.map((item, index) => (
                <ReadOnlyUrlEncodedItem key={index} data={item} />
            ))}
        </div>
    );
}

function ReadOnlyUrlEncodedItem({ data }: { data: KeyValueCheckRecord }) {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "5px",
                alignItems: "center",
                marginBottom: "8px",
            }}
        >
            <div style={{
                width: "50px"
            }}>
                <CustomCheckbox
                    checked={data.enabled}
                />
            </div>
            <div
                style={{
                    flexGrow: 1,
                    width: "10px",
                    padding: "5px",
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.simpleBorder}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {data.key}
            </div>
            <div
                style={{
                    flexGrow: 3,
                    padding: "5px",
                    width: "10px",
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.simpleBorder}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {data.value}
            </div>
        </div>
    );
}
