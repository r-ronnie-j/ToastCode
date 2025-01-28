import * as vscode from "vscode";
import findTosResponse from "../../utilities/fileUtility/findTosResponse";
import path from "path";
import * as fs from "fs/promises";
import MessageType from "../../../common/constants/enums/MessageEnums";
import readJsonFromFile from "../../utilities/fileUtility/readJsonFromFile";

export default async function getResponseFromNonceHandler({
    document, webPanel, data
}: {
    document: vscode.TextDocument,
    webPanel: vscode.WebviewPanel,
    data: string
}) {
    let responseDir = await findTosResponse({ document });
    let responseFile = path.join(responseDir, `${data}.json`);
    try {
        if ((await fs.stat(responseFile)).isFile()) {
            let res = await readJsonFromFile(responseFile);
            webPanel.webview.postMessage({
                type: MessageType.GetResponseFromNonce,
                data: {
                    nonce: data,
                    res
                },
                file:document.uri.fsPath
            });
            return;
        } else {
            webPanel.webview.postMessage({
                type: MessageType.GetResponseFromNonce,
                data: {
                    nonce: data,
                    res: null,
                },
                file:document.uri.fsPath,
            });
            return;
        }
    } catch (err) {
        webPanel.webview.postMessage({
            type: MessageType.GetResponseFromNonce,
            data: {
                nonce: data,
                res: null
            },
            file:document.uri.fsPath,
        });
        return;
    }
}