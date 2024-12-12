import React, { useContext } from "react"
import { ConfigurationContext } from "../../context/configurationProvider"
import { getThemeColors } from "../../themes/getThemeColors"
import { RequestContext } from "../../context/requestContext"
import DraggableList from "../../component/Draggable/DraggableList"
import CustomCheckbox from "../../component/Input/CheckBox"
import SimpleInputSuggestions from "../../component/Input/SimpleInputSuggestion"
import { allHttpHeaders } from "../../../common/constants/allHeaders"


export default function RequestHeaders() {
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
          fromIndex === requestData.data.headers.length - 1
        ) return;
        if (toIndex === requestData.data.headers.length - 1) toIndex--;
        const [element] = requestData.data.headers.splice(fromIndex, 1);
        requestData.data.headers.splice(toIndex, 0, element);
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
        requestData.data.headers.map((_, i) => {
          return <HeaderIndividual key={i} index={i} />
        })
      }
    </DraggableList>
  </div>
}



function HeaderIndividual({ index }: { index: number }) {
  const requestData = useContext(RequestContext);

  const header = requestData.data.headers.at(index);

  if (!header) {
    return null;
  }

  const handleChangeKey = (value: string) => {
    requestData.data.headers[index].key = value;

    if (index === requestData.data.headers.length - 1) {
      requestData.data.headers.push({
        enabled: true,
        key: '',
        value: '',
      });
    }

    requestData.setData({ ...requestData.data });
  };

  const handleChangeValue = (value: string) => {
    requestData.data.headers[index].value = value;

    if (index === requestData.data.headers.length - 1) {
      requestData.data.headers.push({
        enabled: true,
        key: '',
        value: '',
      });
    }

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
        checked={header?.enabled}
        onChange={(x) => {
          header.enabled = x;
          requestData.setData({ ...requestData.data });
        }}
      />
      <SimpleInputSuggestions
        suggestions={Object.keys(allHttpHeaders).map((x) => ({
          name: x,
        }))}
        flex={1}
        inputValue={header.key ?? ''}
        setInputValue={handleChangeKey}
      />
      <SimpleInputSuggestions
        suggestions={
          header.key && header.key in allHttpHeaders
            ? (allHttpHeaders as Record<string, string[]>)[header.key].map((x: string) => ({
              name: x,
            }))
            : []
        }
        flex={3}
        inputValue={header.value ?? ''}
        setInputValue={handleChangeValue}
      />
      <div style={{ margin: '0 4px', cursor: 'pointer' }}>🗑️</div>
    </div>
  );
}
