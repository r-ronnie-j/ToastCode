import React, { createContext, ReactElement, useEffect, useState } from "react"
import { EnvironmentInfo } from "../../common/interfaces/variables";
import getEnvironmentHandler from "../handler/eventHandler/getEnvironmentHandler";
import saveEnvironmentHandler from "../handler/eventHandler/saveEnvironmentHandler";
import getEnvironmentMessage from "../handler/messageHandler/getEnvironmentMessage";


export const EnvironmentContext = createContext<{
    paths: EnvironmentInfo[],
    setPaths: React.Dispatch<EnvironmentInfo[]>
}>({
    paths: [],
    setPaths: (x) => { }
});

export default function EnvironmentProvider({ children }: {
    children: ReactElement
}) {
    const [init, setInit] = useState(false)

    const [paths, setPaths] = useState<EnvironmentInfo[]>([])

    useEffect(() => {
        getEnvironmentHandler().then((data) => {
            setPaths(data.paths)
            setInit(true)
        })
    }, [])

    useEffect(() => {
        if (init) {
            saveEnvironmentHandler(paths)
        }
    }, [paths])
    return <EnvironmentContext.Provider value={{
        paths, setPaths
    }}>
        {children}
    </EnvironmentContext.Provider>
}