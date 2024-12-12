import React, { CSSProperties, MouseEvent, useContext } from 'react';
import { ConfigurationContext } from '../../context/configurationProvider';
import { getThemeColors } from '../../themes/getThemeColors';

interface AwesomeButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    type?: 'primary' | 'secondary' | 'success' | 'danger';
    disabled?: boolean;
}

const AwesomeButton: React.FC<AwesomeButtonProps> = ({
    children,
    onClick,
    type = 'primary',
    disabled = false,
}) => {
    // Get theme configuration and colors
    const configuration = useContext(ConfigurationContext);
    const theme = getThemeColors(configuration.theme);

    // Function to get background and text colors based on button type
    const getColorsStyle = (): CSSProperties => {
        switch (type) {
            case 'primary':
                return {
                    backgroundColor: theme.primaryContainer,
                    color: theme.primaryText,
                };
            case 'secondary':
                return {
                    backgroundColor: theme.secondaryContainer,
                    color: theme.secondaryText,
                };
            case 'success':
                return {
                    backgroundColor: theme.successContainer,
                    color: theme.successText,
                };
            case 'danger':
                return {
                    backgroundColor: theme.errorContainer,
                    color: theme.errorText,
                };
            default:
                return {}; // Return empty object if no type matches
        }
    };

    // Mouse event handlers for hover effects
    const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        }
    };

    const handleMouseOut = (e: MouseEvent<HTMLButtonElement>) => {
        const colors = getColorsStyle();
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
    };

    // Combine base styles with type-specific colors
    const buttonStyle: CSSProperties = {
        gap: '5px',
        padding: '6px 16px', // Smaller padding for a compact size
        fontSize: '14px', // Slightly smaller font size
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px', // Rectangular shape with subtle rounded corners
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease, background-color 0.3s ease',
        outline: 'none',
        userSelect: 'none',
        opacity: disabled ? 0.5 : 1,
        transform: 'translateY(0) scale(1)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        ...getColorsStyle(), // Apply color styles from theme
    };

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default AwesomeButton;
