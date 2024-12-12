import { HttpMethod, Https } from "../constants/enums/methodsEnums";
import { RequestDataType, TimeOutType } from "../constants/enums/variableEnums";
import { FormDataType, KeyValueCheckRecord } from "./variables";

export interface Cookie {
    key: string;
    value: string;
    expires: Date | 'Infinity' | null;
    maxAge: number | 'Infinity' | '-Infinity' | null;
    domain: string | null;
    path: string | null;
    secure: boolean;
    httpOnly: boolean;
    extensions: string[] | null;
    creation: Date | 'Infinity' | null;
    creationIndex: number;
    hostOnly: boolean | null;
    pathIsDefault: boolean | null;
    lastAccessed: Date | 'Infinity' | null;
    sameSite: string | undefined;
}

export interface ApiData {
    nonce: string,
    rawCode: string,
    url: string,
    name: string;
    method: HttpMethod
    https: Https
    params: KeyValueCheckRecord[],
    headers: KeyValueCheckRecord[],
    path: Record<string, string>,
    requestCookies: Cookie[],
    timeout: number,
    timeoutType: TimeOutType,
    requestDataType: RequestDataType,
    tests: {
        name: string,
        function: string
    }
    json: string | undefined,
    xml: string | undefined,
    js: string | undefined,
    html: string | undefined,
    text: string | undefined,
    formData: FormDataType[],
    urlEncoded: KeyValueCheckRecord[],
    binary: string | undefined,
}

export interface ApiResponse {
    invoked: boolean,
    name: string;
    saved: boolean,
    error: boolean;
    mime: string;
    parsedUrl: string;
    timeTaken: number;
    data: any;
    status: number;
    statusText: string;
    headers: Object;
    size: number;
    cookie: Cookie[];
    errorMessage: string[],
    warningMessage: string[],
    varUsed: Record<string, string>;
    tests: [
        {
            name: string,
            status: boolean,
            message: string
        }
    ]
}