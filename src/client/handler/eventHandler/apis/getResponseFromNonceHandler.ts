import MessageType from "../../../../common/constants/enums/MessageEnums";
import { ApiResponse } from "../../../../common/interfaces/apiRequests";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default function getResponseFromNonceHandler(nonce: string): Promise<ApiResponse | null> {
    console.log("Aew we called at response client");
    return new Promise((resolve, reject) => {
        let initTimer = setTimeout(() => {
            vscode.postMessage({
                type: MessageType.GetResponseFromNonce,
                data: nonce
            });
        }, 1000);
        const listener = (e: MessageEvent<MessageData>) => {
            console.log("We are at handler");
            if (e.data && e.data.type === MessageType.GetResponseFromNonce) {
                console.log("wwww --- www", e.data.type);
                window.removeEventListener('message', listener);
                clearTimeout(initTimer);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}