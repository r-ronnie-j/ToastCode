import * as vscode from "vscode";
import { ApiData, ApiResponse } from "../../../common/interfaces/apiRequests";
import MessageType from "../../../common/constants/enums/MessageEnums";
import { axiosPostHandler } from "../../engine/requestHandler/axiosHandler";
import { fetchHandler } from "../../engine/requestHandler/fetchHandler";
import { gotHandler } from "../../engine/requestHandler/gotHandler";
import path from "path";
import * as fs from "fs/promises";
import findTosResponse from "../../utilities/fileUtility/findTosResponse";
import { cookieJar } from "../../engine/client";

export default async function generateResponse({
    webviewPanel, document, data
}: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
    data: ApiData
}) {
    let response: ApiResponse | null = null;
    try {
        response = await fetchHandler(data, document.uri.fsPath);
    } catch (err) {
        try {
            response = await gotHandler(data, document.uri.fsPath);
        } catch (err) {
            try {
                response = await axiosPostHandler(data, document.uri.fsPath);
            } catch (err) {
                console.log(err);
            }
        }
    }


    webviewPanel.webview.postMessage({
        type: MessageType.GetResponse,
        data: response,
        file:document.uri.fsPath,
    });


    if (response !== null) {
        let responseDir = await findTosResponse({ document });
        let responseFile = path.join(responseDir, `${data.nonce}.json`);
        let cookieFile = path.join(responseDir, '.cookie.json');
        await fs.writeFile(responseFile, JSON.stringify(response, null, 2));
        let cookieData = await cookieJar.store.getAllCookies();
        await fs.writeFile(cookieFile, JSON.stringify(cookieData, null, 2));
    }
}
