import * as vscode from "vscode";
import { EnvironmentInfo, VariableInfo } from "../../common/interfaces/variables";
import VariableCache from "../cache/variableCache";
import { inspect } from "util-ex";
import EnvironmentCache from "../cache/environmentCache";
import FunctionCache from "../cache/functionCache";
import getEnvironmentHandler from "./getEnvironmentHandler";
import { ToastRendererProvider } from "../renderer/toastRenderer";
import loadDocument from "../cache/loadDocument";

export default async function writeEnvironmentHandler({
    webviewPanel, document, data
}: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
    data: EnvironmentInfo[]
}) {
    let a = EnvironmentCache.initialize(data, document.uri.fsPath);
    let text = `vars = ${inspect(VariableCache.vars)}

envs = ${inspect(data)}

${ToastRendererProvider.documentSeperator}
funs = {${FunctionCache.extractFuns(document.getText()) ?? ""}}`;

    const edit = new vscode.WorkspaceEdit();
    edit.replace(
        document.uri,
        new vscode.Range(0, 0, document.lineCount, 0),
        text
    );
    vscode.workspace.applyEdit(edit);
    document.save();
    a.then((y) => {
        getEnvironmentHandler({ webviewPanel });
    });
}