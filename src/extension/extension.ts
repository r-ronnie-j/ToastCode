import * as vscode from 'vscode';
import { ToastRendererProvider } from './renderer/toastRenderer';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(ToastRendererProvider.register(context));
	console.log("When are these activated");
}
