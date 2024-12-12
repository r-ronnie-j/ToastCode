import * as vscode from "vscode";
import { VariableInfo } from "../../common/interfaces/variables";
import VariableCache from "../cache/variableCache";
import { inspect } from "util-ex";
import EnvironmentCache from "../cache/environmentCache";
import FunctionCache from "../cache/functionCache";
import { ToastRendererProvider } from "../renderer/toastRenderer";
import loadDocument from "../cache/loadDocument";
import { isConfigFile } from "../utilities/fileUtility/findConfig";

export default async function writeVariableHandler({
    webviewPanel, document, data
}: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
    data: VariableInfo[]
}) {
    if (isConfigFile(document.uri.path)) {
        VariableCache.initialize(data);

        let text = `vars = ${inspect(data)}

envs = ${inspect(EnvironmentCache.paths)}

${ToastRendererProvider.documentSeperator}
funs = { ${FunctionCache.extractFuns(document.getText()) ?? ""} }`;

        try {
            const edit = new vscode.WorkspaceEdit();
            edit.replace(
                document.uri,
                new vscode.Range(0, 0, document.lineCount, 0),
                text
            );
            vscode.workspace.applyEdit(edit);
            document.save();
        } catch (err) {
            console.log("There was an error here", err);
        }
    }
}