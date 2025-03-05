import { RequestDataType } from "../../../common/constants/enums/variableEnums";
import { KeyValueCheckRecord } from "../../../common/interfaces/variables";

export default function handleHeaders(headers: KeyValueCheckRecord[],requestDataType : RequestDataType): Record<string, string> {
    const validHeaders: Record<string, string> = {};
    for (let x of headers) {
        if (x.enabled && x.key.trim() !== "" && x.value.trim() !== "") {
            validHeaders[x.key] = String(x.value);
        }
    }
    if (!validHeaders["Content-Type"]) {
        if (requestDataType === RequestDataType.rawJson) {
            validHeaders["Content-Type"] = "application/json";
        } else if (requestDataType === RequestDataType.urlEncoded) {
            validHeaders["Content-Type"] = "application/x-www-form-urlencoded";
        } else if (requestDataType === RequestDataType.formData) {
        } else if (requestDataType === RequestDataType.binary) {
            validHeaders["Content-Type"] = "application/octet-stream";
        } else if (requestDataType === RequestDataType.rawHtml) {
            validHeaders["Content-Type"] = "text/html";
        } else if (requestDataType === RequestDataType.rawXml) {
            validHeaders["Content-Type"] = "application/xml";
        } else if (requestDataType === RequestDataType.rawJs) {
            validHeaders["Content-Type"] = "application/javascript";
        } else if (requestDataType === RequestDataType.rawText) {
            validHeaders["Content-Type"] = "text/plain";
        }   
    }
    return validHeaders;
}