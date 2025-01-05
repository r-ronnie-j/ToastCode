import * as vscode from 'vscode';
import * as path from "path";
import { MessageData } from '../../common/interfaces/messages';
import MessageType from '../../common/constants/enums/MessageEnums';
import initializeHandler from '../handler/initializeHandler';
import filePickerHandler from '../handler/fileHandler/filePickerHandler';
import writeEnvironmentHandler from '../handler/variables/writeEnvironmentHandler';
import loadDocument from '../cache/loadDocument';
import writeVariableHandler from '../handler/variables/writeVariableHandler';
import writeFunctionHandler from '../handler/variables/writeFunctionHandler';
import getVariableHandler from '../handler/variables/getVariableHandler';
import getEnvironmentHandler from '../handler/variables/getEnvironmentHandler';
import getFunctionHandler from '../handler/variables/getFunctionHandler';
import getRawFunctionHandler from '../handler/variables/getRawFunctionHandler';
import getRawRequestsHandler from '../handler/requests/getRawRequestsHandler';
import saveRequest from '../handler/requests/saveRequestHandler';
import generateResponse from '../handler/requests/generateResponse';
import getResponseFromNonceHandler from '../handler/requests/getResponseFromNonce';
import { fileSaverHandler } from '../handler/fileHandler/fileSaveHandler';
import loadExampleHandler from '../handler/example/loadExampleHandler';
import fileDeleteHandler from '../handler/fileHandler/fileDeleteHandler';
import addRequestAtIndex from '../handler/requests/addRequestAtIndex';
import deleteRequestAtIndex from '../handler/requests/deleteRequestAtIndex';
import { cookieJar } from '../engine/client';
import findTosResponse from '../utilities/fileUtility/findTosResponse';
import readJsonFromFile from '../utilities/fileUtility/readJsonFromFile';
import cookieDataHandler from '../handler/settingsHandler/cookiesDataHandler';


export class ToastRendererProvider implements vscode.CustomTextEditorProvider {

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new ToastRendererProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(ToastRendererProvider.viewType, provider, {
            webviewOptions: {
                retainContextWhenHidden: true
            }
        });
        return providerRegistration;
    }

    private static readonly viewType = 'toast.toastRenderer';

    static readonly documentSeperator = "//*-----|****|-----*//";


    constructor(
        private readonly context: vscode.ExtensionContext
    ) {

    }

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        webviewPanel.webview.options = {
            enableScripts: true,
        };

        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
        vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration("workbench.colorTheme") || event.affectsConfiguration("editor.fontSize")) {
                initializeHandler(document, webviewPanel);
            }
        });

        findTosResponse({ document }).then(async (x) => {
            let cookieFile = path.join(x, ".cookie.json");
            let cookieData = await readJsonFromFile(cookieFile);
            try {
                if (Array.isArray(cookieData)) {
                    cookieData.map(async (c) => await cookieJar.store.putCookie(c));
                }
            } catch (err) {
                console.log("There was some error while uploading cookies");
            }
        });

        webviewPanel.webview.onDidReceiveMessage((e: MessageData) => {
            switch (e.type) {
                case MessageType.Initialize:
                    initializeHandler(document, webviewPanel);
                    return;
                case MessageType.FilePicker:
                    filePickerHandler({ webview: webviewPanel, document });
                    return;
                case MessageType.WriteVariable:
                    writeVariableHandler({ data: e.data, document, webviewPanel });
                    return;
                case MessageType.WriteEnvironment:
                    writeEnvironmentHandler({ data: e.data, document, webviewPanel });
                    return;
                case MessageType.WriteFunction:
                    writeFunctionHandler({ data: e.data, document, webviewPanel });
                    return;
                case MessageType.GetVariable:
                    getVariableHandler({ webviewPanel, document });
                    return;
                case MessageType.GetEnvironment:
                    getEnvironmentHandler({ webviewPanel });
                    return;
                case MessageType.GetFunction:
                    getFunctionHandler({ webviewPanel, document });
                    return;
                case MessageType.GetRawFunction:
                    getRawFunctionHandler({ webviewPanel, document });
                    return;
                case MessageType.GetRawRequests:
                    getRawRequestsHandler({ webviewPanel });
                    return;
                case MessageType.SaveRequest:
                    saveRequest(webviewPanel, document, e.data);
                    return;
                case MessageType.GetResponse:
                    generateResponse({
                        webviewPanel,
                        document,
                        data: e.data,
                    });
                    return;
                case MessageType.GetResponseFromNonce:
                    getResponseFromNonceHandler({
                        document,
                        webPanel: webviewPanel,
                        data: e.data,
                    });
                    return;
                case MessageType.FileSaver:
                    fileSaverHandler({
                        webview: webviewPanel,
                        content: e.data,
                        document: document
                    });
                    return;
                case MessageType.FileDelete:
                    fileDeleteHandler({
                        webpanel: webviewPanel,
                        document,
                        data: e.data,
                    });
                    return;
                case MessageType.LoadExample:
                    loadExampleHandler({
                        data: e.data,
                        document,
                        webPanel: webviewPanel
                    });
                    return;
                case MessageType.AddRequestAtIndex:
                    addRequestAtIndex({
                        data: e.data,
                        document,
                        webPanel: webviewPanel
                    });
                    return;
                case MessageType.DeleteRequestAtIndex:
                    deleteRequestAtIndex({
                        data: e.data,
                        document,
                        webPanel: webviewPanel
                    });
                    return;
                case MessageType.CookiesData:
                    cookieDataHandler({
                        document: document,
                        webPanel: webviewPanel
                    });
            }
        });

        loadDocument(document);

    }

    dispose() {

    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(this.context.extensionPath, 'dist', 'client', 'index.js'))
        );
        return /*html*/ `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
            <div id="root"></div>
              <script src="${scriptUri}"></script>
            </body>
          </html>
        `;
    }
}



