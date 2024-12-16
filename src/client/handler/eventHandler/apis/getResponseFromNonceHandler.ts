import MessageType from "../../../../common/constants/enums/MessageEnums";
import { ApiResponse } from "../../../../common/interfaces/apiRequests";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default function getResponseFromNonceHandler(nonce: string): Promise<ApiResponse | null> {
    return new Promise((resolve, reject) => {
        let initTimer = setTimeout(() => {
            vscode.postMessage({
                type: MessageType.GetResponseFromNonce,
                data: nonce
            });
        }, 1000);
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.GetResponseFromNonce) {
                console.log("wwww --- www", nonce, e.data.data);
                if (e.data.data.nonce === nonce) {
                    window.removeEventListener('message', listener);
                    clearTimeout(initTimer);
                    resolve(e.data.data.res);
                }
            }
        };
        window.addEventListener('message', listener);
    });
}