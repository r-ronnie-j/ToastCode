import React, { useContext } from "react";
import { ConfigurationContext } from "../../../context/configurationProvider";
import { getThemeColors } from "../../../themes/getThemeColors";
import { RequestContext } from "../../../context/requestContext";
import DraggableList from "../../../component/Draggable/DraggableList";
import CustomCheckbox from "../../../component/Input/CheckBox";
import SimpleInputSuggestions from "../../../component/Input/SimpleInputSuggestion";

export default function BodyUrlEncoded() {
    const config = useContext(ConfigurationContext)
    const theme = getThemeColors(config.theme)
    const requestContext = useContext(RequestContext)
    return <div style={{
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
                    fromIndex === requestContext.data.urlEncoded.length - 1
                ) return;
                if (toIndex === requestContext.data.urlEncoded.length - 1) toIndex--;
                const [element] = requestContext.data.urlEncoded.splice(fromIndex, 1);
                requestContext.data.urlEncoded.splice(toIndex, 0, element);
                requestContext.setData({ ...requestContext.data });
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
                    flexGrow: 3,
                    width: "10px",
                    textAlign: "center"
                }}>
                    Value
                </div>
                <div style={{ margin: "0 4px", cursor: "pointer", opacity: 0, }}>🗑️</div>
            </div>}
        >
            {
                requestContext.data.urlEncoded.map((x, i) => <IndividualUrlEncoded index={i} />)
            }
        </DraggableList>
    </div>
}

function IndividualUrlEncoded({ index }: { index: number }) {
    let requestContext = useContext(RequestContext)
    let urlEncoded = requestContext.data.urlEncoded.at(index)
    if (!urlEncoded) {
        return ""
    }
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: "5px",
        alignItems: "center"
    }}>
        <CustomCheckbox
            checked={urlEncoded.enabled}
            onChange={(x) => {
                urlEncoded.enabled = !urlEncoded.enabled
                requestContext.setData({ ...requestContext.data })
            }}
        />
        <SimpleInputSuggestions
            suggestions={[]}
            flex={1}
            inputValue={urlEncoded.key}
            setInputValue={(x) => {
                urlEncoded.key = x
                if (index === requestContext.data.urlEncoded.length - 1) {
                    requestContext.data.urlEncoded.push({
                        key: "",
                        value: "",
                        enabled: true
                    })
                }
                requestContext.setData({ ...requestContext.data })
            }}
        />
        <SimpleInputSuggestions
            suggestions={[]}
            flex={3}
            inputValue={urlEncoded.value}
            setInputValue={(x) => {
                urlEncoded.value = x
                if (index === requestContext.data.urlEncoded.length - 1) {
                    requestContext.data.urlEncoded.push({
                        key: "",
                        value: "",
                        enabled: true
                    })
                }
                requestContext.setData({ ...requestContext.data })
            }}
        />
        <div style={{ margin: "0 4px", cursor: "pointer" }}>🗑️</div>
    </div>
}