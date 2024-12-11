import * as vscode from "vscode";
import MessageType from "../../common/constants/enums/MessageEnums";
import VariableCache from "../cache/variableCache";

export default async function getVariableHandler({ webviewPanel, document }: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument
}) {
    webviewPanel.webview.postMessage({
        type: MessageType.GetVariable,
        data: VariableCache.vars
    });
}