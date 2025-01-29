import { HttpMethod } from "../../../common/constants/enums/methodsEnums";
import { ApiData, ApiResponse } from "../../../common/interfaces/apiRequests";
import { fetchClient } from "../client";
import { getMimeType } from "../utils/getMimeType";
import handleCookies from "../utils/handleCookies";
import handleHeaders from "../utils/handleHeaders";
import handleParams from "../utils/handleParams";
import handlePath from "../utils/handlePath";
import handleData from "./handleData";

export async function fetchHandler(info: ApiData, path: string): Promise<ApiResponse> {
    let errorMessage = [] as string[];
    let warningMessage = [] as string[];
    try {
        let requestHeaders = handleHeaders(info.headers);
        let parsedUrl = handlePath(info.url, info.path);
        parsedUrl = handleParams(parsedUrl, info.params);
        let mimeType = await getMimeType(parsedUrl);

        let startTime = Date.now();
        let body = await handleData(info, path);

        let fC = await fetchClient;

        const response = await (body !== null ? fC(parsedUrl, {
            method: HttpMethod[info.method],
            headers: requestHeaders,
            body: body,
        }) : fC(parsedUrl, {
            method: HttpMethod[info.method],
            headers: requestHeaders,
        })
        );
        let endTime = Date.now();
        let diff = endTime - startTime;

        let data;
        let headers: any = {};
        response.headers.forEach((v, k) => {
            headers[k] = v;
        });
        let contentType = headers["content-type"] ?? mimeType ?? "";
        let size: number = 0;
        let text = await response.text();
        data = text;
        try {
            if (contentType.includes("application/json")) {
                data = await JSON.parse(text);
                const jsonString = JSON.stringify(data);
                size = new Blob([jsonString]).size;
            } else if (contentType.includes("text/")) {
                size = new Blob([text]).size;

            } else {
                size = new Blob([text]).size;

            }
        } catch (parseError) {
            console.log("The error is", parseError);
            errorMessage.push("⚠️ Failed to parse the response.");
            data = text;
        }
        return {
            size: size,
            error: false,
            invoked: true,
            saved: false,
            timeTaken: diff,
            headers: headers,
            status: response.status,
            statusText: response.statusText,
            data: data,
            mime: contentType,
            cookie: handleCookies(headers),
            parsedUrl: parsedUrl ?? "",
            errorMessage: errorMessage,
            warningMessage: warningMessage,
            name: "",
            tests: [],
            varUsed: {}
        };
    } catch (err) {
        let errorDetails = `❌ Error occurred during the request: ${err instanceof Error ? err.message : String(err)}.\n`;

        if (err instanceof TypeError) {
            errorDetails += "⚠️ Network error or the request was aborted.\n";
        } else {
            errorDetails += `⚙️ Unexpected error: ${String(err)}.\n`;
        }

        errorMessage.push(errorDetails);


        return {
            error: true,
            invoked: true,
            saved: false,
            size: 0,
            timeTaken: 0,
            headers: {},
            status: 500,
            statusText: "Fetch Error",
            data: null,
            mime: "",
            cookie: [],
            parsedUrl: info.url ?? "",
            errorMessage: errorMessage,
            warningMessage: warningMessage,
            name: "",
            tests: [],
            varUsed: {}
        };
    }
}