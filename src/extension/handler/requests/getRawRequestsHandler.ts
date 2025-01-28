import * as vscode from "vscode";
import MessageType from "../../../common/constants/enums/MessageEnums";
import { RequestCache } from "../../cache/requestCache";

export default async function getRawRequestsHandler({
    webviewPanel,document
}: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
}) {
    webviewPanel.webview.postMessage({
        type: MessageType.GetRawRequests,
        data: RequestCache.apis,
        file:document.uri.fsPath,
    });
}