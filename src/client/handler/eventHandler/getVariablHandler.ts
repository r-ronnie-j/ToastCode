import MessageType from "../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../common/interfaces/messages";
import { VariableInfo } from "../../../common/interfaces/variables";
import vscode from "../vscode";

export default function getVariableHandler(): Promise<VariableInfo[]> {
    return new Promise((resolve) => {
        console.log("At extension");
        let initTimer = setTimeout(() => {
            vscode.postMessage({
                type: MessageType.GetVariable,
            });
        }, 1000);
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.GetVariable) {
                window.removeEventListener('message', listener);
                clearTimeout(initTimer);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}