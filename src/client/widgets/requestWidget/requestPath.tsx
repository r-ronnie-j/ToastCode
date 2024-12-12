import React, { useContext } from "react"
import { ConfigurationContext } from "../../context/configurationProvider"
import { getThemeColors } from "../../themes/getThemeColors"
import { RequestContext } from "../../context/requestContext"
import SimpleInputSuggestions from "../../component/Input/SimpleInputSuggestion"


export default function RequestPath() {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)
    let request = useContext(RequestContext)
    return <div style={{
        borderRadius: "4px",
        marginTop: '10px',
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: '5px',
            boxSizing: 'border-box',
            padding: "5px 0",
            alignItems: 'center',
            background: theme.secondaryContainer,
        }}>
            <div style={{
                flexGrow: 1,
                width: "10px",
                textAlign: "center"
            }}>
                Variable
            </div>
            <div style={{
                flexGrow: 3,
                width: "10px",
                textAlign: "center"
            }}>
                Value
            </div>
        </div>
        {
            Object.entries(request.data.path).map(([key, value]) => (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    gap: "5px",
                    boxSizing: 'border-box',
                    alignItems: "center"
                }}>
                    <div style={{
                        flexGrow: 1,
                        width: "10px",
                        textAlign: "center",
                        fontSize: config.fontSize
                    }}>
                        {key}
                    </div>
                    <SimpleInputSuggestions
                        suggestions={[]}
                        flex={3}
                        inputValue={value}
                        setInputValue={(x) => {
                            request.setData({ ...request.data, path: { ...request.data.path, [key]: x } })
                        }}
                    />
                </div>
            ))
        }

    </div>
}