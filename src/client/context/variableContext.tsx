import React, { createContext, ReactElement, useEffect, useState } from "react"
import { VariableInfo } from "../../common/interfaces/variables";
import getVariableHandler from "../handler/eventHandler/getVariablHandler";
import saveVariableHandler from "../handler/eventHandler/saveVariableHandler";
import { VariableDataType } from "../../common/constants/enums/variableEnums";


export const VariableContext = createContext<{
    vars: VariableInfo[],
    setVars: React.Dispatch<VariableInfo[]>,
    init: boolean,
}>({
    vars: [],
    setVars: (x) => { },
    init: false
});

export default function VariableProvider({ children }: {
    children: ReactElement
}) {
    const [init, setInit] = useState(false)

    const [vars, setVars] = useState<VariableInfo[]>([
        { enabled: true, key: '', value: '', type: VariableDataType.string }
    ])

    useEffect(() => {
        getVariableHandler().then((x) => {
            console.log("Do we get variables in non config file", x);
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

    useEffect(() => {
        if (init) {
            saveVariableHandler(vars.slice(0, -1))
        }
    }, [vars])


    return <VariableContext.Provider value={{
        vars, setVars, init
    }}>
        {children}
    </VariableContext.Provider>
}