import * as vscode from "vscode";
import path from "path";
import { configFile } from "../../cache/loadDocument";
import * as fs from "fs/promises";
import { findConfigTos } from "./findConfig";

export default async function findTosResponse({ document }: {
    document: vscode.TextDocument
}) {
    let cf = configFile;
    if (cf === null) {
        cf = await findConfigTos(document.uri.fsPath);
    }
    if (cf === null) {
        let filePath = document.uri.fsPath;
        let responseDirectory = path.join(path.parse(filePath).dir, "tos.response");
        try {
            if ((await fs.stat(responseDirectory)).isDirectory()) {
                return responseDirectory;
            } else {
                await fs.mkdir(responseDirectory);
                return responseDirectory;
            }
        } catch (err) {
            await fs.mkdir(responseDirectory);
            return responseDirectory;
        }

    } else {
        const responseFolderPath = path.join(path.dirname(cf), 'tos.response');
        try {
            if ((await fs.stat(responseFolderPath)).isDirectory()) {
                return responseFolderPath;
            } else {
                await fs.mkdir(responseFolderPath);
                return responseFolderPath;
            }
        } catch (err) {
            await fs.mkdir(responseFolderPath);
            return responseFolderPath;
        }
    }
}