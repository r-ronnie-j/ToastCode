import MessageType from "../../../common/constants/enums/MessageEnums";
import vscode from "../vscode";

export default function fileHandler(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        vscode.postMessage({
            type: MessageType.FilePicker,
        });
        const listener = (e: MessageEvent<{
            type: MessageType,
            data: string | null,
        }>) => {
            if (e.data && e.data.type === MessageType.FilePicker) {
                window.removeEventListener('message', listener);
                resolve(e.data.data ?? null);
            }
        };
        window.addEventListener('message', listener);
    });
}