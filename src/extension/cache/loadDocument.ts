import * as vscode from "vscode";
import VariableCache from "./variableCache";
import EnvironmentCache from "./environmentCache";
import FunctionCache from "./functionCache";
import { FunctionProps, TestFunction as TF } from "../../common/interfaces/variables";
import { ToastRendererProvider } from "../renderer/toastRenderer";
import { findConfigTos, isConfigFile } from "../utilities/fileUtility/findConfig";
import { RequestCache } from "./requestCache";
import path from "path";
import * as fs from "fs";

let configFile: string | null = null;
export { configFile };

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

export default async function loadDocument(docs: vscode.TextDocument) {
    configFile = await findConfigTos(docs.uri.fsPath);
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
        const responseFolderPath = path.join(path.dirname(configFile), 'tos.response');
        if (!fs.existsSync(responseFolderPath)) {
            fs.mkdirSync(responseFolderPath);
        }
        const gitignorePath = path.join(path.dirname(configFile), '.gitignore');
        if (fs.existsSync(gitignorePath)) {
            let gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
            if (!gitignoreContent.includes('tos.response')) {
                fs.appendFileSync(gitignorePath, '\ntos.response\n');
            }
        } else {
            fs.writeFileSync(gitignorePath, 'tos.response\n');
        }
    }

    if (!isConfigFile(docs.uri.path)) {
        const text = docs.getText().trim();
        RequestCache.initialize(text.split(ToastRendererProvider.documentSeperator).map((x) => x.trim()));
    }
}