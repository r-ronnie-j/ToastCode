import React, { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ConfigurationContext } from '../../context/configurationProvider';
import { getThemeColors } from '../../themes/getThemeColors';

function SimpleIconButton({ label, title, onClick }: { label: string, title: string, onClick: () => void }) {
    const theme = getThemeColors(useContext(ConfigurationContext).theme);

    return (
        <button
            style={{
                border: `1px solid ${theme.simpleBorder}`,
                backgroundColor: 'transparent',
                color: theme.generalText,
                padding: '3px 5px',
                borderRadius: '2px',
                cursor: 'pointer',
                fontSize: '12px',
                margin: '3px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
                const button = e.currentTarget as HTMLButtonElement;
                button.style.color = theme.infoColor;
                button.style.borderColor = theme.primaryBorder;
                button.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                const button = e.currentTarget as HTMLButtonElement;
                button.style.color = theme.generalText;
                button.style.borderColor = theme.simpleBorder;
                button.style.transform = 'scale(1)';
            }}
            title={title}
            onClick={onClick}
        >
            <FaPlus style={{ marginRight: '5px' }} />
            {label}
        </button>
    );
}

export default SimpleIconButton;


