import * as vscode from "vscode";
import { VariableInfo } from "../../common/interfaces/variables";
import VariableCache from "../cache/variableCache";
import { inspect } from "util-ex";
import EnvironmentCache from "../cache/environmentCache";
import FunctionCache from "../cache/functionCache";

export default async function writeVariableHandler({
    webviewPanel, document, data
}: {
    webviewPanel: vscode.WebviewPanel,
    document: vscode.TextDocument,
    data: VariableInfo[]
}) {
    console.log("We ar writing variable");
    VariableCache.initialize(data);

    let text = `vars = ${inspect(data)}

envs = ${inspect(EnvironmentCache.paths)}

funs = [${FunctionCache.functionText}]`;
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