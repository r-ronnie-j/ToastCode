import MessageType from "../../../common/constants/enums/MessageEnums";
import { Cookie } from "../../../common/interfaces/apiRequests";
import vscode from "../vscode";

export default function getCookieHandler(file:string): Promise<Cookie[]> {
    return new Promise((resolve, reject) => {
        vscode.postMessage({
            type: MessageType.CookiesData,
        });
        const listener = (e: MessageEvent<{
            type: MessageType,
            data: Cookie[],
            file:string
        }>) => {
            if (e.data && e.data.type === MessageType.CookiesData && file === e.data.file) {
                window.removeEventListener('message', listener);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}

export function updateCookieHandler(data: Cookie[]) {
    vscode.postMessage({
        type: MessageType.CookiesSaver,
        data: data
    });
}