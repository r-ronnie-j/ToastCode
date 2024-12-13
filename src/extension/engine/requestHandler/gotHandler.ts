import { ApiData, ApiResponse } from "../../../common/interfaces/apiRequests";
import { gotClient } from "../client";
import { getMimeType } from "../utils/getMimeType";
import handleCookies from "../utils/handleCookies";
import handleHeaders from "../utils/handleHeaders";
import handleParams from "../utils/handleParams";
import handlePath from "../utils/handlePath";
import handleData from "./handleData";

export async function gotHandler(info: ApiData, path: string): Promise<ApiResponse> {
    let errorMessage = [] as string[];
    let warningMessage = [] as string[];
    let parsedUrl = info.url;
    try {
        let requestHeaders = handleHeaders(info.headers);
        parsedUrl = handlePath(info.url, info.path);
        parsedUrl = handleParams(parsedUrl, info.params);
        let mimeType = await getMimeType(parsedUrl);

        let startTime = Date.now();
        let body = await handleData(info, path);

        let gC = await gotClient;

        const response = await (body !== null ? gC(parsedUrl, {
            //@ts-ignore
            method: HttpMethod[info.method],
            headers: requestHeaders,
            body: body,
        }) : gC(parsedUrl, {
            //@ts-ignore
            method: HttpMethod[info.method],
            headers: requestHeaders,
        })
        );
        let endTime = Date.now();
        let diff = endTime - startTime;

        let data;
        let headers = response.headers;
        let contentType = headers["content-type"] ?? mimeType ?? "";
        let size: number = 0;

        try {
            if (contentType.includes("application/json")) {
                data = JSON.parse(response.body);
                const jsonString = JSON.stringify(data);
                size = Buffer.byteLength(jsonString);
            } else if (contentType.includes("text/")) {
                data = response.body;
                size = Buffer.byteLength(data);
            } else {
                data = response.body; // Response body for other types like blob or stream
                size = Buffer.byteLength(data);
            }
        } catch (parseError) {
            errorMessage.push("⚠️ Failed to parse the response.");
            data = null;
        }

        return {
            size: size,
            invoked: true,
            saved: false,
            error: false,
            timeTaken: diff,
            headers: headers,
            status: response.statusCode,
            statusText: response.statusMessage ?? "",
            data: data,
            mime: contentType,
            cookie: handleCookies(headers),
            parsedUrl: parsedUrl ?? info.url,
            errorMessage: errorMessage,
            warningMessage: warningMessage,
            name: "",
            tests: [],
            varUsed: {},
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
            parsedUrl: parsedUrl ?? "",
            errorMessage: errorMessage,
            warningMessage: warningMessage,
            name: "",
            tests: [],
            varUsed: {},
        };
    }
}