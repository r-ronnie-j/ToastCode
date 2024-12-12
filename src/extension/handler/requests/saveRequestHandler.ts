import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { ToastRendererProvider } from "../../renderer/toastRenderer";
import { ApiData } from "../../../common/interfaces/apiRequests";
import { RequestCache } from "../../cache/requestCache";

export default async function saveRequest(
    _: vscode.WebviewPanel,
    document: vscode.TextDocument,
    data: {
        data: ApiData,
        index: number,
    }
) {
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
    rawDocument[data.index] = data.data.rawCode + `\nnonce = '${data.data.nonce}'`;
    const edit = new vscode.WorkspaceEdit();
    let text = rawDocument.join("\n" + ToastRendererProvider.documentSeperator + "\n");
    edit.replace(
        document.uri,
        new vscode.Range(0, 0, document.lineCount, 0),
        text
    );
    return vscode.workspace.applyEdit(edit);
}   