import MessageType from "../../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default async function fileDeleteHandler(data: string,file:string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        vscode.postMessage({
            type: MessageType.FileDelete,
            data: data
        });
        let listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.FileDelete && e.data.file === file) {
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}