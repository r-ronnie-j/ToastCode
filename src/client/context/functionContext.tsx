import React, { createContext, ReactElement, useEffect, useState } from "react"
import getRawFunctionHandler from "../handler/eventHandler/getRawFunctionHandler";
import saveFunctions from "../handler/eventHandler/saveFunctions";


export const FunctionCodeContext = createContext<{
    textCode: string,
    setTextCode: (a: string) => void,
    init: boolean,
}>({
    textCode: "",
    setTextCode: (x) => { },
    init: false
});

export default function FunctionCodeProvider({ children }: {
    children: ReactElement
}) {
    const [init, setInit] = useState(false)

    const [funs, setFuns] = useState("");

    useEffect(() => {
        getRawFunctionHandler().then((x) => {
            console.log("After function called", x)
            setFuns(x)
            setInit(true);
        })
    }, [])

    useEffect(() => {
        if (init) {
            saveFunctions(funs)
        }
    }, [funs])


    return <FunctionCodeContext.Provider value={{
        textCode: funs, setTextCode: setFuns, init
    }}>
        {children}
    </FunctionCodeContext.Provider>
}