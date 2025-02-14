import React, { createContext, ReactElement, useContext, useEffect, useState } from "react"
import getRawFunctionHandler from "../handler/eventHandler/getRawFunctionHandler";
import saveFunctions from "../handler/eventHandler/saveFunctions";
import { FunctionProps } from "../../common/interfaces/variables";
import { TestFunction as TF } from "../../common/interfaces/variables";
import { ConfigurationContext } from "./configurationProvider";

export type Funcs = {
    name: string;
    example: string | undefined;
    description: string | undefined;
    params: Record<string, string> | undefined;
    fn: Function
}

export const FunctionCodeContext = createContext<{
    textCode: string,
    setTextCode: (a: string) => void,
    init: boolean,
    functionCache: {
        tests: Funcs[],
        generators: Funcs[]
    }
}>({
    textCode: "",
    setTextCode: (x) => { },
    init: false,
    functionCache: {
        tests: [],
        generators: []
    }
});

export default function FunctionCodeProvider({ children }: {
    children: ReactElement
}) {
    const [init, setInit] = useState(false)

    const [funs, setFuns] = useState("");

    const [FunctionCache, setFunctionCache] = useState({
        tests: [] as Funcs[],
        generators: [] as Funcs[]
    })

    function TestFunction(fn: TF, props: FunctionProps) {
        try {
            FunctionCache.tests.push({
                name: props.name,
                example: props.example,
                description: props.description,
                params: props.params,
                fn: fn,
            });
        } catch (err) {
            console.log("Error in test function", err);
        }
    }

    function GeneratorFunction(fn: Function, props: FunctionProps) {
        try {
            FunctionCache.generators.push({
                example: props.example,
                description: props.description,
                params: props.params,
                fn: fn,
                name: props.name,
            });
        } catch (err) {
            console.log("Error in generator function", err);
        }
    }

    function extractFunctions(data: string) {
        try {
            eval(data)
            setFunctionCache({ ...FunctionCache })
        } catch (err) {
            console.log("There is error evaluating the extraction of data", err)
        }
    }

    const config = useContext(ConfigurationContext)

    useEffect(() => {
        getRawFunctionHandler(config.file).then((x) => {
            extractFunctions(x)
            setFuns(x)
            setInit(true);
        })
    }, [config.file])

    useEffect(() => {
        if (init) {
            saveFunctions(funs)
        }
    }, [funs])


    return <FunctionCodeContext.Provider value={{
        textCode: funs, setTextCode: setFuns, init,
        functionCache: FunctionCache
    }}>
        {children}
    </FunctionCodeContext.Provider>
}
