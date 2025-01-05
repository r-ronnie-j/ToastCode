import React, { useContext, useEffect, useState } from "react";
import { Cookie } from "../../../common/interfaces/apiRequests";
import getCookieHandler from "../../handler/eventHandler/getCookiesHandler";
import CustomSelect from "../../component/Select/CustomSelect";
import { ConfigurationContext } from "../../context/configurationProvider";
import { getThemeColors } from "../../themes/getThemeColors";

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

            <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%', border: '1px solid #ccc' }}>
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
                <tbody>
                    {cookies.map((cookie, index) => (
                        <tr key={index}>
                            <td style={{ wordWrap: 'break-word', maxWidth: '150px', border: '1px solid #ccc' }}>
                                {editingCookieIndex === index ?
                                    <input type="text" value={newCookie.key || cookie.key} onChange={(e) => setNewCookie({ ...newCookie, key: e.target.value })} /> :
                                    cookie.key}
                            </td>
                            <td style={{ wordWrap: 'break-word', maxWidth: '150px', border: '1px solid #ccc' }}>
                                {editingCookieIndex === index ?
                                    <input type="text" value={newCookie.value || cookie.value} onChange={(e) => setNewCookie({ ...newCookie, value: e.target.value })} /> :
                                    cookie.value}
                            </td>
                            <td style={{ border: '1px solid #ccc' }}>
                                {editingCookieIndex === index ?
                                    <input type="checkbox" checked={newCookie.httpOnly ?? cookie.httpOnly} onChange={(e) => setNewCookie({ ...newCookie, httpOnly: e.target.checked })} /> :
                                    String(cookie.httpOnly)}
                            </td>
                            <td style={{ border: '1px solid #ccc' }}>
                                {editingCookieIndex === index ?
                                    <input type="checkbox" checked={newCookie.secure ?? cookie.secure} onChange={(e) => setNewCookie({ ...newCookie, secure: e.target.checked })} /> :
                                    String(cookie.secure)}
                            </td>
                            <td style={{ wordWrap: 'break-word', maxWidth: '150px', border: '1px solid #ccc' }}>
                                {editingCookieIndex === index ?
                                    <input type="text" value={newCookie.sameSite || cookie.sameSite} onChange={(e) => setNewCookie({ ...newCookie, sameSite: e.target.value })} /> :
                                    cookie.sameSite}
                            </td>
                            <td style={{ border: '1px solid #ccc' }}>
                                {editingCookieIndex === index ? (
                                    <>
                                        <button onClick={handleSaveEdit}>Save</button>
                                        <button onClick={() => setEditingCookieIndex(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(index)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(index)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Cookie Button */}
            <button onClick={handleAddClick} style={{ marginTop: '20px' }}>Add Cookie</button>

            {/* Add/Edit Form */}
            {(editingCookieIndex === -1 || editingCookieIndex === null) && (
                <div style={{ marginTop: '20px' }}>
                    <h3>{editingCookieIndex === -1 ? 'Add New Cookie' : 'Edit Cookie'}</h3>

                    {/* Form Fields */}
                    {Object.entries({
                        key: "Key",
                        value: "Value",
                        httpOnly: "HttpOnly",
                        secure: "Secure",
                        sameSite: "SameSite"
                    }).map(([fieldName, label]) => (
                        <div key={fieldName} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor={fieldName}>{label}</label>
                            {fieldName === "httpOnly" || fieldName === "secure" ? (
                                <input
                                    type="checkbox"
                                    id={fieldName}
                                    checked={!!newCookie[fieldName]}
                                    onChange={(e) => setNewCookie({ ...newCookie, [fieldName]: e.target.checked })}
                                />
                            ) : (
                                <input
                                    type="text"
                                    id={fieldName}
                                    placeholder={`Enter ${label}`}
                                    value={newCookie[fieldName as keyof Cookie] as any || ''}
                                    onChange={(e) => setNewCookie({ ...newCookie, [fieldName]: e.target.value })}
                                />
                            )}
                        </div>
                    ))}

                    {editingCookieIndex === -1 ? (
                        <button onClick={handleSaveNew}>Add Cookie</button>
                    ) : (
                        <>
                            <button onClick={() => handleSaveEdit()}>Update Cookie</button>
                            <button onClick={() => setEditingCookieIndex(null)}>Cancel</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
