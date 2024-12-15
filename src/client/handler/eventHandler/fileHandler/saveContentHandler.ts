import MessageType from "../../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default async function saveContentHandler(data: Object): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
        vscode.postMessage({
            type: MessageType.FileSaver,
            data,
        });
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.FileSaver) {
                window.removeEventListener('message', listener);
                resolve(e.data.data);
            }
        };

        window.addEventListener('message', listener);
    });
}