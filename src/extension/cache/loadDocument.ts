import * as vscode from "vscode";
import VariableCache from "./variableCache";
import EnvironmentCache from "./environmentCache";
import FunctionCache from "./functionCache";
import { FunctionProps, TestFunction as TF } from "../../common/interfaces/variables";
import { ToastRendererProvider } from "../renderer/toastRenderer";
import { findConfigTos } from "../utilities/fileUtility/findConfig";

function TestFunction(fn: TF, props: FunctionProps) {
    FunctionCache.tests[props.name] = {
        example: props.example,
        description: props.description,
        params: props.params,
        fn: fn,
    };
}

function GeneratorFunction(fn: Function, props: FunctionProps) {
    FunctionCache.generators[fn.name] = {
        example: props.example,
        description: props.description,
        params: props.params,
        fn: fn,
    };
}

export function loadEnvs(text: string) { }


export default async function loadDocument(docs: vscode.TextDocument) {
    let configFile = await findConfigTos(docs.uri.fsPath);
    if (configFile) {
        let docs = await vscode.workspace.openTextDocument(configFile);
        let text = docs.getText();
        FunctionCache.extractFuns(text);
        try {
            let vars;
            let envs;
            let funs;
            eval(text.split(ToastRendererProvider.documentSeperator)[0]);
            if (Array.isArray(vars)) {
                VariableCache.initialize(vars);
            }
            if (Array.isArray(envs)) {
                EnvironmentCache.initialize(envs, docs.uri.path);
            }
        } catch (e) {
            console.log("Error encountered while loading document", e);
        }
    }
}