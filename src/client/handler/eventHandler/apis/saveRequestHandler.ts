import MessageType from "../../../../common/constants/enums/MessageEnums";
import { ApiData } from "../../../../common/interfaces/apiRequests";
import vscode from "../../vscode";

export default async function saveRequestHandler(data: ApiData, index: number) {
    vscode.postMessage({
        type: MessageType.SaveRequest,
        data: {
            data, index
        }
    });
}