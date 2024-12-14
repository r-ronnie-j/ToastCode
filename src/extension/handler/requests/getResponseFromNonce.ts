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
    console.log("what data doe we get", data);
    let responseDir = await findTosResponse({ document });
    let responseFile = path.join(responseDir, `${data}.json`);
    if ((await fs.stat(responseFile)).isFile()) {
        let res = await readJsonFromFile(responseFile);
        console.log("we got response", res);
        webPanel.webview.postMessage({
            type: MessageType.GetResponseFromNonce,
            data: res,
        });
        return;
    } else {
        console.log("Aew we here", responseFile);
        webPanel.webview.postMessage({
            type: MessageType.GetResponseFromNonce,
            data: null,
        });
        return;
    }
}