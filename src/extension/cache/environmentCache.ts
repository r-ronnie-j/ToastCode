import { EnvironmentInfo, VariableInfo } from "../../common/interfaces/variables";
import { resolvePath } from "../utilities/fileUtility/resolvePath";
import * as fs from "fs/promises";

export async function env(path: string, envPath: string) {
    let errorMessage: string[] = [];
    let absEnvPath = await resolvePath(path, envPath);

    if (absEnvPath.exists && absEnvPath.isFile) {
        try {
            const fileContent = await fs.readFile(absEnvPath.path, 'utf-8');
            const lines = fileContent.split('\n');
            const keyValueMap = new Map<string, string>();
            let lineNumber = 1;
            for (const line of lines) {
                const segments = line.split(';');
                for (const segment of segments) {
                    const [key, value] = segment.split('=')?.map((x) => x.trim());
                    if (key === "") { continue; }
                    if (value !== undefined) {
                        try {
                            let m;
                            eval(`m = ${value.trim()}`);
                            keyValueMap.set(key.trim(), m as any);

                        } catch (err) {

                        }
                    } else {
                        errorMessage.push(`Error: Unable to retrieve the value for the key "${key}".
                            At line number: ${lineNumber}.
                            Please check the environment file located at "${envPath}" for any issues with this key.`);
                    }
                }
                lineNumber++;
            }
            return {
                error: false,
                errorMessage: errorMessage,
                data: keyValueMap,
            };
        } catch (err: any) {
            console.error("Caught error:", err);
            errorMessage.push(err.toString());
            return {
                error: true,
                errorMessage: errorMessage,
                data: null,
            };
        }
    } else {
        return {
            error: true,
            errorMessage: [`${absEnvPath.path} does not exist`],
            data: null,
        };
    }
}

const EnvironmentCache = {
    vars: {} as Record<string, any>,
    paths: [] as EnvironmentInfo[],


    initialize(a: EnvironmentInfo[], path: string) {
        this.paths = a;
        a.map(async (l) => {
            if (l.enabled) {
                let a = await env(l.path, path);
                if (a.data) {
                    this.vars = {
                        ...this.vars,
                        ...a.data,
                    };
                }
            }
        });
    },
};

export default EnvironmentCache;