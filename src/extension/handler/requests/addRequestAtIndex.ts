import path from "path";
import * as vscode from "vscode";
import * as fs from "fs";
import { ToastRendererProvider } from "../../renderer/toastRenderer";
import MessageType from "../../../common/constants/enums/MessageEnums";
import { RequestCache } from "../../cache/requestCache";
import getNonce from "../../../common/utilities/getNonce";

export function getDefaultContent() {
    return (
        `nonce = '${getNonce()}'
name=''
method = HttpMethod.GET
url = ""
https = Https['HTTP/1.1']
headers = { '': '' }
params = { '': '' }
timeout = 30
timeoutType = TimeOutType.s
formData = { '': '' }
urlEncoded = { '': '' }
examples = []

`);
}

export default async function addRequestAtIndex({
    document,
    webPanel,
    data,
}: {
    document: vscode.TextDocument,
    webPanel: vscode.WebviewPanel,
    data: number,
}) {
    const documentPath = document.uri.fsPath;

    const dirPath = path.dirname(documentPath);
    const responseDir = path.join(dirPath, 'tos.response');

    if (!fs.existsSync(responseDir)) {
        fs.mkdirSync(responseDir, { recursive: true });
    }

    const baseName = path.basename(documentPath, path.extname(documentPath));
    const logDir = path.join(responseDir, baseName);

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    const rawDocument = RequestCache.apis;
    let newContent = getDefaultContent();
    rawDocument.splice(data, 0, newContent);
    const edit = new vscode.WorkspaceEdit();
    let text = rawDocument.join("\n\n" + ToastRendererProvider.documentSeperator + "\n\n");
    edit.replace(
        document.uri,
        new vscode.Range(0, 0, document.lineCount, 0),
        text
    );
    vscode.workspace.applyEdit(edit);
    webPanel.webview.postMessage({
        type: MessageType.AddRequestAtIndex,
        data: newContent
    });
}


