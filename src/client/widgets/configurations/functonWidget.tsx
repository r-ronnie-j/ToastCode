import React, { useContext, useEffect, useState } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import TestCodeComponent from "../../component/CodeComponent/TestCodeComponent";
import getRawFunctionHandler from "../../handler/eventHandler/getRawFunctionHandler";
import saveFunctions from "../../handler/eventHandler/saveFunctions";

export default function FunctionWidget() {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)

    let [init, setInit] = useState(false)
    let [value, setValue] = useState("")

    
    return (
        <div style={{
            margin: "10px 5px",
            border: `1px solid ${theme.simpleBorder}`,
            borderRadius: '4px', padding: "5px 10px"
        }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    gap: "20px",
                    alignItems: 'center',
                    paddingRight: '10px',
                }}
            >

                <div style={{
                    color: theme.primaryContainer,
                    fontSize: '1.25em',
                    fontWeight: 'bold',
                }}>Functions</div>
            </div>
            <div style={{ marginTop: '10px' }}>
                {init && <TestCodeComponent value={value} setValue={setValue} />}
            </div>
        </div>
    );
}