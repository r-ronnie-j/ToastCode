import React, { useContext, useState } from "react"
import { ConfigurationContext } from "../../context/configurationProvider"
import { getThemeColors } from "../../themes/getThemeColors"
import DraggableList from "../../component/Draggable/DraggableList"
import { Cookie } from "../../../common/interfaces/apiRequests"
import BarInputSuggestions from "../../component/Input/BarInputSuggestions"
import CustomCheckbox from "../../component/Input/CheckBox"
import CustomSelect from "../../component/Select/CustomSelect"
import AwesomeButton from "../../component/Button/AwesomButton"
import { RequestContext } from "../../context/requestContext"
import DateTimeInput from "../../component/Input/DateTimeInput"


export default function RequestCookies() {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)
    let request = useContext(RequestContext)

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
    let [selected, setSelected] = useState<number>(-1)

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
                {request.data.requestCookies.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        <p style={{ fontSize: '18px' }}>🍪 No cookies added yet! 🍪</p>
                        <p style={{ fontSize: '14px' }}>Please add some cookies to see them here.</p>
                    </div>
                ) : (
                    request.data.requestCookies.map((c, index) => (
                        <CookieItem
                            key={index} // Use index as key if there's no unique identifier
                            keyValue={c.key}
                            value={c.value}
                            selected={selected === index}
                            onSelect={() => {
                                setSelected(index);
                                setCookie(c);
                            }}
                        />
                    ))
                )}
            </DraggableList>
            <div style={{ height: "20px" }} />
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
                    alignItems: 'center',
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
                            setValue={(value) => {
                                cookie.key = value
                                setCookie({ ...cookie })
                            }}
                            value={cookie.key}
                            suggestions={[]}
                            placeholder="Cookie Key"
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',

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
                    alignItems: 'center',

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
                        <DateTimeInput
                            date={cookie.expires === "Infinity" ? null : cookie.expires}
                            setDate={(date) => setCookie({ ...cookie, expires: date })}
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',

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
                    alignItems: 'center',

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
                    alignItems: 'center',

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
                    alignItems: 'center',

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
                    alignItems: 'center',

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
                            onChange={function (value: number): void {
                                cookie.sameSite = ["Strict", "Lax", "None"][value]
                                setCookie({ ...cookie })
                            }}
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',

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
                        <DateTimeInput
                            date={cookie.creation === "Infinity" ? null : cookie.creation}
                            setDate={(date) => setCookie({ ...cookie, creation: date })}
                        />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',

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
                    alignItems: 'center',

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
                <div>
                    <AwesomeButton
                        type="primary"
                        onClick={function (): void {
                            if (selected === -1) {
                                request.data.requestCookies.push(cookie)
                            } else {
                                request.data.requestCookies[selected] = cookie
                            }
                            setCookie(defaultCookie)
                            setSelected(-1)
                            request.setData({ ...request.data })
                        }}>
                        {selected === -1 ? "Add" : "Save Edit"}
                    </AwesomeButton>
                    <div style={{ width: "20px" }} />
                    {
                        selected !== -1 && <AwesomeButton
                            type="secondary"
                            onClick={function (): void {
                                setCookie(defaultCookie)
                                request.setData({ ...request.data })
                                setSelected(-1)
                            }}>
                            Ignore
                        </AwesomeButton>
                    }
                </div>
            </div>
        </div>
    )
}

function CookieItem({ selected, keyValue, value, onSelect }: {
    selected: boolean,
    keyValue: string,
    value: string,
    onSelect: () => void,
}) {
    const config = useContext(ConfigurationContext);
    const theme = getThemeColors(config.theme);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                color: selected ? theme.primaryText : theme.generalText,
                backgroundColor: selected ? theme.primaryContainer : 'transparent',
                borderRadius: '4px',
                padding: '8px',
                cursor: 'pointer',
            }}
            onClick={onSelect}
        >
            <div style={{
                flexGrow: 1,
                width: "10px",
            }}>
                {keyValue}
            </div>
            <div style={{
                flexGrow: 1,
                width: "10px",
            }}>
                {value}
            </div>
        </div>
    );
}