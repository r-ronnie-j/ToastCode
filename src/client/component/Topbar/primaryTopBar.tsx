import React, { useContext, useEffect, useState } from "react";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import BarInputSuggestions from "../Input/BarInputSuggestions";
import { RequestContext } from "../../context/requestContext";
import { FaCode } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa6";

export default function PrimaryTopBar({
    isVerticalView, setIsVerticalView, isCodeView, setIsCodeView
}: {
    isVerticalView: boolean,
    setIsVerticalView: (a: boolean) => void,
    isCodeView: boolean,
    setIsCodeView: (a: boolean) => void
}) {
    const configuration = useContext(ConfigurationContext);
    const theme = getThemeColors(configuration.theme);
    const requestData = useContext(RequestContext)
    let [showVerticalOption, setShowVerticalOption] = useState(true)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setShowVerticalOption(false);
            } else {
                setShowVerticalOption(true)
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "6px",
                backgroundColor: "transparent",
                marginLeft: "5px",
                marginRight: "5px",
                gap: "10px"
            }}
        >
            <BarInputSuggestions
                suggestions={[]}
                onSuggestionSelect={() => { }}
                placeholder=" Enter name"
                value={requestData.data.name}
                setValue={(value: string) => {
                    requestData.data.name = value;
                    requestData.setData({ ...requestData.data })
                }} />
            <div style={{ display: "flex", gap: "10px" }}>
                {showVerticalOption && <button
                    onClick={() => setIsVerticalView(!isVerticalView)}
                    style={{
                        fontSize: "20px",
                        border: `2px solid ${theme.simpleBorder}`,
                        cursor: "pointer",
                        color: theme.generalText,
                        transition: "color 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        width: "35px",
                        borderRadius: "7px",
                        height: "35px",
                        justifyContent: "center",
                        background:"none"
                    }}
                    title={isVerticalView ? "Switch to Horizontal View" : "Switch to Vertical View"}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme.primaryBorder
                        e.currentTarget.style.borderColor = theme.primaryBorder
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme.generalText
                        e.currentTarget.style.borderColor = theme.simpleBorder
                    }}
                >
                    <span
                        style={{
                            display: "inline-block",
                            transform: isVerticalView ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                            padding: "2px 4px",
                            fontSize: "18px",
                        }}
                    >
                        ][
                    </span>
                </button>}
                <button
                    onClick={() => setIsCodeView(!isCodeView)}
                    style={{
                        fontSize: "16px",
                        background: "none",
                        border: `2px solid ${theme.simpleBorder}`,
                        cursor: "pointer",
                        color: theme.generalText,
                        transition: "color 0.3s ease",
                        gap: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center',
                        width: "35px",
                        borderRadius: "7px",
                        height: "35px",
                    }}
                    title={isCodeView ? "Switch to GUI View" : "Switch to Code View"}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme.primaryBorder
                        e.currentTarget.style.borderColor = theme.primaryText
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = theme.simpleBorder
                        e.currentTarget.style.color = theme.generalText
                    }}
                >
                    {isCodeView
                        ? <FaCode />
                        : <FaDesktop />
                    }
                </button>
            </div>
        </div>
    );
}
