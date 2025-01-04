import React, { useContext, useState } from "react"
import { ConfigurationContext } from "../../context/configurationProvider"
import { getThemeColors } from "../../themes/getThemeColors"
import DraggableList from "../../component/Draggable/DraggableList"
import { Cookie } from "../../../common/interfaces/apiRequests"
import BarInputSuggestions from "../../component/Input/BarInputSuggestions"
import CustomCheckbox from "../../component/Input/CheckBox"
import SimpleSelectBox from "../../component/Select/SimpleSelect"
import CustomSelect from "../../component/Select/CustomSelect"
import AwesomeButton from "../../component/Button/AwesomButton"

export default function RequestCookies() {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)

    let defaultCookie = {
        key: "",
        value: "",
        expires: new Date(),
        maxAge: 0,
        domain: "",
        path: "",
        secure: false,
        httpOnly: false,
        sameSite: "Lax",
        extensions: [],
        creation: new Date(),
        creationIndex: 0,
        hostOnly: false,
        pathIsDefault: false,
        lastAccessed: null,
    }

    let [cookie, setCookie] = useState<Cookie>(defaultCookie)

    let [cookies, setCookies] = useState<Cookie[]>([])


    return (
        <div style={{
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
                            width: '15px',
                            height: '15px',
                            borderRadius: '3px',
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
                    <div style={{ margin: "0 4px", cursor: "pointer", opacity: 0, }}>🗑️</div>
                </div>}
            >
                {cookies.map((c, index) => (
                    <CookieItem
                        key={c.key}
                        value={c.value}
                        selected={false}
                        enabled={true}
                        index={index}
                        onSelect={() => { }}
                        setEnable={() => { }}
                    />
                ))}
            </DraggableList>

            <div style={{ height: "70px" }} />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "8px",
                    marginTop: '15px',
                    alignItems: 'flex-start',
                    width: '100%',
                }}
            >
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Key :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <BarInputSuggestions
                            setValue={(value) => setCookie({ ...cookie, key: value })}
                            value={cookie.key}
                            suggestions={[]}
                            placeholder="Cookie Key"
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Value :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <BarInputSuggestions
                            setValue={(value) => setCookie({ ...cookie, value: value })}
                            value={cookie.value}
                            suggestions={[]}
                            placeholder="Cookie Value"
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Expires :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <input
                            type="date"
                            value={cookie.expires === "Infinity" || cookie.expires === null ? "" : cookie.expires.toISOString().split("T")[0]}
                            onChange={(e) => setCookie({ ...cookie, expires: new Date(e.target.value) })}
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Domain :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <BarInputSuggestions
                            setValue={(value) => setCookie({ ...cookie, domain: value === "" ? null : value })}
                            value={cookie.domain ?? ""}
                            suggestions={[]}
                            placeholder="Cookie Domain"
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Path :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <BarInputSuggestions
                            setValue={(value) => setCookie({ ...cookie, path: value === "" ? null : value })}
                            value={cookie.path ?? ""}
                            suggestions={[]}
                            placeholder="Cookie Path"
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Secure :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <CustomCheckbox
                            checked={cookie.secure}
                            onChange={(value) => setCookie({ ...cookie, secure: value })}
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        HttpOnly :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <CustomCheckbox
                            checked={cookie.secure}
                            onChange={(value) => setCookie({ ...cookie, secure: value })}
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Same Site :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <CustomSelect
                            options={[
                                { value: "Strict", label: "Strict" },
                                { value: "Lax", label: "Lax" },
                                { value: "None", label: "None" },
                            ]}
                            theme={theme}
                            value={["Strict", "Lax", "None"].indexOf(cookie.sameSite ?? "")}
                            onChange={function (value: any): void {
                                cookie.sameSite = value
                                setCookie({ ...cookie })
                            }}
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Creation :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <input
                            type="date"
                            value={cookie.expires === "Infinity" || cookie.expires === null ? "" : cookie.expires.toISOString().split("T")[0]}
                            onChange={(e) => setCookie({ ...cookie, expires: new Date(e.target.value) })}

                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Host Only :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <CustomCheckbox
                            checked={cookie.hostOnly || false}
                            onChange={(value) => setCookie({ ...cookie, hostOnly: value })}
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <div style={{
                        width: '10px',
                        flexGrow: 1,
                    }}>
                        Path is default :
                    </div>
                    <div style={{
                        flexGrow: 2,
                        width: "10px",
                    }}>
                        <CustomCheckbox
                            checked={cookie.pathIsDefault || false}
                            onChange={(value) => setCookie({ ...cookie, pathIsDefault: value })}
                        />
                    </div>
                </div>
                <AwesomeButton
                    type="primary"
                    onClick={function (): void {
                        setCookies([...cookies, cookie])
                        setCookie(defaultCookie)
                    }}                >
                    Add
                </AwesomeButton>
            </div>
        </div>
    )
}

function CookieItem({ selected, enabled, setEnable, key, value, index, onSelect }: {
    enabled: boolean,
    setEnable: (value: boolean) => void,
    selected: boolean,
    key: string,
    value: string,
    index: number,
    onSelect: (value: number) => void,
}) {
    const config = useContext(ConfigurationContext)
    const theme = getThemeColors(config.theme)
    return <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        color: selected ? theme.primaryContainer : theme.generalText,

    }}>
        <label style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
        }}>
            <CustomCheckbox
                checked={enabled}
                onChange={setEnable}
            />
        </label>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
        }}
            onClick={() => {
                onSelect(index)
            }}
        >
            <div style={{
                flexGrow: 1,
                width: "10px",
            }}>
                {key}
            </div>
            <div style={{
                flexGrow: 1,
                width: "10px",
            }}>
                {value}
            </div>
        </div>
    </div>
}