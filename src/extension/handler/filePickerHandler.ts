import path from "path";
import * as vscode from "vscode";
import MessageType from "../../common/constants/enums/MessageEnums";

let filePickerHandler = async ({ webview, document }: {
    webview: vscode.WebviewPanel,
    document: vscode.TextDocument,
}) => {
    let data = await vscode.window.showOpenDialog({
        canSelectMany: false,
    });
    const absolutePath = data && data[0].path;
    const basePath = document.uri.path;
    const relativePath = absolutePath ? path.relative(basePath, absolutePath) : null;
    webview.webview.postMessage({
        type: MessageType.FilePicker,
        data: relativePath
    });
};

export default filePickerHandler;