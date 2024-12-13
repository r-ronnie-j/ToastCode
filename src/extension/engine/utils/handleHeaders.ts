import { KeyValueCheckRecord } from "../../../common/interfaces/variables";

export default function handleHeaders(headers: KeyValueCheckRecord[]): Record<string, string> {
    const validHeaders: Record<string, string> = {};
    for (let x of headers) {
        if (x.enabled && x.key.trim() !== "" && x.value.trim() !== "") {
            validHeaders[x.key] = String(x.value);
        }
    }
    return validHeaders;
}