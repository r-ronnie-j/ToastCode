import React, { createContext, ReactElement, useEffect, useState } from "react";
import { EnvironmentInfo } from "../../common/interfaces/variables";
import getEnvironmentHandler from "../handler/eventHandler/getEnvironmentHandler";
import saveEnvironmentHandler from "../handler/eventHandler/saveEnvironmentHandler";
import getEnvironmentMessage from "../handler/messageHandler/getEnvironmentMessage";

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
    const [paths, setPaths] = useState<EnvironmentInfo[]>([]);
    const [shouldSave, setShouldSave] = useState(false);

    useEffect(() => {
        getEnvironmentHandler().then((data) => {
            setPaths(data.paths);
        });
      
        getEnvironmentMessage((message) => {
            setPaths(message.paths);
        });
    }, []);

    useEffect(() => {
        if (shouldSave) {
            saveEnvironmentHandler(paths);
            setShouldSave(false); // Reset save flag
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
