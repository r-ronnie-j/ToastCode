import React, { useContext } from "react"
import { ConfigurationContext } from "../../context/configurationProvider"
import { getThemeColors } from "../../themes/getThemeColors"
import DraggableList from "../../component/Draggable/DraggableList"
import CustomCheckbox from "../../component/Input/CheckBox"
import SimpleInputSuggestions from "../../component/Input/SimpleInputSuggestion"


export default function RequestCookies() {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)
    return <div style={{
        borderRadius: "4px",
        marginTop: '10px',
    }}>
        <DraggableList
            onDragEnd={() => { }}
            header={<div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: "5px",
                boxSizing: 'border-box',
                alignItems: "center"
            }}>

                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                }}>
                    <span style={{
                        width: '15px', // Maximum size
                        height: '15px', // Maximum size
                        borderRadius: '3px', // Slightly rounded corners
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: "20px",
                        fontWeight: "900",
                        color: theme.primaryContainer,
                        justifyContent: 'center',
                        transition: 'background-color 0.3s, border-color 0.3s',
                    }}>
                        ✓
                    </span>
                </label>
                <div style={{
                    flexGrow: 1,
                    width: "10px",
                    textAlign: "center"
                }}>
                    Key
                </div>
                <div style={{
                    flexGrow: 1,
                    width: "10px",
                    textAlign: "center"
                }}>
                    Value
                </div>
                <div style={{
                    flexGrow: 2,
                    width: "10px",
                    textAlign: "center"
                }}>
                    Other Settings
                </div>
                <div style={{ margin: "0 4px", cursor: "pointer", opacity: 0, }}>🗑️</div>
            </div>}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: "5px",
                boxSizing: 'border-box',
                alignItems: "center"
            }}>

                <CustomCheckbox
                    checked={true}
                    onChange={(x) => { }}
                />
                <SimpleInputSuggestions
                    suggestions={[]}
                    flex={1}
                    inputValue=""
                    setInputValue={() => { }}
                />
                <SimpleInputSuggestions
                    suggestions={[]}
                    flex={1}
                    inputValue=""
                    setInputValue={() => { }}
                />
                <SimpleInputSuggestions
                    suggestions={[]}
                    flex={2}
                    inputValue=""
                    setInputValue={() => { }}
                />
                <div style={{ margin: "0 4px", cursor: "pointer" }}>🗑️</div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: "5px",
                alignItems: "center"
            }}>
                <CustomCheckbox
                    checked={true}
                    onChange={(x) => { }}
                />
                <SimpleInputSuggestions
                    suggestions={[]}
                    flex={1}
                    inputValue=""
                    setInputValue={() => { }}
                />
                <SimpleInputSuggestions
                    suggestions={[]}
                    flex={1}
                    inputValue=""
                    setInputValue={() => { }}
                />
                <SimpleInputSuggestions
                    suggestions={[]}
                    flex={2}
                    inputValue=""
                    setInputValue={() => { }}
                />
                <div style={{ margin: "0 4px", cursor: "pointer" }}>🗑️</div>
            </div>
        </DraggableList>
    </div>
}