import MessageType from "../constants/enums/MessageEnums"

export interface MessageData {
    type: MessageType,
    data: any
}

export interface Configuration {
    theme: number,
    fontSize: number,
    isConfig: boolean
}