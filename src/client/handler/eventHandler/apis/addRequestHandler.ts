import MessageType from "../../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default async function addRequestAtIndex(index: number,file:string): Promise<string> {
    return new Promise((resolve, reject) => {
        vscode.postMessage({
            type: MessageType.AddRequestAtIndex,
            data: index
        });

        let listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.AddRequestAtIndex && e.data.file === file) {
                window.removeEventListener('message', listener);
                resolve(e.data.data);
            }
        };

        window.addEventListener('message', listener);
    });
}