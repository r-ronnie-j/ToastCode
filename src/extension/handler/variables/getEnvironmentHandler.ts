import * as vscode from "vscode";
import MessageType from "../../../common/constants/enums/MessageEnums";
import EnvironmentCache from "../../cache/environmentCache";

export default async function getEnvironmentHandler({ webviewPanel }: {
    webviewPanel: vscode.WebviewPanel,
}) {
    webviewPanel.webview.postMessage({
        type: MessageType.GetEnvironment,
        data: {
            paths: EnvironmentCache.paths,
            envs: EnvironmentCache.vars,
        }
    });
}