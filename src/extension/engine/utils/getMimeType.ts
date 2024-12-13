import { axiosClient, fetchClient } from "../client";

export async function getMimeType(url:string): Promise<string> {
    try {
        const response = await axiosClient.head(url);
        return response.headers['content-type'] ?? "";
    } catch (err) {
        try {
            let fC = await fetchClient;
            const response = await fC(url, {
                method: "HEAD",
            });
            return response.headers.get("Content-Type") ?? "";
        } catch (_) {
            return "";
        }
    }
}