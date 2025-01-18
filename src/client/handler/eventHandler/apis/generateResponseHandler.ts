import MessageType from "../../../../common/constants/enums/MessageEnums";
import { ApiData, ApiResponse } from "../../../../common/interfaces/apiRequests";
import { MessageData } from "../../../../common/interfaces/messages";
import vscode from "../../vscode";

export default async function generateResponseHandler({ data }: {
    data: ApiData
}): Promise<ApiResponse | null> {
    return new Promise((resolve) => {
        console.log("We are here 2");
        vscode.postMessage({
            type: MessageType.GetResponse,
            data
        });
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.GetResponse) {
                window.removeEventListener('message', listener);
                console.log("The data we accumulated is", e.data);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}