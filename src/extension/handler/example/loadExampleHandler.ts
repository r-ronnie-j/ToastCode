import path from "path";
import * as vscode from "vscode";
import * as fs from "fs/promises";
import readJsonFromFile from "../../utilities/fileUtility/readJsonFromFile";
import MessageType from "../../../common/constants/enums/MessageEnums";

export default async function loadExampleHandler({
    data, document, webPanel
}: {
    data: string,
    document: vscode.TextDocument,
    webPanel: vscode.WebviewPanel,
}) {
    let examplePath = path.resolve(document.uri.fsPath, data);
    if (((await fs.stat(examplePath)).isFile())) {
        let example = await readJsonFromFile(examplePath);
        webPanel.webview.postMessage({
            type: MessageType.LoadExample,
            data: example,
        });
        return;
    } else {
        webPanel.webview.postMessage({
            type: MessageType.LoadExample,
            data: null,
        });
        return;
    }
}