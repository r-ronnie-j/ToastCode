import { ResponseType } from "../../../common/constants/enums/methodsEnums";

export function getResponseTypePriority(mime: string): [ResponseType, ...ResponseType[]] {
    const prioritySet = new Set<ResponseType>();

    if (mime.includes("application/json")) {
        prioritySet.add(ResponseType.json);
    } else if (mime.includes("text/")) {
        prioritySet.add(ResponseType.text);
    } else if (mime.includes("application/octet-stream") || mime.includes("audio/") || mime.includes("video/")) {
        prioritySet.add(ResponseType.blob);
    } else if (mime.includes("application/pdf") || mime.includes("application/xml")) {
        prioritySet.add(ResponseType.document);
    } else if (mime.includes("multipart/form-data")) {
        prioritySet.add(ResponseType.formdata);
    } else if (mime.includes("application/stream")) {
        prioritySet.add(ResponseType.stream);
    } else if (mime.includes("application/x-www-form-urlencoded")) {
        prioritySet.add(ResponseType.formdata);
    } else {
        prioritySet.add(ResponseType.arrayBuffer);
    }

    const allResponseTypes = [
        ResponseType.json,
        ResponseType.text,
        ResponseType.blob,
        ResponseType.arrayBuffer,
        ResponseType.formdata,
        ResponseType.document,
        ResponseType.stream,
    ];

    allResponseTypes.forEach(type => prioritySet.add(type));

    // Return the prioritized list as an array
    return Array.from(prioritySet) as [ResponseType, ...ResponseType[]];
}