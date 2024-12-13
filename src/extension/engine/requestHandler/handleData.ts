import { RequestDataType } from "../../../common/constants/enums/variableEnums";
import { ApiData } from "../../../common/interfaces/apiRequests";
import getBinaryData from "../utils/getBinaryData";
import getFormData from "../utils/getFormData";
import getUrlEncode from "../utils/getUrlEncoded";

export default async function handleData(req: ApiData, path: string): Promise<string | null | FormData | URLSearchParams> {
    switch (req.requestDataType) {
        case RequestDataType.rawJson: {
            return req.json ?? null;
        }
        case RequestDataType.rawJs: {
            return req.js ?? null;
        }
        case RequestDataType.rawHtml: {
            return req.html ?? null;
        }
        case RequestDataType.binary: {
            if (req.binary) {
                return await getBinaryData(req.binary) ?? null;
            } else {
                return null;
            }
        }
        case RequestDataType.formData: {
            return await getFormData(req.formData, path);
        }
        case RequestDataType.rawXml: {
            return req.xml ?? null;
        }
        case RequestDataType.urlEncoded: {
            return await getUrlEncode(req.urlEncoded);
        }
        case RequestDataType.none: {
            return null;
        }
        default: {
            return null;
        }
    }
}