import React, { ReactNode, useContext, useState } from 'react';
import { ConfigurationContext } from '../../context/configurationProvider';
import { getThemeColors } from '../../themes/getThemeColors';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';
import { RequestContext } from '../../context/requestContext';
import BlockTabBar from '../Topbar/blockTabBar';

function ExpandableWidget({ title,
    children,
    setIsExample,
}:
    {
        title: ReactNode,
        children: ReactNode,
        isExample: boolean,
        setIsExample: (a: boolean) => void
    }) {
    const configuration = useContext(ConfigurationContext);
    const theme = getThemeColors(configuration.theme);
    const [isExpanded, setIsExpanded] = useState(false);
    let name = useContext(RequestContext).data.name;

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div style={{
            width: '100%',
            border: `1px solid ${theme.simpleBorder}`,
            borderRadius: '5px',
            padding: '8px 5px',
            backgroundColor: 'transparent',
        }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: '10px',
                }}
            >
                <div style={{
                    cursor: "grab"
                }}>
                    <MdDragIndicator size={20} color={theme.primaryContainer} />
                </div>
                <div
                    style={{
                        width: "24px",
                        height: "24px",
                        border: `solid 1px ${theme.primaryContainer}`,
                        borderRadius: '50%',
                        backgroundColor: theme.primaryContainer,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, color 0.2s',
                    }}
                    onClick={toggleExpansion}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = theme.hoverText;
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'inherit';
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    }}
                >
                    {isExpanded ? <FiChevronUp size={20} color={theme.primaryText} /> : <FiChevronDown size={20} color={theme.primaryText} />}
                </div>
                <div style={{
                    fontWeight: 'bold',
                    fontSize: '1.25em',
                    color: theme.primaryContainer,
                    marginLeft: '10px'
                }}>
                    {name}
                </div>
                <div style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <div>
                        <BlockTabBar tabs={[{
                            title: "Api Test",
                            action: () => {
                                setIsExample(false)
                            }
                        },
                        {
                            title: "Examples",
                            action: () => {
                                setIsExample(true)
                            }
                        }]} />
                    </div>
                    {title}
                </div>
            </div>
            {isExpanded && (
                <div style={{ marginTop: '10px' }}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default ExpandableWidget;
