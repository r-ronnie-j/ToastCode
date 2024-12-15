import * as vscode from "vscode";
import { ApiData, ApiResponse } from "../../../common/interfaces/apiRequests";
import MessageType from "../../../common/constants/enums/MessageEnums";
import { axiosPostHandler } from "../../engine/requestHandler/axiosHandler";
import { fetchHandler } from "../../engine/requestHandler/fetchHandler";
import { gotHandler } from "../../engine/requestHandler/gotHandler";
import { fileSaverHandler } from "../fileHandler/fileSaveHandler";
import { configFile } from "../../cache/loadDocument";
import path from "path";
import * as fs from "fs/promises";
import findTosResponse from "../../utilities/fileUtility/findTosResponse";

export default async function generateResponse({
    webviewPanel, document, data
}: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
    data: ApiData
}) {

    let response: ApiResponse | null = null;
    try {
        response = await axiosPostHandler(data, document.uri.fsPath);
    } catch (err) {
        try {
            response = await fetchHandler(data, document.uri.fsPath);
        } catch (err) {
            try {
                response = await gotHandler(data, document.uri.fsPath);
            } catch (err) {
                console.log(err);
            }
        }
    }

    // if (response !== null) {
    //     fileSaverHandler({
    //         webview: webviewPanel,
    //         content: response,
    //         document
    //     });
    // }

    webviewPanel.webview.postMessage({
        type: MessageType.GetResponse,
        data: response,
    });


    if (response !== null) {
        let responseDir = await findTosResponse({ document });
        let responseFile = path.join(responseDir, `${data.nonce}.json`);
        await fs.writeFile(responseFile, JSON.stringify(response, null, 2));
    }
}
