enum MessageType {
    Initialize,
    FilePicker,
    FileSaver,

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

    SaveExample,
    LoadExample,
    DeleteExample,
}

export default MessageType;