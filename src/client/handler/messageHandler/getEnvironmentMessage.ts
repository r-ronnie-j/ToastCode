import MessageType from "../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../common/interfaces/messages";
import { EnvironmentInfo } from "../../../common/interfaces/variables";

export default function getEnvironmentMessage(handlerFunction: (x: {
    paths: EnvironmentInfo[],
    envs: Record<string, string>
}) => void) {
    let listener = (e: MessageEvent<MessageData>) => {
        if (e.data && e.data.type === MessageType.GetEnvironment) {
            if (e.data.data.configuration) {
                handlerFunction(e.data.data);
            }
        }
    };
    window.addEventListener('message', listener);
    return () => {
        window.removeEventListener('message', listener);
    };
}