import React, { useContext } from "react"
import { ConfigurationContext } from "../../context/configurationProvider"
import { getThemeColors } from "../../themes/getThemeColors"
import { RequestContext } from "../../context/requestContext"
import DraggableList from "../../component/Draggable/DraggableList"
import SimpleInputSuggestions from "../../component/Input/SimpleInputSuggestion"
import CustomCheckbox from "../../component/Input/CheckBox"
import { VariableContext } from "../../context/variableContext"
import { generatorFuncDescriptions } from "../../../common/generators/generatorDocumentation"


export default function RequestParams() {
  let config = useContext(ConfigurationContext)
  let theme = getThemeColors(config.theme)
  let requestData = useContext(RequestContext)
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
          fromIndex === requestData.data.params.length - 1
        ) return;
        if (toIndex === requestData.data.params.length - 1) toIndex--;
        const [element] = requestData.data.params.splice(fromIndex, 1);
        requestData.data.params.splice(toIndex, 0, element);
        requestData.setData({ ...requestData.data });
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
        requestData.data.params.map((_, i) => {
          return <ParamsIndividual key={i} index={i} />
        })
      }
    </DraggableList>
  </div>
}



function ParamsIndividual({ index }: { index: number }) {

  const requestData = useContext(RequestContext);

  let variablesContext = useContext(VariableContext)

  const params = requestData.data.params.at(index);

  function formUrl() {
    try {
      let url = new URL(requestData.data.url)
      url.searchParams.forEach((key, value) => {
        let paramIndex = requestData.data.params.findIndex((a) => {
          a.key === key
        })
        if (paramIndex !== -1) {
          let para = requestData.data.params[paramIndex]
          if (para.enabled) url.searchParams.set(key, para.value)
          else url.searchParams.delete(key)
        }
      })
      requestData.data.url = url.toString()
    } catch (_) { }
  }

  if (!params) {
    return null;
  }

  const handleChangeKey = (value: string) => {
    requestData.data.params[index].key = value;

    if (index === requestData.data.params.length - 1) {
      requestData.data.params.push({
        enabled: true,
        key: '',
        value: '',
      });
    }
    formUrl()
    requestData.setData({ ...requestData.data });
  };

  const handleChangeValue = (value: string) => {
    requestData.data.params[index].value = value;

    if (index === requestData.data.params.length - 1) {
      requestData.data.params.push({
        enabled: true,
        key: '',
        value: '',
      });
    }
    formUrl()
    requestData.setData({ ...requestData.data });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '5px',
        boxSizing: 'border-box',
        alignItems: 'center',
      }}
    >
      <CustomCheckbox
        checked={params?.enabled}
        onChange={(x) => {
          params.enabled = x;
          formUrl()
          requestData.setData({ ...requestData.data });
        }}
      />
      <SimpleInputSuggestions
        suggestions={[
          ...variablesContext.vars.slice(0, -1).map((a) => {
            return {
              name: `\$\{${a.key}\}`,
            }
          }),
          ...generatorFuncDescriptions.map((a) => {
            return {
              name: `\$\{${a.name}()\}`,
            }
          })
        ]}
        flex={1}
        inputValue={params.key ?? ''}
        setInputValue={handleChangeKey}
      />
      <SimpleInputSuggestions
        suggestions={[
          ...variablesContext.vars.slice(0, -1).map((a) => {
            return {
              name: `\$\{${a.key}\}`,
            }
          }),
          ...generatorFuncDescriptions.map((a) => {
            return {
              name: `\$\{${a.name}()\}`,
            }
          })
        ]}
        flex={3}
        inputValue={params.value ?? ''}
        setInputValue={handleChangeValue}
      />
      <div style={{ margin: '0 4px', cursor: 'pointer' }} onClick={() => {
        if (requestData.data.params.length - 1 !== index) {
          requestData.data.params = requestData.data.params.splice(index, 1)
          requestData.setData({ ...requestData.data })
        }
      }}>🗑️</div>
    </div>
  );
}
