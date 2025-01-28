import * as vscode from "vscode";
import MessageType from "../../../common/constants/enums/MessageEnums";
import EnvironmentCache from "../../cache/environmentCache";

export default async function getEnvironmentHandler({document, webviewPanel }: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
}) {
    webviewPanel.webview.postMessage({
        type: MessageType.GetEnvironment,
        file:document.uri.fsPath,
        data: {
            paths: EnvironmentCache.paths,
            envs: EnvironmentCache.vars,
        }
    });
}