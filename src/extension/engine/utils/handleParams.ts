import { KeyValueCheckRecord } from "../../../common/interfaces/variables";

export default function handleParams(url: string, params: KeyValueCheckRecord[]): string {
    const parsedUrl = new URL(url);
    params.forEach((v) => {
        if (v.enabled && v.key.trim() !== "" && v.value.trim() !== "") {
            parsedUrl.searchParams.append(v.key, v.value);
        }
    });

    return parsedUrl.toString();
}