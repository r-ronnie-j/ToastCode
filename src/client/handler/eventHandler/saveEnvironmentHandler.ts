import MessageType from "../../../common/constants/enums/MessageEnums";
import { EnvironmentInfo } from "../../../common/interfaces/variables";
import vscode from "../vscode";

export default function saveEnvironmentHandler(data: EnvironmentInfo[]) {
    vscode.postMessage({
        type: MessageType.WriteEnvironment,
        data: data
    });
}