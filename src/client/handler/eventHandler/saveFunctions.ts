import MessageType from "../../../common/constants/enums/MessageEnums";
import vscode from "../vscode";

export default function saveFunctions(data: string) {
    vscode.postMessage({
        type: MessageType.WriteFunction,
        data: data
    });
}