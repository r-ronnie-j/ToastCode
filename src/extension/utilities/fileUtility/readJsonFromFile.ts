import * as fs from "fs/promises";

export default async function readJsonFromFile(filePath: string) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error: any) {
        console.error(`Error reading JSON from file: ${error.message}`);
        return null;
    }
}