import { AxiosError, ResponseType } from "axios";
import handleHeaders from "../utils/handleHeaders";
import handleParams from "../utils/handleParams";
import handlePath from "../utils/handlePath";
import { getMimeType } from "../utils/getMimeType";
import { getResponseTypePriority } from "../utils/getResponsePriority";
import handleCookies from "../utils/handleCookies";
import handleAxiosData from "./handleData";
import { ApiData, ApiResponse } from "../../../common/interfaces/apiRequests";
import { HttpMethod } from "../../../common/constants/enums/methodsEnums";
import { axiosClient } from "../client";

export async function axiosPostHandler(info: ApiData, path: string): Promise<ApiResponse> {
    let errorMessage = [] as string[];
    let warningMessage = [] as string[];

    try {
        let requestHeaders = handleHeaders(info.headers,info.requestDataType);
        let parsedUrl = handlePath(info.url, info.path);
        parsedUrl = handleParams(parsedUrl, info.params);
        let mimeType = await getMimeType(parsedUrl);
        let responsePriority = getResponseTypePriority(mimeType);

        for (let responseT of responsePriority) {
            let startTime = Date.now();

            let res = await axiosClient({
                url: parsedUrl,
                method: HttpMethod[info.method],
                headers: requestHeaders,
                data: await handleAxiosData(info, path),
                responseType: responseT as ResponseType
            });

            let endTime = Date.now();
            let diff = endTime - startTime;
            let data = res.data;
            return {
                invoked: true,
                saved: false,
                size: new Blob([data]).size,
                error: false,
                timeTaken: diff,
                headers: res.headers,
                status: res.status,
                statusText: res.statusText,
                data: data,
                mime: res.headers["content-type"]?.toString() ?? "",
                cookie: handleCookies(res.headers),
                parsedUrl: res.config.url ?? "",
                errorMessage: [],
                warningMessage: warningMessage,
                name: "",
                tests: [],
                varUsed: {}
            };
        }
    } catch (err) {
        if (err instanceof AxiosError) {

            let errorDetails = `❌ Error occurred during the request: ${err.message}.\n`;

            if (err.response) {
                errorDetails += `⚠️ Status: ${err.response.status} - ${err.response.statusText}.\n`;
                errorDetails += `📝 Response Headers: ${JSON.stringify(err.response.headers)}.\n`;
                errorDetails += `📦 Response Data: ${JSON.stringify(err.response.data)}.\n`;
            } else if (err.request) {
                errorDetails += "🚫 No response received from the server.\n";
                errorDetails += "There is a possibility that server is offline";
            } else {
                errorDetails += `⚙️ Request setup failed: ${err.message}.\n`;
            }

            errorMessage.push(errorDetails);
            let data = err.response?.data;

            return {
                error: true,
                invoked: true,
                saved: false,
                timeTaken: 0,
                headers: err.response?.headers ?? {},
                status: err.response?.status ?? 500,
                statusText: err.response?.statusText ?? "Request Error",
                data: data,
                size: new Blob(data).size,
                mime: err.response?.headers?.["content-type"]?.toString() ?? "",
                cookie: handleCookies(err.response?.headers ?? {}),
                parsedUrl: info.url,
                name: "",
                tests: [],
                varUsed: {},
                errorMessage: errorMessage,
                warningMessage: warningMessage,
            };
        } else {
            errorMessage.push("An unexpected error occurred.");
            errorMessage.push(`Error details: ${err instanceof Error ? err.message : String(err)}`);

            return {
                error: true,
                invoked: true,
                saved: false,
                timeTaken: 0,
                headers: {},
                size: 0,
                status: 500,
                statusText: "Unknown Error",
                data: null,
                mime: "",
                cookie: [],
                parsedUrl: info.url,
                errorMessage: errorMessage,
                warningMessage: warningMessage,
                name: "",
                tests: [],
                varUsed: {}
            };
        }
    }
    errorMessage.push("An unexpected error occurred.");
    return {
        error: true,
        invoked: true,
        saved: false,
        timeTaken: 0,
        size: 0,
        headers: {},
        status: 500,
        statusText: "Unknown Error",
        data: null,
        mime: "",
        cookie: [],
        parsedUrl: info.url,
        errorMessage: errorMessage,
        warningMessage: warningMessage,
        name: "",
        tests: [],
        varUsed: {}
    };
}