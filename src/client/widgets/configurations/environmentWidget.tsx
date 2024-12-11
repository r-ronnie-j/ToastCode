import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import getEnvironmentHandler from "../../handler/eventHandler/getEnvironmentHandler";
import { EnvironmentInfo } from "../../../common/interfaces/variables";
import CustomCheckbox from "../../component/Input/CheckBox";
import SimpleSelectBox from "../../component/Select/SimpleSelect";
import fileHandler from "../../handler/eventHandler/fileHandler";
import saveEnvironmentHandler from "../../handler/eventHandler/saveEnvironmentHandler";
import getEnvironmentMessage from "../../handler/messageHandler/getEnvironmentMessage";

export default function EnvironmentWidget() {
    const config = useContext(ConfigurationContext);
    const theme = getThemeColors(config.theme);
    const [enable, setEnable] = useState(true)
    const [init, setInit] = useState(false)

    const [paths, setPaths] = useState<EnvironmentInfo[]>([])

    useEffect(() => {
        getEnvironmentHandler().then((data) => {
            setPaths(data.paths)
            setInit(true)
        })
        return getEnvironmentMessage((a) => {
            setPaths(a.paths);
        })
    }, [])

    useEffect(() => {
        if (init) {
            saveEnvironmentHandler(paths)
        }
    }, [paths])

    return (
        <div style={{
            margin: "15px 5px",
            border: `1px solid ${theme.simpleBorder}`,
            borderRadius: '4px',
            padding: "5px 10px"
        }}>
            <div style={{
                color: theme.primaryContainer,
                fontSize: "1.25em",
                fontWeight: "bold",
                marginBottom: "10px",
            }}>
                Environment Variables
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <div style={{ display: 'flex', background: theme.tertiaryContainer, flexDirection: 'row', borderBottom: `2px solid ${theme.simpleBorder}` }}>
                    <div style={{ width: "30px", textAlign: 'center' }}>
                        <FaCheck style={{ verticalAlign: 'middle', marginLeft: '5px' }} color={theme.primaryContainer} />
                    </div>
                    <div style={{ width: '10px', flexGrow: 3, textAlign: 'center' }}>Environment File</div>
                    <div style={{ width: "10px", flexGrow: 1, textAlign: 'center' }}>Status</div>
                    <div style={{ width: "30px", textAlign: 'center' }}></div>
                </div>
                {paths.map((file, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottom: `1px solid ${theme.simpleBorder}`
                    }}>
                        <CustomCheckbox checked={file.enabled} onChange={(e) => {
                            paths[index].enabled = e;
                            setPaths([...paths]);
                        }} />
                        <div style={{ width: '10px', flexGrow: 3, paddingLeft: '10px' }}>{file.path}</div>
                        <div style={{ width: "10px", flexGrow: 1, color: file.status ? theme.successText : theme.errorText }}>
                            {file.status === undefined
                                ? "Waiting"
                                : file.status ? "Success" : "Error"}
                        </div>
                        <button onClick={() => {
                            paths.splice(index, 1);
                            setPaths([...paths]);
                        }} style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'center',
                            width: '30px',
                        }}>
                            <div style={{ margin: '0 4px', cursor: 'pointer' }}>🗑️</div>
                        </button>
                    </div>
                ))}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: '5px',
                        borderBottom: paths.length !== 0 ? `1px solid ${theme.simpleBorder}` : 'none',
                        height: '25px',
                    }}
                >
                    <CustomCheckbox checked={enable} onChange={(e) => setEnable(e)} />
                    <div
                        style={{
                            width: '20px',
                            flexGrow: 3,
                            cursor: 'pointer',
                            color: theme.primaryContainer,
                            paddingLeft: '10px',
                            alignSelf: 'stretch',
                            display: 'flex', // Use flex for centering
                            justifyContent: 'start', // Horizontally center content
                            alignItems: 'center', // Vertically center content
                        }}
                        onClick={async () => {
                            let f = await fileHandler();
                            if (f) {
                                paths.push({
                                    path: f,
                                    enabled: enable,
                                    status: false
                                });
                                setPaths([...paths]);
                            }
                        }}
                    >
                        Choose File
                    </div>
                    <div style={{ width: "10px", flexGrow: 1 }}>Waiting</div>
                    <div style={{ width: "30px", textAlign: 'center' }}></div>
                </div>
            </div>
        </div>
    );
}