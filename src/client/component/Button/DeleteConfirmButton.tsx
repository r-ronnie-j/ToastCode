import React, { useState, useEffect, useContext } from 'react';
import { ConfigurationContext } from '../../context/configurationProvider';
import { getThemeColors } from '../../themes/getThemeColors';
import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps {
    onDelete: () => void;
    timeoutSeconds: number;
    title: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, timeoutSeconds, title = "Delete" }) => {
    let config = useContext(ConfigurationContext)
    let theme = getThemeColors(config.theme);
    const [isConfirming, setIsConfirming] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showRestore, setShowRestore] = useState(false);
    const [remainingTime, setRemainingTime] = useState(timeoutSeconds);

    useEffect(() => {
        let countdownInterval: NodeJS.Timeout | null = null;

        if (showRestore) {
            countdownInterval = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(countdownInterval as NodeJS.Timeout);
                        onDelete();
                        setShowRestore(false);
                        setRemainingTime(timeoutSeconds);
                        return timeoutSeconds;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (countdownInterval) clearInterval(countdownInterval);
        };
    }, [showRestore, onDelete, timeoutSeconds]);

    const handleDeleteClick = () => {
        setIsConfirming(true);
    };

    const handleConfirmDelete = () => {
        if (inputValue === "yes") {
            setIsConfirming(false);
            setInputValue('');
            setShowRestore(true);
        } else {
            setShowRestore(false);
            setIsConfirming(false);
            setRemainingTime(timeoutSeconds);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {!isConfirming && !showRestore && (
                <button
                    onClick={handleDeleteClick}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        font: theme.errorText,
                        color: theme.errorContainer, // Optional: Change the color to match the 'danger' theme
                        fontSize: '1rem' // Optional: Adjust size as needed
                    }}
                    aria-label="Delete"
                >
                    <FaTrash />
                </button>
            )}

            {isConfirming && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'transparent',
                    borderRadius: '4px',
                    border: `1px solid ${theme.errorContainer}`,
                }}>
                    <input
                        style={{
                            width: "140px",
                            height: '24px',
                            outline: 'none',
                            border: 'none',
                            color: theme.generalText,
                            background: 'transparent',
                            paddingLeft: '8px',
                            flex: '1'
                        }}
                        placeholder="Type 'yes' to confirm"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleConfirmDelete();
                            }
                            else if (e.key === "Escape") {
                                setShowRestore(false);
                                setIsConfirming(false);
                                setRemainingTime(timeoutSeconds);
                            }
                        }}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    />
                    <button
                        onClick={handleConfirmDelete}
                        style={{
                            padding: '7px 10px', // Slightly increased padding
                            backgroundColor: theme.errorContainer,
                            color: theme.errorText,
                            border: 'none',
                            borderRadius: '0 4px 4px 0', // Rounded corners on the right side only
                            cursor: 'pointer',
                            fontSize: '13px',
                        }}
                    >
                        Confirm
                    </button>
                </div>
            )}

            {showRestore && (
                <button
                    onClick={() => {
                        setShowRestore(false);
                        setIsConfirming(false);
                        setRemainingTime(timeoutSeconds);
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 8px',
                        backgroundColor: theme.secondaryContainer,
                        color: theme.secondaryText,
                        border: 'none',
                        borderRadius: '5px', // Slightly more rounded corners
                        cursor: 'pointer',
                        fontSize: '15px',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                >
                    <span
                        style={{
                            width: '20px', // Slightly larger for better visibility
                            height: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme.secondaryText,
                            color: theme.secondaryContainer,
                            borderRadius: '50%',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            marginRight: '6px',
                        }}
                    >
                        {remainingTime}
                    </span>
                    Restore
                </button>
            )}
        </div>
    );
};

export default DeleteButton;
