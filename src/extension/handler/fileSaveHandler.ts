import * as vscode from "vscode";
import MessageType from "../../common/constants/enums/MessageEnums";
import path from "path";

let fileSaverHandler = async ({ webview, document, content }: {
    webview: vscode.WebviewPanel,
    content: object,
    document: vscode.TextDocument,
}) => {
    const jsonString = JSON.stringify(content, null, 2);

    const saveFileUri = await vscode.window.showSaveDialog({
        filters: {
            'JSON Files': ['json'],
            'All Files': ['*.*']
        }
    });

    if (saveFileUri) {
        try {
            await vscode.workspace.fs.writeFile(saveFileUri, Buffer.from(jsonString, 'utf8'));
            webview.webview.postMessage({
                type: MessageType.FileSaver,
                data: path.relative(document.uri.fsPath, saveFileUri.fsPath)
            });
            return;
        } catch (error) {
            console.error('Error saving file:', error);
            webview.webview.postMessage({
                type: MessageType.FileSaver,
                data: null,
            });
        }
    } else {
        webview.webview.postMessage({
            type: MessageType.FileSaver,
            data: null,
        });
    }
};

export { fileSaverHandler };
