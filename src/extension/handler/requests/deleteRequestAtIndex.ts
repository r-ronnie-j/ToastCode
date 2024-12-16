import * as vscode from "vscode";
import path from "path";
import * as fs from "fs/promises";
import { ToastRendererProvider } from "../../renderer/toastRenderer";
import MessageType from "../../../common/constants/enums/MessageEnums";
import { RequestCache } from "../../cache/requestCache";

export default async function deleteRequestAtIndex({
    document,
    webPanel,
    data
}: {
    document: vscode.TextDocument,
    webPanel: vscode.WebviewPanel,
    data: {
        index: number,
        examples: {
            name: string,
            path: string
        }[]
    }
}) {
    const rawDocument = RequestCache.apis;
    console.log("The delete index is ", data.index);
    if (data.index < rawDocument.length) {
        rawDocument.splice(data.index, 1);
    }
    await Promise.all(data.examples.map(async (a) => {
        await fs.unlink(path.resolve(document.uri.fsPath, a.path));
    }));
    const edit = new vscode.WorkspaceEdit();
    let text = rawDocument.join("\n\n" + ToastRendererProvider.documentSeperator + "\n\n");
    edit.replace(
        document.uri,
        new vscode.Range(0, 0, document.lineCount, 0),
        text
    );
    vscode.workspace.applyEdit(edit);
    webPanel.webview.postMessage({
        type: MessageType.DeleteRequestAtIndex,
        data: true
    });
}