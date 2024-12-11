import MessageType from "../../../common/constants/enums/MessageEnums";
import { VariableInfo } from "../../../common/interfaces/variables";
import vscode from "../vscode";

export default function saveVariableHandler(data: VariableInfo[]) {
    console.log("Are we saving properly");
    vscode.postMessage({
        type: MessageType.WriteVariable,
        data: data
    });
}