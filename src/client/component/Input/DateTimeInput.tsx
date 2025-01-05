import React, { useContext, useState } from 'react';
import { ConfigurationContext } from '../../context/configurationProvider';
import { getThemeColors } from '../../themes/getThemeColors';

interface DateTimeInputProps {
    date: Date | null;
    setDate: (date: Date | null) => void;
}

interface Inputs {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    timeZone: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ date, setDate }) => {
    const config = useContext(ConfigurationContext);
    const theme = getThemeColors(config.theme);

    const [inputs, setInputs] = useState<Inputs>({
        year: date ? date.getFullYear().toString() : '',
        month: date ? (date.getMonth() + 1).toString().padStart(2, '0') : '',
        day: date ? date.getDate().toString().padStart(2, '0') : '',
        hour: date ? date.getHours().toString().padStart(2, '0') : '',
        minute: date ? date.getMinutes().toString().padStart(2, '0') : '',
        second: date ? date.getSeconds().toString().padStart(2, '0') : '',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const handleInputChange = (field: keyof Inputs, value: string) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [field]: value,
        }));
    };

    // Inline styles
    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        alignItems: 'center',
    };

    const inputGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const inputStyle = {
        width: '45px',
        padding: '4px',
        borderRadius: '4px',
        border: `1px solid ${theme.simpleBorder}`,
        transition: 'border-color 0.3s',
        backgroundColor: "transparent",
        color: theme.generalText
    };

    const inputFocusStyle = {
        ...inputStyle,
        borderColor: theme.primaryBorder,
        outline: 'none',
    };

    return (
        <div style={containerStyle as any}>
            <div style={inputGroupStyle as any}>
                <label style={labelStyle}>Year</label>
                <input
                    type="number"
                    value={inputs.year}
                    placeholder="YYYY"
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    style={inputStyle}
                    min="1900" // Set a minimum year
                    max={new Date().getFullYear() + 10} // Set a maximum year (10 years in the future)
                    onFocus={(e) => (e.currentTarget.style.borderColor = inputFocusStyle.borderColor)}
                    onBlur={(e) => (e.currentTarget.style.border = inputStyle.border)}
                />
            </div>
            <div style={inputGroupStyle as any}>
                <label style={labelStyle}>Month</label>
                <input
                    type="number"
                    value={inputs.month}
                    placeholder="MM"
                    onChange={(e) => handleInputChange('month', e.target.value)}
                    style={inputStyle}
                    min="1" // Months range from 1 to 12
                    max="12"
                    onFocus={(e) => (e.currentTarget.style.borderColor = inputFocusStyle.borderColor)}
                    onBlur={(e) => (e.currentTarget.style.border = inputStyle.border)}
                />
            </div>
            <div style={inputGroupStyle as any}>
                <label style={labelStyle}>Day</label>
                <input
                    type="number"
                    value={inputs.day}
                    placeholder="DD"
                    onChange={(e) => handleInputChange('day', e.target.value)}
                    style={inputStyle}
                    min="1" // Days range from 1 to 31 (adjust based on month)
                    max="31"
                    onFocus={(e) => (e.currentTarget.style.borderColor = inputFocusStyle.borderColor)}
                    onBlur={(e) => (e.currentTarget.style.border = inputStyle.border)}
                />
            </div>
            <div style={inputGroupStyle as any}>
                <label style={labelStyle}>Hour</label>
                <input
                    type="number"
                    value={inputs.hour}
                    placeholder="HH"
                    onChange={(e) => handleInputChange('hour', e.target.value)}
                    style={inputStyle}
                    min="0" // Hours range from 0 to 23
                    max="23"
                    onFocus={(e) => (e.currentTarget.style.borderColor = inputFocusStyle.borderColor)}
                    onBlur={(e) => (e.currentTarget.style.border = inputStyle.border)}
                />
            </div>
            <div style={inputGroupStyle as any}>
                <label style={labelStyle}>Minute</label>
                <input
                    type="number"
                    value={inputs.minute}
                    placeholder="MM"
                    onChange={(e) => handleInputChange('minute', e.target.value)}
                    style={inputStyle}
                    min="0" // Minutes range from 0 to 59
                    max="59"
                    onFocus={(e) => (e.currentTarget.style.borderColor = inputFocusStyle.borderColor)}
                    onBlur={(e) => (e.currentTarget.style.border = inputStyle.border)}
                />
            </div>
            <div style={inputGroupStyle as any}>
                <label style={labelStyle}>Second</label>
                <input
                    type="number"
                    value={inputs.second}
                    placeholder="SS"
                    onChange={(e) => handleInputChange('second', e.target.value)}
                    style={inputStyle}
                    min="0" // Seconds range from 0 to 59
                    max="59"
                    onFocus={(e) => (e.currentTarget.style.borderColor = inputFocusStyle.borderColor)}
                    onBlur={(e) => (e.currentTarget.style.border = inputStyle.border)}
                />
            </div>
        </div>
    );
};

export default DateTimeInput;
