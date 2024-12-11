import React, { createContext, ReactElement, useEffect, useState } from "react"
import { Configuration } from "../../common/interfaces/messages";
import MessageType from "../../common/constants/enums/MessageEnums";
import initializeMessage from "../handler/messageHandler/initializeMessage";
import initializeHandler from "../handler/eventHandler/initializeHandler";
import ConfigWidget from "../widgets/configWidgets";
import EnvironmentProvider from "./environmentContext";
import VariableProvider from "./variableContext";

let defaultConfiguration: Configuration = {
    theme: 0,
    fontSize: 14,
    isConfig: false
}

export const ConfigurationContext = createContext<Configuration>(defaultConfiguration);

export default function ConfigProvider() {
    const [loading, setLoading] = useState(true)
    const [config, setConfig] = useState<Configuration>(defaultConfiguration)
    useEffect(() => {
        initializeHandler().then((x) => {
            setLoading(false);
            setConfig(x)
        })
        return initializeMessage(setConfig)
    }, [])
    return <ConfigurationContext.Provider value={config}>
        <EnvironmentProvider>
            <VariableProvider>
                <>
                    {loading ? "Loading..."
                        : config.isConfig ? <ConfigWidget />
                            : <div>
                                We will show requests editors here
                            </div>
                    }
                </>
            </VariableProvider>
        </EnvironmentProvider>

    </ConfigurationContext.Provider>
}