import MessageType from "../../../../common/constants/enums/MessageEnums";
import { ApiData, ApiResponse } from "../../../../common/interfaces/apiRequests";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default async function loadExampleHandler(data: string,file:string): Promise<{
    name: string, req: ApiData, res: ApiResponse
} | null> {
    return new Promise((resolve, _) => {
        vscode.postMessage({
            type: MessageType.LoadExample,
            data: data
        });
        let listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.LoadExample && e.data.file === file) {
                window.removeEventListener("message", listener);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}