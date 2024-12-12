enum MessageType {
    Initialize,
    FilePicker,
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
}

export default MessageType;