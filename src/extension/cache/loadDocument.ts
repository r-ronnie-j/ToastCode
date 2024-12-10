import * as vscode from "vscode";
import VariableCache from "./variableCache";
import EnvironmentCache from "./environmentCache";

export default function loadDocument(docs: vscode.TextDocument) {
    let text = docs.getText();
    try {
        let vars;
        let envs;
        let testFunctions;
        let generatorFunctions;
        eval(text);
        if (Array.isArray(vars)) {
            VariableCache.initialize(vars);
        }
        if (Array.isArray(envs)) {
            EnvironmentCache.initialize(envs, docs.uri.path);
        }
        if (Array.isArray(generatorFunctions)) {

        }
        if (Array.isArray(testFunctions)) {
            
        }
    } catch (e) {
        console.log("Error encountered while loading document", e);
    }
}