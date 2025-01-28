import * as vscode from 'vscode';
import path from 'path';
import MessageType from '../../common/constants/enums/MessageEnums';

let initializeHandler = (
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    data: { nonce: string }
) => {
    let fontSize = vscode.workspace.getConfiguration().get("editor.fontSize");
    webviewPanel.webview.postMessage({
        type: MessageType.Initialize,
        file: document.uri.fsPath,
        data: {
            theme: vscode.window.activeColorTheme.kind,
            fontSize,
            isConfig: "config" === path.parse(document.uri.path).name,
            file: document.uri.fsPath,
        }
    });
};

export default initializeHandler;