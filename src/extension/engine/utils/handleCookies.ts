import { Cookie } from "tough-cookie";

export default function handleCookies(headers: any): Cookie[] {
    const cookiesList: Cookie[] = [];
    if (headers['set-cookie']) {
        const setCookieHeader = Array.isArray(headers['set-cookie'])
            ? headers['set-cookie']
            : [headers['set-cookie']];

        setCookieHeader.forEach(cookieStr => {
            let cooki = Cookie.parse(cookieStr);
            if (cooki !== undefined) {
                cookiesList.push(cooki);
            }
        });
    }

    return cookiesList;
}
