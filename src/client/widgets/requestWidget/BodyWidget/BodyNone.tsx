import React, { useContext } from 'react';
import { MdInbox } from 'react-icons/md';
import { ConfigurationContext } from '../../../context/configurationProvider';
import { getThemeColors } from '../../../themes/getThemeColors';


export default function BodyNone() {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme)
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '230px',
            color: theme.generalText,
            fontSize: '16px',
            textAlign: 'center',
            backgroundColor: 'transparent',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            maxWidth: '300px',
            margin: 'auto'
        }}>
            <MdInbox size={48} style={{ marginBottom: '10px', color: theme.generalText }} />
            <p style={{
                fontWeight: 'bold',
                color: theme.generalText,
                marginBottom: '5px'
            }}>No Data To send</p>
        </div>
    );
}
