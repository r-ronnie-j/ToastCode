import React, { createContext, ReactElement, useEffect, useState } from "react"
import { Configuration } from "../../common/interfaces/messages";
import MessageType from "../../common/constants/enums/MessageEnums";
import initializeMessage from "../handler/messageHandler/initializeMessage";
import initializeHandler from "../handler/eventHandler/initializeHandler";
import ConfigWidget from "../widgets/configWidgets";
import EnvironmentProvider from "./environmentContext";
import VariableProvider from "./variableContext";
import FunctionCodeProvider from "./functionContext";
import ApiWidget from "../widgets/apiWidget";
import getRawRequestsHandler from "../handler/eventHandler/apis/rawRequestHandler";
import deleteRequestAtIndex from "../handler/eventHandler/apis/deleteRequestHandler";
import addRequestAtIndex from "../handler/eventHandler/apis/addRequestHandler";

let defaultConfiguration: Configuration = {
    theme: 0,
    fontSize: 14,
    isConfig: false
}

export const ConfigurationContext = createContext<Configuration>(defaultConfiguration);

export default function ConfigProvider() {
    const [loading, setLoading] = useState(true)
    const [config, setConfig] = useState<Configuration>(defaultConfiguration)
    let [rawData, setRawData] = useState<string[]>([])

    function onDelete(index: number, examples: {
        name: string,
        path: string
    }[]) {
        deleteRequestAtIndex({
            index,
            examples
        }).then((x) => {
            rawData.splice(index, 1);
            setRawData([...rawData])
        })
    }

    async function addAtIndex(index: number) {
        addRequestAtIndex(index).then((x) => {
            rawData.splice(index, 0, x);
            setRawData([...rawData])
        })
    }

    useEffect(() => {
        initializeHandler().then((x) => {
            setLoading(false);
            setConfig(x)
            getRawRequestsHandler().then((a) => {
                setRawData(a)
            })
        })
        return initializeMessage(setConfig)
    }, [])
    return <ConfigurationContext.Provider value={config}>
        <EnvironmentProvider>
            <VariableProvider>
                <FunctionCodeProvider>
                    <>
                        {loading ? ""
                            : config.isConfig ? <ConfigWidget />
                                : <ApiWidget rawData={rawData} onDelete={onDelete} addAtIndex={addAtIndex} />
                        }
                    </>
                </FunctionCodeProvider>
            </VariableProvider>
        </EnvironmentProvider>

    </ConfigurationContext.Provider>
}