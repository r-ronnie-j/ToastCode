import MessageType from "../../../common/constants/enums/MessageEnums";
import { VariableInfo } from "../../../common/interfaces/variables";
import vscode from "../vscode";

export default function saveVariableHandler(data: VariableInfo[]) {
    vscode.postMessage({
        type: MessageType.WriteVariable,
        data: data
    });
}