import React from 'react';

interface RadioOption {
    value: any;
    label: string;
}

interface HorizontalRadioGroupProps {
    options: RadioOption[];
    selectedValue: any;
    onChange: (value: any) => void;
}

const HorizontalRadioGroup: React.FC<HorizontalRadioGroupProps> = ({
    options,
    selectedValue,
    onChange,
}) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {options.map((option) => (
                <label key={option.value} style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => onChange(option.value)}
                        style={{ marginRight: '5px' }}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default HorizontalRadioGroup;