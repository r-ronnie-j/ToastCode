import React, { useContext } from "react";
import { ConfigurationContext } from "../../../context/configurationProvider";
import { getThemeColors } from "../../../themes/getThemeColors";
import { RequestContext } from "../../../context/requestContext";
import DraggableList from "../../../component/Draggable/DraggableList";
import { FormDataItem } from "../../../../common/constants/enums/variableEnums";
import CustomCheckbox from "../../../component/Input/CheckBox";
import SimpleInputSuggestions from "../../../component/Input/SimpleInputSuggestion";
import SimpleSelectBox from "../../../component/Select/SimpleSelect";
import FileInputBox from "../../../component/Input/FileInputBox";
import JsonXmlCodeComponent from "../../../component/CodeComponent/JsonCodeComponent";


export default function BodyFormData() {
    const config = useContext(ConfigurationContext)
    const theme = getThemeColors(config.theme)
    const requestData = useContext(RequestContext)
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
                    Type
                </div>
                <div style={{
                    flexGrow: 3,
                    width: "10px",
                    textAlign: "center"
                }}>
                    Value
                </div>
                <div style={{ margin: "0 4px", cursor: "pointer", opacity: 0, }}>🗑️</div>
            </div>}
        >
            {requestData.data.formData.map((x, i) => <FormComponent key={i} index={i} />)}
        </DraggableList>
    </div>
}

function FormComponent({ index }: { index: number }) {
    let requestContext = useContext(RequestContext)
    let formData = requestContext.data.formData.at(index)
    if (formData === null) {
        return ""
    }
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: "5px",
        boxSizing: 'border-box',
        alignItems: formData!.type === FormDataItem.json || formData!.type === FormDataItem.xml ? "start" : "center"
    }}>
        <div style={{
            padding: "5px 0 0 0",
        }}>
            <CustomCheckbox
                checked={true}
                onChange={(x) => {
                    formData!.enabled = !formData!.enabled
                    requestContext.setData({ ...requestContext.data })
                }}
            />
        </div>
        <div style={{
            padding: "3px 0 3px 0",
            flexGrow: 1,
            width: "10px",
            display: "flex",
        }}>
            <SimpleInputSuggestions
                suggestions={[]}
                flex={1}
                inputValue={formData!.key}
                setInputValue={(x) => {
                    formData!.key = x
                    if (index == requestContext.data.formData.length - 1) {
                        requestContext.data.formData.push({
                            key: "",
                            type: FormDataItem.text,
                            value: "",
                            enabled: true
                        })
                    }
                    requestContext.setData({ ...requestContext.data })
                }}
            />
        </div>
        <SimpleSelectBox
            options={[
                { label: "text", value: FormDataItem.text, color: "#FF5733" },
                { label: "number", value: FormDataItem.number, color: "#33FF57" },
                { label: "file", value: FormDataItem.file, color: "#3357FF" },
                { label: "boolean", value: FormDataItem.boolean, color: "#F1C40F" },
                { label: "json", value: FormDataItem.json, color: "#8E44AD" },
                { label: "xml", value: FormDataItem.xml, color: "#E67E22" }
            ]}
            flex={1}
            selectedValue={formData?.type}
            setSelectedValue={(x) => {
                formData!.type = x
                requestContext.setData({ ...requestContext.data })
            }} />
        {
            formData!.type === FormDataItem.file && <div style={{
                padding: "3px 0 3px 0",
                flexGrow: 3,
                width: "10px",
                display: "flex",
            }}> <FileInputBox flex={3} placeholder="Select File"
                onChange={(x) => {
                    formData!.value = x
                    console.log("what is the form data ", requestContext.data, x);
                    requestContext.setData({ ...requestContext.data })
                }}
                onDelete={() => {
                    formData!.value = ""
                    requestContext.setData({ ...requestContext.data })
                }}
                />
            </div>
        }
        {formData!.type === FormDataItem.json &&
            <JsonXmlCodeComponent
                setValue={(a) => {
                    if (formData) {
                        formData.value = a
                        requestContext.setData({ ...requestContext.data })
                    }
                }}
                type={"json"}
                flex={3}
                id={index}
                border={true}
                value={formData?.value ?? ""}
            />
        }
        {formData!.type === FormDataItem.xml && <JsonXmlCodeComponent
            setValue={(a) => {
                if (formData) {
                    formData.value = a
                    requestContext.setData({ ...requestContext.data })
                }
            }}
            type={"xml"}
            flex={3}
            border={true}
            id={index}
            value={formData?.value ?? ""}
        />}
        {formData!.type != FormDataItem.json && formData!.type != FormDataItem.xml && formData!.type != FormDataItem.file &&
            <div style={{
                flexGrow: 3,
                width: "10px",
                display: "flex"
            }}>
                <SimpleInputSuggestions
                    suggestions={[]}
                    flex={3}
                    inputValue=""
                    setInputValue={(x) => {
                        formData!.value = x
                        requestContext.setData({ ...requestContext.data })
                    }}
                />
            </div>
        }
        <div style={{ margin: "4px 4px", cursor: "pointer" }} onClick={() => {
            if (index !== requestContext.data.formData.length - 1) {
                requestContext.data.formData = requestContext.data.formData.splice(index, 1)
                requestContext.setData({ ...requestContext.data })
            }
        }}>🗑️</div>
    </div>
}