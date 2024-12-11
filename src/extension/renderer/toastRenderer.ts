import * as vscode from 'vscode';
import * as path from "path";
import { MessageData } from '../../common/interfaces/messages';
import MessageType from '../../common/constants/enums/MessageEnums';
import initializeHandler from '../handler/initializeHandler';
import filePickerHandler from '../handler/filePickerHandler';


export class ToastRendererProvider implements vscode.CustomTextEditorProvider {

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new ToastRendererProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(ToastRendererProvider.viewType, provider);
        return providerRegistration;
    }

    private static readonly viewType = 'toast.toastRenderer';

    static readonly documentSeperator = "//*-----|****|-----*//";


    constructor(
        private readonly context: vscode.ExtensionContext
    ) { }

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
            }
        });

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
              <title>React Webview</title>
            </head>
            <body>
              <script src="${scriptUri}"></script>
            </body>
          </html>
        `;
    }
}



