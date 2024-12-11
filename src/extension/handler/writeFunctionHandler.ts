import * as vscode from "vscode";
import VariableCache from "../cache/variableCache";
import { inspect } from "util-ex";
import EnvironmentCache from "../cache/environmentCache";
import { ToastRendererProvider } from "../renderer/toastRenderer";

export default async function writeFunctionHandler({
    webviewPanel, document, data
}: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
    data: string
}) {

    let text = `vars = ${inspect(VariableCache.vars)}

envs = ${inspect(EnvironmentCache.paths)}

${ToastRendererProvider.documentSeperator}
funs = {${data}}`;

    const edit = new vscode.WorkspaceEdit();
    edit.replace(
        document.uri,
        new vscode.Range(0, 0, document.lineCount, 0),
        text
    );
    vscode.workspace.applyEdit(edit);
    document.save();
}