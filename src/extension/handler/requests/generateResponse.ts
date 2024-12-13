import * as vscode from "vscode";
import { ApiData, ApiResponse } from "../../../common/interfaces/apiRequests";
import * as fs from "fs";
import MessageType from "../../../common/constants/enums/MessageEnums";
import { axiosPostHandler } from "../../engine/requestHandler/axiosHandler";
import { fetchHandler } from "../../engine/requestHandler/fetchHandler";
import { gotHandler } from "../../engine/requestHandler/gotHandler";

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
                console.error(err);
            }
        }
    }

    webviewPanel.webview.postMessage({
        type: MessageType.GetResponse,
        data: response,
    });
}
