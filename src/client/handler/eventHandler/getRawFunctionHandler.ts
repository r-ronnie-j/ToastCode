import MessageType from "../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../common/interfaces/messages";
import vscode from "../vscode";

export default function getRawFunctionHandler(file:string): Promise<string> {
    return new Promise((resolve) => {
        let initTimer = setTimeout(() => {
            vscode.postMessage({
                type: MessageType.GetRawFunction,
            });
        }, 1000);
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.GetRawFunction && e.data.file === file) {
                window.removeEventListener('message', listener);
                clearTimeout(initTimer);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}