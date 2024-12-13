import { KeyValueCheckRecord } from "../../../common/interfaces/variables";

export default async function getUrlEncode(urlData: KeyValueCheckRecord[]) {
    const urlEncodedData: URLSearchParams = new URLSearchParams();
    urlData.forEach((v) => {
        if (v.enabled && v.key.trim() !== "" && v.value.trim() !== "") {
            urlEncodedData.append(v.key, v.value);
        }
    });
    return urlEncodedData;
}