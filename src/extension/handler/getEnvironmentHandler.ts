import * as vscode from "vscode";
import MessageType from "../../common/constants/enums/MessageEnums";
import EnvironmentCache from "../cache/environmentCache";

export default async function getEnvironmentHandler({ webviewPanel, document }: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument
}) {
    webviewPanel.webview.postMessage({
        type: MessageType.GetEnvironment,
        data: EnvironmentCache.paths
    });
}