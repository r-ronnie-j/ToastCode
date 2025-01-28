import React, { useContext, useEffect, useState } from "react";
import { Cookie } from "../../../common/interfaces/apiRequests";
import getCookieHandler, { updateCookieHandler } from "../../handler/eventHandler/cookiesHandler";
import CustomSelect from "../../component/Select/CustomSelect";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";
import AwesomeButton from "../../component/Button/AwesomButton";
import DateTimeInput from "../../component/Input/DateTimeInput";

export default function CookiesWidget() {
    const [cookies, setCookies] = useState<Cookie[]>([]);
    const [domains, setDomains] = useState<string[]>([]);
    const [selectedDomainIndex, setSelectedDomainIndex] = useState(-1);
    const [editingCookieIndex, setEditingCookieIndex] = useState<number | null>(null);
    const [newCookie, setNewCookie] = useState<Partial<Cookie>>({});

    const config = useContext(ConfigurationContext);
    const theme = getThemeColors(config.theme);

    useEffect(() => {
        getCookieHandler(config.file).then((cooks) => {
            setCookies(cooks);
            const domainSet = new Set(cooks.map(x => x.domain).filter(x => x !== null));
            const domainsArray = Array.from(domainSet);
            setDomains(domainsArray);
            if (domainsArray.length > 0) {
                setSelectedDomainIndex(0);
            }
        });
    }, []);

    useEffect(() => {
        updateCookieHandler(cookies)
    }, [cookies])

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
        <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                <div style={{ width: "200px" }}>
                    <CustomSelect
                        options={domains.map((x, i) => ({ label: x, value: i }))}
                        onChange={(x) => setSelectedDomainIndex(x)}
                        value={selectedDomainIndex}
                        theme={theme}
                    />
                </div>
            </div>

            <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                    <tr style={{ backgroundColor: theme.secondaryContainer, color: theme.secondaryText }}>
                        <th style={{ padding: '10px', borderBottom: `2px solid ${theme.simpleBorder}` }}>Key</th>
                        <th style={{ padding: '10px', borderBottom: `2px solid ${theme.simpleBorder}` }}>Value</th>
                        <th style={{ padding: '10px', borderBottom: `2px solid ${theme.simpleBorder}` }}>HttpOnly</th>
                        <th style={{ padding: '10px', borderBottom: `2px solid ${theme.simpleBorder}` }}>Secure</th>
                        <th style={{ padding: '10px', borderBottom: `2px solid ${theme.simpleBorder}` }}>SameSite</th>
                        <th style={{ padding: '10px', borderBottom: `2px solid ${theme.simpleBorder}` }}>Actions</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: "14px" }}>
                    {cookies.map((cookie, index) => {
                        if (cookie.domain === domains[selectedDomainIndex]) {
                            return <tr key={index} style={{ backgroundColor: index % 2 === 0 ? theme.generalContainer : theme.alternativeContainer }}>
                                <td style={{ wordWrap: 'break-word', maxWidth: '150px', borderBottom: `1px solid ${theme.simpleBorder}`, padding: "10px" }}>{cookie.key}</td>
                                <td style={{ wordWrap: 'break-word', maxWidth: '150px', borderBottom: `1px solid ${theme.simpleBorder}`, padding: "10px" }}>{cookie.value}</td>
                                <td style={{ borderBottom: `1px solid ${theme.simpleBorder}`, padding: "10px" }}>{String(cookie.httpOnly)}</td>
                                <td style={{ borderBottom: `1px solid ${theme.simpleBorder}`, padding: "10px" }}>{String(cookie.secure)}</td>
                                <td style={{ wordWrap: 'break-word', maxWidth: '150px', borderBottom: `1px solid ${theme.simpleBorder}`, padding: "10px" }}>{cookie.sameSite}</td>
                                <td style={{ borderBottom: `1px solid ${theme.simpleBorder}`, padding: "10px", verticalAlign: "top" }}>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "flex-start",
                                        gap: "10px"
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
                        } else {
                            return ""
                        }
                    })}
                </tbody>
            </table>

            {/* Add Cookie Button */}
            <div style={{ width: "90%", marginTop: "20px", textAlign: "start" }}>
                <AwesomeButton onClick={handleAddClick} type="primary">Add Cookie</AwesomeButton>
            </div>

            {/* Add/Edit Form */}
            {editingCookieIndex !== null && (
                <div style={{ marginTop: '20px', color: theme.generalText, fontSize: "14px" }}>
                    <h3>{editingCookieIndex === -1 ? 'Add New Cookie' : 'Edit Cookie'}</h3>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: 'wrap',
                        gap: "20px"
                    }}>
                        {/* Form Fields */}
                        {Object.entries({
                            key: "Key",
                            value: "Value",
                            expires: "Expires",
                            domain: "Domain",
                            path: "Path",
                            httpOnly: "HttpOnly",
                            secure: "Secure",
                            sameSite: "SameSite",
                            creation: "Creation",
                            hostOnly: "Host Only",
                            pathIsDefault: "Path Is Default"
                        }).map(([fieldName, label]) => {
                            return <div key={fieldName} style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
                                <label htmlFor={fieldName} style={{ marginBottom: '5px' }}>{label}</label>
                                {fieldName === "httpOnly" || fieldName === "secure" || fieldName === "hostOnly" || fieldName === "pathIsDefault" ? (
                                    <input
                                        type="checkbox"
                                        id={fieldName}
                                        checked={!!newCookie[fieldName]}
                                        onChange={(e) => setNewCookie({ ...newCookie, [fieldName]: e.target.checked })}
                                        style={{
                                            cursor: 'pointer',
                                            width: '20px',
                                            height: '20px',
                                            marginLeft: '10px'
                                        }}
                                    />
                                ) : fieldName === "expires" || fieldName === "creation" ? (
                                    <DateTimeInput
                                        date={newCookie[fieldName] ? new Date(newCookie[fieldName]) : null}
                                        setDate={(date) => setNewCookie({ ...newCookie, [fieldName]: date })}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        id={fieldName}
                                        placeholder={`Enter ${label}`}
                                        value={newCookie[fieldName as keyof Cookie] as any || ''}
                                        onChange={(e) => setNewCookie({ ...newCookie, [fieldName]: e.target.value })}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = theme.primaryBorder;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#ccc';
                                        }}
                                        style={{
                                            width: '400px',
                                            backgroundColor: "transparent",
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            transition: 'border-color 0.3s',
                                            outline: 'none',
                                            color: theme.generalText
                                        }}
                                    />
                                )}
                            </div>
                        })}
                    </div>
                    {/* Buttons for Add/Edit */}
                    <div style={{
                        display: "flex",
                        gap: "10px"
                    }}>
                        {editingCookieIndex === -1 ? (
                            <>
                                <AwesomeButton onClick={handleSaveNew} type="primary">Add Cookie</AwesomeButton>
                                <AwesomeButton onClick={() => setEditingCookieIndex(null)} type="secondary">Cancel</AwesomeButton>
                            </>
                        ) : (
                            <>
                                <AwesomeButton onClick={() => handleSaveEdit()} type="primary">Update Cookie</AwesomeButton>
                                <AwesomeButton onClick={() => setEditingCookieIndex(null)} type="secondary">Cancel</AwesomeButton>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
