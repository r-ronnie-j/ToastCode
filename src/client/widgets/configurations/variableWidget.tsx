import React, { useContext, useEffect, useState } from "react";
import { getThemeColors, ThemeColors } from "../../themes/getThemeColors";
import CustomCheckbox from "../../component/Input/CheckBox";
import SimpleInputSuggestions from "../../component/Input/SimpleInputSuggestion";
import DraggableList from "../../component/Draggable/DraggableList";
import { ConfigurationContext } from "../../context/configurationProvider";
import { VariableInfo } from "../../../common/interfaces/variables"
import getVariableHandler from "../../handler/eventHandler/getVariablHandler";
import saveVariableHandler from "../../handler/eventHandler/saveVariableHandler";
import { FaCode, FaDesktop } from "react-icons/fa6";
import VariableCodeComponent from "../../component/CodeComponent/variableCodeComponent";
import { VariableDataType } from "../../../common/constants/enums/variableEnums";
import SimpleSelectBox from "../../component/Select/SimpleSelect";


export default function VariableWidget() {

    let [init, setInit] = useState(false);

    let [isCode, setIsCode] = useState(false)

    useEffect(() => {
        getVariableHandler().then((x) => {
            let lastVar = x.at(-1)
            if (lastVar && lastVar.key.trim() === "" && lastVar.value.trim() === "") {
                setVars(x)
            } else {
                setVars([...x, {
                    key: "",
                    value: "",
                    enabled: true,
                    type: VariableDataType.string
                }]);
            }
            setInit(true);
        })
    }, [])

    const [vars, setVars] = useState<VariableInfo[]>([
        { enabled: true, key: '', value: '', type: VariableDataType.string }
    ]);

    useEffect(() => {
        if (init) {
            console.log("We are working fine at the use effect");
            saveVariableHandler(vars.slice(0, -1))
        }
    }, [vars])

    let config = useContext(ConfigurationContext)

    useEffect(() => {
        setTheme(getThemeColors(config.theme))
    }, [config.theme])

    const [theme, setTheme] = useState(getThemeColors(config.theme));

    return (
        <div style={{
            margin: "10px 5px",
            border: `1px solid ${theme.simpleBorder}`,
            borderRadius: '4px',
            padding: "5px 10px",
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: "10px",
                alignItems: 'center',
            }}>
                <div style={{
                    color: theme.primaryContainer,
                    fontSize: '1.25em',
                    fontWeight: 'bold',
                }}>Variables</div>
                {init && <div style={{
                    cursor: "pointer"
                }}>
                    {isCode
                        ?
                        <FaCode style={{ marginRight: 8 }} color={theme.primaryContainer} size={16} onClick={(e) => {
                            setIsCode(false)
                        }} />
                        : <FaDesktop style={{ marginRight: 8 }} color={theme.primaryContainer} size={16} onClick={(e) => {
                            setIsCode(true)
                        }} />
                    }
                </div>}
            </div>
            {init && (isCode
                ? <VariableCodeComponent vars={vars} setVars={setVars} />
                : <VariableGui vars={vars} setVars={setVars} theme={theme} />
            )}
        </div>
    );
}

function VariableGui({ vars, setVars, theme }: { vars: VariableInfo[], setVars: React.Dispatch<VariableInfo[]>, theme: ThemeColors }) {
    return (
        <div style={{
            borderRadius: "4px",
            marginTop: '10px',
        }}>
            <DraggableList
                onDragEnd={(x) => {
                    let fromIndex = x.active?.data?.current?.sortable?.index;
                    let toIndex = x.over?.data?.current?.sortable?.index;
                    if (
                        fromIndex === null ||
                        toIndex === null ||
                        fromIndex === undefined ||
                        toIndex === undefined ||
                        fromIndex === vars.length - 1
                    ) return;
                    if (toIndex === vars.length - 1) toIndex--;
                    const [element] = vars.splice(fromIndex, 1);
                    vars.splice(toIndex, 0, element);
                    setVars([...vars]);
                }}
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
                    <div style={{ flexGrow: 1, textAlign: "center", fontWeight: 'bold' }}>Key</div>
                    <div style={{ flexGrow: 3, textAlign: "center", fontWeight: 'bold' }}>Value</div>
                    <div style={{ flexGrow: 1 }}>Type</div>
                    <div style={{ marginLeft: '10px', opacity: '0' }}>🗑️</div>
                </div>}
            >
                {vars.map((_, i) => (
                    <VarIndividual key={i} index={i} vars={vars} setVars={setVars} />
                ))}
            </DraggableList>
        </div>
    );
}

function VarIndividual({ index, vars, setVars }: { index: number, vars: VariableInfo[], setVars: React.Dispatch<VariableInfo[]> }) {
    const handleChangeKey = (value: string) => {
        const updatedVars = [...vars];
        updatedVars[index].key = value;

        if (index === updatedVars.length - 1) {
            updatedVars.push({ enabled: true, key: '', value: '', type: VariableDataType.string });
        }

        setVars(updatedVars);
    };

    const handleChangeValue = (value: string) => {
        const updatedVars = [...vars];
        updatedVars[index].value = value;

        if (index === updatedVars.length - 1) {
            updatedVars.push({ enabled: true, key: '', value: '', type: VariableDataType.string });
        }

        setVars(updatedVars);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: '5px',
            boxSizing: 'border-box',
            alignItems: 'center',
        }}>
            <CustomCheckbox
                checked={vars[index]?.enabled}
                onChange={(x) => {
                    const updatedVars = [...vars];
                    updatedVars[index].enabled = x;
                    setVars(updatedVars);
                }}
            />
            <SimpleInputSuggestions
                suggestions={[]}
                flex={1}
                inputValue={vars[index].key}
                setInputValue={handleChangeKey}
            />
            <SimpleInputSuggestions
                suggestions={[]}
                flex={3}
                inputValue={vars[index].value}
                setInputValue={handleChangeValue}
            />
            <SimpleSelectBox
                flex={1}
                options={[
                    {
                        label: "string",
                        value: VariableDataType.string
                    }, {
                        label: "number",
                        value: VariableDataType.number
                    }, {
                        label: "boolean",
                        value: VariableDataType.boolean
                    }
                ]}
                selectedValue={vars[index].type}
                setSelectedValue={(a) => {
                    const updatedVars = [...vars];
                    updatedVars[index].type = a;
                    setVars(updatedVars);
                }}
            />
            <div style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => {
                if (index !== vars.length - 1) {
                    const updatedVars = [...vars];
                    updatedVars.splice(index, 1);
                    setVars(updatedVars);
                }
            }}>🗑️</div>
        </div>
    );
}