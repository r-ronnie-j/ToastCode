import MessageType from "../../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default async function deleteRequestAtIndex(data: {
    index: number,
    examples: {
        name: string,
        path: string
    }[]
}) {
    return new Promise((resolve, reject) => {
        vscode.postMessage({
            type: MessageType.DeleteRequestAtIndex,
            data: data
        });

        let listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.DeleteRequestAtIndex) {
                window.removeEventListener('message', listener);
                console.log("Data reqceived at the delete request", e.data.data);
                resolve(e.data.data);
            }
        };

        window.addEventListener('message', listener);
    });

}