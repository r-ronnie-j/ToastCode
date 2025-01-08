import React, { useState, useContext } from "react";
import { ConfigurationContext } from "../../../context/configurationProvider";
import { getThemeColors } from "../../../themes/getThemeColors";
import fileHandler from "../../../handler/eventHandler/fileHandler/fileHandler";
import AwesomeButton from "../../../component/Button/AwesomButton";
import { RequestContext } from "../../../context/requestContext";


const BodyBinary: React.FC = () => {
    const config = useContext(ConfigurationContext);
    const requestContext = useContext(RequestContext)
    const theme = getThemeColors(config.theme);
    const [fileName, setFileName] = useState<string>(requestContext.data.binary ?? "");

    const handleButtonClick = async () => {
        const file = await fileHandler();
        if (file !== null) {
            setFileName(file);
        }
        requestContext.data.binary = file ?? undefined
        requestContext.setData({ ...requestContext.data })
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            backgroundColor: "transparent",
            maxWidth: '500px',
            margin: '40px auto',
        }}>
            <div style={{
                marginBottom: '20px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: theme.primaryText,
                textAlign: 'center',
            }}>Upload Your File</div>
            <AwesomeButton
                type="primary"
                onClick={handleButtonClick}
            >
                Select File
            </AwesomeButton>
            {fileName && (
                <div style={{
                    marginTop: '20px',
                    fontSize: '16px',
                    color: theme.generalText,
                    fontStyle: 'italic',
                }}>
                    Selected File: <strong>{fileName.split("/").at(-1)}</strong>
                </div>
            )}
        </div>
    );
};

export default BodyBinary;
