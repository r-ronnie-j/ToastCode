import { Configuration, MessageData } from "../../../common/interfaces/messages";
import MessageType from "../../../common/constants/enums/MessageEnums";

export default function initializeMessage(handlerFunction: (a: Configuration) => void) {
    let listener = (e: MessageEvent<MessageData>) => {
        if (e.data && e.data.type === MessageType.Initialize) {
            handlerFunction(e.data.data as Configuration);
        }
    };
    window.addEventListener('message', listener);
    return () => {
        window.removeEventListener('message', listener);
    };
}