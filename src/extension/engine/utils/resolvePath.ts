import * as path from "path";
import * as fs from "fs/promises";

export async function resolvePath(absolutePath: string, relativePath: string) {
    const isFile = path.extname(absolutePath) !== '';
    const basePath = isFile ? path.dirname(absolutePath) : absolutePath;
    let absPath = path.resolve(basePath, relativePath);
    try {
        let stats = await fs.lstat(absPath);
        return {
            path: absPath,
            exists: true,
            isFile: stats.isFile,
            size: stats.size
        };
    }
    catch (err) {
        return {
            path: "",
            exists: false,
            isFile: false,
            size: 0,
        };
    }

}