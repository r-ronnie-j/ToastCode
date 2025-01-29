import MessageType from "../../../common/constants/enums/MessageEnums";
import vscode from "../vscode";
import { Configuration, MessageData } from "../../../common/interfaces/messages";
import getNonce from "../../../common/utilities/getNonce";

export default async function initializeHandler(): Promise<Configuration> {
    return new Promise((resolve) => {
        let nonce = getNonce();
        let initTimer = setTimeout(() => {
            vscode.postMessage({
                type: MessageType.Initialize,
                data: { nonce }
            });
        }, 1000);
        const listener = (e: MessageEvent<MessageData>) => {
            console.log("lets check what the data is",e.data);
            if (e.data && e.data.type === MessageType.Initialize && e.data.data.nonce === nonce) {
                window.removeEventListener('message', listener);
                clearTimeout(initTimer);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}