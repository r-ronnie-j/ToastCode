import * as vscode from 'vscode';
import path from 'path';
import MessageType from '../../common/constants/enums/MessageEnums';

let initializeHandler = (
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
) => {
    let fontSize = vscode.workspace.getConfiguration().get("editor.fontSize");
    console.log("what is here", {
        theme: vscode.window.activeColorTheme.kind,
        fontSize,
        isConfig: "config" === path.parse(document.uri.path).name,
    });
    webviewPanel.webview.postMessage({
        type: MessageType.Initialize,
        data: {
            theme: vscode.window.activeColorTheme.kind,
            fontSize,
            isConfig: "config" === path.parse(document.uri.path).name,
        }
    });
};

export default initializeHandler;