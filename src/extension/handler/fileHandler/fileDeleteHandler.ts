import * as vscode from "vscode";
import path from "path";
import * as fs from "fs/promises";
import MessageType from "../../../common/constants/enums/MessageEnums";

export default async function fileDeleteHandler({
    webpanel, document, data
}: {
    webpanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
    data: string
}) {
    try {
        let examplePath = path.resolve(document.uri.fsPath, data);
        if ((await fs.stat(examplePath)).isFile()) {
            await fs.unlink(examplePath);
            webpanel.webview.postMessage({
                type: MessageType.FileDelete,
                data: true,
                file : document.uri.fsPath
            });
            return;
        } else {
            webpanel.webview.postMessage({
                type: MessageType.FileDelete,
                data: true,
                file : document.uri.fsPath
            });
            return;
        }
    } catch (err) {
        webpanel.webview.postMessage({
            type: MessageType.FileDelete,
            data: false,
            file:document.uri.fsPath
        });
    }
}