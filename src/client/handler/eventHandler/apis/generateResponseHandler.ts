import MessageType from "../../../../common/constants/enums/MessageEnums";
import { ApiData, ApiResponse } from "../../../../common/interfaces/apiRequests";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default async function generateResponseHandler({ data ,file}: {
    data: ApiData,file:string
}): Promise<ApiResponse | null> {
    return new Promise((resolve) => {
        vscode.postMessage({
            type: MessageType.GetResponse,
            data
        });
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.GetResponse && e.data.file === file) {
                window.removeEventListener('message', listener);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}