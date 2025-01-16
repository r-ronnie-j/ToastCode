import * as vscode from "vscode";
import findTosResponse from "../../utilities/fileUtility/findTosResponse";
import path from "path";
import fs from "fs/promises";
import readJsonFromFile from "../../utilities/fileUtility/readJsonFromFile";
import MessageType from "../../../common/constants/enums/MessageEnums";

export default async function cookieDataHandler({
    document, webPanel
}: {
    document: vscode.TextDocument,
    webPanel: vscode.WebviewPanel
}) {
    let responseDir = await findTosResponse({ document });
    let responseFile = path.join(responseDir, `.cookie.json`);
    try {
        if ((await fs.stat(responseFile)).isFile()) {
            let res = await readJsonFromFile(responseFile);
            webPanel.webview.postMessage({
                type: MessageType.CookiesData,
                data: res,
            });
            return;
        } else {
            webPanel.webview.postMessage({
                type: MessageType.CookiesData,
                data: [],
            });
            return;
        }
    } catch (err) {
        webPanel.webview.postMessage({
            type: MessageType.CookiesData,
            data: [],
        });
        return;
    }
}