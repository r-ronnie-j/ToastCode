import React, { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { EnvironmentInfo } from "../../common/interfaces/variables";
import getEnvironmentHandler from "../handler/eventHandler/getEnvironmentHandler";
import saveEnvironmentHandler from "../handler/eventHandler/saveEnvironmentHandler";
import getEnvironmentMessage from "../handler/messageHandler/getEnvironmentMessage";
import { ConfigurationContext } from "./configurationProvider";

export const EnvironmentContext = createContext<{
    paths: EnvironmentInfo[];
    setPaths: (i: EnvironmentInfo[]) => void;
}>({
    paths: [],
    setPaths: () => { },
});

export default function EnvironmentProvider({
    children,
}: {
    children: ReactElement;
}) {
    const config = useContext(ConfigurationContext)
    const [paths, setPaths] = useState<EnvironmentInfo[]>([]);
    const [shouldSave, setShouldSave] = useState(false);

    useEffect(() => {
        getEnvironmentHandler(config.file).then((data) => {
            setPaths(data.paths);
        });
      
        getEnvironmentMessage((message) => {
            setPaths(message.paths);
        });
    }, []);

    useEffect(() => {
        if (shouldSave) {
            saveEnvironmentHandler(paths);
            setShouldSave(false); 
        }
    }, [paths, shouldSave]);

    const updatePaths = (newPaths: EnvironmentInfo[]) => {
        setPaths(newPaths);
        setShouldSave(true); 
    };

    return (
        <EnvironmentContext.Provider value={{ paths, setPaths: updatePaths }}>
            {children}
        </EnvironmentContext.Provider>
    );
}
