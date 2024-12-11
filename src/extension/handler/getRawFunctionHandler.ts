import * as vscode from "vscode";
import MessageType from "../../common/constants/enums/MessageEnums";
import FunctionCache from "../cache/functionCache";

export default async function getRawFunctionHandler({ webviewPanel, document }: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument
}) {
    webviewPanel.webview.postMessage({
        type: MessageType.GetRawFunction,
        data: FunctionCache.functionText
    });
}