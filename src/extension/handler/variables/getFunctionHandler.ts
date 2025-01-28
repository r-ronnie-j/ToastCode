import * as vscode from "vscode";
import MessageType from "../../../common/constants/enums/MessageEnums";
import FunctionCache from "../../cache/functionCache";

export default async function getFunctionHandler({ webviewPanel, document }: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument
}) {
    webviewPanel.webview.postMessage({
        type: MessageType.GetEnvironment,
        file:document.uri.fsPath,
        data: {
            tests: Object.entries(FunctionCache.tests).map((a) => {
                return {
                    name: a[0],
                    description: a[1].description,
                    example: a[1].example,
                    params: a[1].params
                };
            }),
            generators: Object.entries(FunctionCache.generators).map((d) => {
                return {
                    name: d[0],
                    description: d[1].description,
                    example: d[1].example,
                    params: d[1].params
                };
            })
        }
    });
}