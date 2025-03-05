import MessageType from "../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../common/interfaces/messages";
import { VariableInfo } from "../../../common/interfaces/variables";
import vscode from "../vscode";

export default function getVariableHandler(file: string): Promise<VariableInfo[]> {
    return new Promise((resolve) => {
        let initTimer = setTimeout(() => {
            vscode.postMessage({
                type: MessageType.GetVariable,
            });
        }, 1000);
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.GetVariable && file === e.data.file) {
                window.removeEventListener('message', listener);
                clearTimeout(initTimer);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}