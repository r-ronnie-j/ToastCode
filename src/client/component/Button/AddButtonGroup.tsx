import React from "react";
import SimpleIconButton from "./SimpleIconButton";

function AddButtonGroup({ actions }: {
    actions: {
        label: string,
        action: () => void,
    }[]
}) {

    return (
        <div
            style={{
                display: 'flex',
                gap: '4px',
                width: '100%',
                justifyContent: 'center',
                position: 'relative',
                transition: 'opacity 0.8s ease',
                // marginBottom: "10px"
            }}
        >
            {actions.map((a) => (
                <SimpleIconButton
                    key={a.label}
                    label={a.label}
                    title={`Add new ${a.label} cell`}
                    onClick={a.action}
                />
            ))}
        </div>
    );
}

export default AddButtonGroup;
