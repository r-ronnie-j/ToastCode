import * as vscode from "vscode";

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
        } catch (error) {
            console.error('Error saving file:', error);
        }
    }
};

export { fileSaverHandler };
