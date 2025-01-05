enum MessageType {
    Initialize,

    FilePicker,
    FileSaver,
    FileDelete,

    WriteVariable,
    WriteEnvironment,
    WriteFunction,
    GetVariable,
    GetEnvironment,
    GetFunction,
    GetRawFunction,

    GetRawRequests,
    SaveRequest,
    GetResponse,

    GetResponseFromNonce,

    LoadExample,

    AddRequestAtIndex,
    DeleteRequestAtIndex,

    CookiesData,
    CookiesSaver
}

export default MessageType;