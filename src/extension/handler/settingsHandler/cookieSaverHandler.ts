import * as vscode from "vscode";
import findTosResponse from "../../utilities/fileUtility/findTosResponse";
import path from "path";
import * as fs from "fs/promises";
import { Cookie } from "../../../common/interfaces/apiRequests";

export default async function cookieSaverHandler({ document, data }: {
    document: vscode.TextDocument,
    data: Cookie[]
}) {
    let responseDir = await findTosResponse({ document });
    let responseFile = path.join(responseDir, `.cookie.json`);
    await fs.writeFile(responseDir, JSON.stringify(data));
}