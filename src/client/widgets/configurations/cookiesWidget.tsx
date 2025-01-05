import React, { useContext, useEffect, useState } from "react";
import { Cookie } from "../../../common/interfaces/apiRequests";
import getCookieHandler from "../../handler/eventHandler/getCookiesHandler";
import CustomSelect from "../../component/Select/CustomSelect";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import AwesomeButton from "../../component/Button/AwesomButton";

export default function CookiesWidget() {
    const [cookies, setCookies] = useState<Cookie[]>([]);
    const [domains, setDomains] = useState<string[]>([]);
    const [selectedDomainIndex, setSelectedDomainIndex] = useState(-1);
    const [editingCookieIndex, setEditingCookieIndex] = useState<number | null>(null);
    const [newCookie, setNewCookie] = useState<Partial<Cookie>>({});

    const config = useContext(ConfigurationContext);
    const theme = getThemeColors(config.theme);

    useEffect(() => {
        getCookieHandler().then((cooks) => {
            setCookies(cooks);
            const domainSet = new Set(cooks.map(x => x.domain).filter(x => x !== null));
            const domainsArray = Array.from(domainSet);
            setDomains(domainsArray);
            if (domainsArray.length > 0) {
                setSelectedDomainIndex(0);
            }
        });
    }, []);

    const handleEditClick = (index: number) => {
        setEditingCookieIndex(index);
        setNewCookie(cookies[index]);
    };

    const handleDeleteClick = (index: number) => {
        setCookies(cookies.filter((_, i) => i !== index));
    };

    const handleSaveEdit = () => {
        if (editingCookieIndex !== null) {
            const updatedCookies = [...cookies];
            updatedCookies[editingCookieIndex] = { ...updatedCookies[editingCookieIndex], ...newCookie };
            setCookies(updatedCookies);
            setEditingCookieIndex(null);
        }
    };

    const handleAddClick = () => {
        setEditingCookieIndex(-1); // Indicate that we are adding a new cookie
        setNewCookie({}); // Reset the new cookie state
    };

    const handleSaveNew = () => {
        if (newCookie.key && newCookie.value) {
            setCookies([...cookies, { ...newCookie, creation: new Date(), lastAccessed: new Date() } as Cookie]);
            setNewCookie({});
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                <div style={{ width: "150px" }}>
                    <CustomSelect
                        options={domains.map((x, i) => ({ label: x, value: i }))}
                        onChange={(x) => setSelectedDomainIndex(x)}
                        value={selectedDomainIndex}
                        theme={theme}
                    />
                </div>
            </div>

            <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%', border: `1px solid ${theme.simpleBorder}` }}>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                        <th>HttpOnly</th>
                        <th>Secure</th>
                        <th>SameSite</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody style={{
                    fontSize: "14px"
                }}>
                    {cookies.map((cookie, index) => (
                        <tr key={index}>
                            <td style={{ wordWrap: 'break-word', maxWidth: '150px', border: `1px solid ${theme.simpleBorder}`, padding: "3px" }}>
                                {cookie.key}
                            </td>
                            <td style={{ wordWrap: 'break-word', maxWidth: '150px', border: `1px solid ${theme.simpleBorder}`, padding: "3px" }}>
                                {cookie.value}
                            </td>
                            <td style={{ border: `1px solid ${theme.simpleBorder}`, padding: "3px" }}>
                                {String(cookie.httpOnly)}
                            </td>
                            <td style={{ border: `1px solid ${theme.simpleBorder}`, padding: "3px" }}>
                                {String(cookie.secure)}
                            </td>
                            <td style={{ wordWrap: 'break-word', maxWidth: '150px', border: `1px solid ${theme.simpleBorder}`, padding: "3px" }}>
                                {cookie.sameSite}
                            </td>
                            <td style={{
                                border: `1px solid ${theme.simpleBorder}`,
                                padding: "3px",
                                verticalAlign: "top" // Align the content to the top
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "flex-start", // Ensure buttons are aligned at the top
                                    gap: "10px",
                                    height: "auto"
                                }}>
                                    {editingCookieIndex === index ? (
                                        <>
                                            <AwesomeButton type="primary" onClick={handleSaveEdit}>Save</AwesomeButton>
                                            <AwesomeButton type="danger" onClick={() => setEditingCookieIndex(null)}>Cancel</AwesomeButton>
                                        </>
                                    ) : (
                                        <>
                                            <AwesomeButton type="primary" onClick={() => handleEditClick(index)}>Edit</AwesomeButton>
                                            <AwesomeButton type="danger" onClick={() => handleDeleteClick(index)}>Delete</AwesomeButton>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Cookie Button */}
            <div style={{
                width: "90%",
                marginTop: "20px"
            }}>
                <AwesomeButton onClick={handleAddClick} type="primary">Add Cookie</AwesomeButton>
            </div>

            {/* Add/Edit Form */}
            {editingCookieIndex !== null && (
                <div style={{ marginTop: '20px', color: theme.generalText, fontSize: "14px" }}>
                    <h3>{editingCookieIndex === -1 ? 'Add New Cookie' : 'Edit Cookie'}</h3>

                    {/* Form Fields */}
                    {Object.entries({
                        key: "Key",
                        value: "Value",
                        httpOnly: "HttpOnly",
                        secure: "Secure",
                        sameSite: "SameSite"
                    }).map(([fieldName, label]) => (
                        <div key={fieldName} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
                            <label htmlFor={fieldName}>{label}</label>
                            {fieldName === "httpOnly" || fieldName === "secure" ? (
                                <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '5px' }}>
                                    <input
                                        type="checkbox"
                                        id={fieldName}
                                        style={{ marginRight: '5px' }}
                                        checked={!!newCookie[fieldName]}
                                        onChange={(e) => setNewCookie({ ...newCookie, [fieldName]: e.target.checked })}
                                    />
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    id={fieldName}
                                    placeholder={`Enter ${label}`}
                                    value={newCookie[fieldName as keyof Cookie] as any || ''}
                                    onChange={(e) => setNewCookie({ ...newCookie, [fieldName]: e.target.value })}
                                    style={{
                                        maxWidth: '400px',
                                        background: 'transparent',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                />
                            )}
                        </div>
                    ))}

                    {editingCookieIndex === -1 ? (
                        <>
                            <button
                                onClick={handleSaveNew}
                                style={{
                                    padding: '10px 20px',
                                    background: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '10px'
                                }}
                            >
                                Add Cookie
                            </button>
                            <button
                                onClick={() => setEditingCookieIndex(null)}
                                style={{
                                    padding: '10px 20px',
                                    background: '#6c757d',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleSaveEdit()}
                                style={{
                                    padding: '10px 20px',
                                    background: theme.primaryContainer,
                                    color: theme.primaryText,
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '10px'
                                }}
                            >
                                Update Cookie
                            </button>
                            <button
                                onClick={() => setEditingCookieIndex(null)}
                                style={{
                                    padding: '10px 20px',
                                    background: theme.warningContainer,
                                    color: theme.primaryText,
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            )}

        </div>
    );
}
