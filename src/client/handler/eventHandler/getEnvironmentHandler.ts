import MessageType from "../../../common/constants/enums/MessageEnums";
import { MessageData } from "../../../common/interfaces/messages";
import { EnvironmentInfo } from "../../../common/interfaces/variables";
import vscode from "../vscode";

export default function getEnvironmentHandler(): Promise<{
    paths: EnvironmentInfo[]
    envs: Record<string, string>
}> {
    return new Promise((resolve) => {
        let initTimer = setTimeout(() => {
            vscode.postMessage({
                type: MessageType.GetEnvironment,
            });
        }, 1000);
        const listener = (e: MessageEvent<MessageData>) => {
            if (e.data && e.data.type === MessageType.GetEnvironment) {
                window.removeEventListener('message', listener);
                clearTimeout(initTimer);
                resolve(e.data.data);
            }
        };
        window.addEventListener('message', listener);
    });
}