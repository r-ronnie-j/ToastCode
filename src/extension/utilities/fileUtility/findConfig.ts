import path from "path";
import * as fs from "fs";

export async function findConfigTos(startPath: string, targetFile = 'config.tos') {
    let parsedPath = path.parse(startPath);
    if (parsedPath.name === "config") {
        return startPath;
    }
    let currentDir = parsedPath.dir;

    while (currentDir) {
        const potentialFilePath = path.join(currentDir, targetFile);

        if (fs.existsSync(potentialFilePath)) {
            return potentialFilePath;
        }

        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            break;
        }

        currentDir = parentDir;
    }

    return null;
}

export function isConfigFile(p:string){
    let parsedPath = path.parse(p);
    if(parsedPath.name === 'config'){
        return true;
    }else {
        return false;
    }
}