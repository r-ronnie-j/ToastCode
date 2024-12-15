import MessageType from "../../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default async function fileDeleteHandler(data: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        vscode.postMessage({
            type: MessageType.FileDelete,
            data: data
        });
        let listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.FileDelete) {
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}