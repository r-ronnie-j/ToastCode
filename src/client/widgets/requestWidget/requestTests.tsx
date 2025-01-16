import React, { useContext, useState } from "react";
import { FunctionCodeContext } from "../../context/functionContext";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import SimpleInputSuggestions from "../../component/Input/SimpleInputSuggestion";
import SimpleSelectBox from "../../component/Select/SimpleSelect";
import CustomCheckbox from "../../component/Input/CheckBox";

export default function RequestTests() {
    let funx = useContext(FunctionCodeContext);
    let config = useContext(ConfigurationContext);
    let theme = getThemeColors(config.theme);
    let [c, setC] = useState(false);

    return (
        <div style={{
            borderRadius: "4px",
            marginTop: '10px',
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: '5px',
                boxSizing: 'border-box',
                padding: "3px", // Reduced padding
                alignItems: 'center',
                background: theme.secondaryContainer,
                borderRadius: "4px 4px 0 0",
            }}>
                <div style={{
                    flexGrow: 1,
                    textAlign: "left", // Align text to the right
                    fontWeight: 'bold',
                    fontSize: config.fontSize + 3, // Increased font size
                }}>
                    Tests
                </div>
            </div>
            {
                funx.functionCache.tests.map((x, index) => {
                    return (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            gap: "5px",
                            boxSizing: 'border-box',
                            alignItems: "center",
                            padding: "4px", // Reduced padding
                            backgroundColor: index % 2 === 0 ? theme.generalContainer : theme.alternativeContainer,
                            transition: "background-color 0.3s ease",
                        }}
                        >
                            <div style={{
                                flexGrow: 1,
                                textAlign: "left", // Align text to the right
                                fontSize: config.fontSize + 2, // Increased font size
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start" // Align to the end of the container
                            }}>{x.name}</div>
                            <div style={{
                                width: "50px",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <CustomCheckbox
                                    checked={c}
                                    onChange={(checked) => setC(checked)}
                                />
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
