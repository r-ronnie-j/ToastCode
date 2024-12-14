import React, { useContext } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { Cookie } from "../../../common/interfaces/apiRequests";
import { getThemeColors } from "../../themes/getThemeColors";
import CopyableText from "./copyableText";
import JsonXmlRenderer from "../../component/CodeComponent/JsonXmlRenderer";


export default function CookieRenderer({ data }: { data: Cookie[] }) {
    let config = useContext(ConfigurationContext)
    let themeStyle = getThemeColors(config.theme)

    return (
        <div style={{ width: "100%", marginTop: "10px", color: themeStyle.generalText }}>
            {data.length !== 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ borderBottom: `1px solid ${themeStyle.simpleBorder}`, fontWeight: "bold" }}>
                        <tr>
                            <th style={{ padding: "8px", borderRight: `1px solid ${themeStyle.simpleBorder}`, textAlign: "left" }}>Name</th>
                            <th style={{ padding: "8px", borderRight: `1px solid ${themeStyle.simpleBorder}`, textAlign: "left", width: "50%" }}>Value</th>
                            <th style={{ padding: "8px", borderRight: `1px solid ${themeStyle.simpleBorder}`, textAlign: "left" }}>HttpOnly</th>
                            <th style={{ padding: "8px", borderRight: `1px solid ${themeStyle.simpleBorder}`, textAlign: "left" }}>SameSite</th>
                            <th style={{ padding: "8px", textAlign: "left" }}>Other Attributes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cookie, i) => {
                            const { key, value, httpOnly, sameSite, ...otherAttributes } = cookie;
                            return (
                                <tr
                                    key={i}
                                    style={{ borderBottom: `1px solid ${themeStyle.simpleBorder}`, padding: "4px 0" }}
                                >
                                    {/* Name Column */}
                                    <td style={{ padding: "8px", borderRight: `1px solid ${themeStyle.simpleBorder}`, verticalAlign: "top" }}>
                                        <CopyableText text={key}>{key}</CopyableText>
                                    </td>

                                    {/* Value Column - This will occupy the maximum space */}
                                    <td style={{ padding: "8px", borderRight: `1px solid ${themeStyle.simpleBorder}`, width: "50%", verticalAlign: "top" }}>
                                        <CopyableText text={value}>{value}</CopyableText>
                                    </td>

                                    {/* HttpOnly Column */}
                                    <td style={{ padding: "8px", borderRight: `1px solid ${themeStyle.simpleBorder}`, verticalAlign: "top" }}>
                                        {httpOnly ? "Yes" : "No"}
                                    </td>

                                    {/* SameSite Column */}
                                    <td style={{ padding: "8px", borderRight: `1px solid ${themeStyle.simpleBorder}`, verticalAlign: "top" }}>
                                        {sameSite || "None"}
                                    </td>

                                    {/* Other Attributes Column */}
                                    <td style={{ padding: "8px", verticalAlign: "top" }}>
                                        <JsonXmlRenderer type="json" value={JSON.stringify(otherAttributes,null,2)} key={`cookie-${data.at(0)}-${i}`} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div style={{
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: themeStyle.generalContainer,
                    borderRadius: "5px",
                    border: `1px solid ${themeStyle.simpleBorder}`,
                    color: themeStyle.generalText
                }}>
                    <h3 style={{ margin: 0 }}>🍪 No Cookies Found 🍪</h3>
                    <p style={{ margin: "5px 0" }}>It looks like there are no cookies to display at the moment.</p>
                    <p>Try refreshing the page or checking your browser settings.</p>
                </div>
            )}
        </div>
    );
};
