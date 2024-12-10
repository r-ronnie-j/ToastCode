import MessageType from "../../../common/constants/enums/MessageEnums";
import vscode from "../vscode"
import { Configuration, MessageData } from "../../../common/interfaces/messages";

export default async function initializeHandler(): Promise<Configuration> {
    return new Promise((resolve) => {
        console.log("At extension");
        let initTimer = setTimeout(() => {
            vscode.postMessage({
                type: MessageType.Initialize,
                data: null
            });
        }, 1000);
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.Initialize) {
                window.removeEventListener('message', listener);
                clearTimeout(initTimer);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}