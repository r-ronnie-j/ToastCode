import React, { useContext } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import TestCodeComponent from "../../component/CodeComponent/TestCodeComponent";

export default function FunctionWidget() {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)

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
                <TestCodeComponent />
            </div>
        </div>
    );
}