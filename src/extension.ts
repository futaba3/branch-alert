import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "branch-alert" is now active!');
	vscode.window.showInformationMessage('Hello from branch-alert!');

	let disposable = vscode.commands.registerCommand('branch-alert.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from branch-alert!');
    });

    context.subscriptions.push(disposable);

	let checkBranchCommand = vscode.commands.registerCommand('branch-alert.checkBranch', () => {
		console.log('Check branch command executed.');
		checkCurrentBranch();
	});

	context.subscriptions.push(checkBranchCommand);

	let onSaveEvent = vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		console.log('Document saved:', document.fileName);
		checkCurrentBranch();
	});

	context.subscriptions.push(onSaveEvent);
}

function checkCurrentBranch() {
	console.log('Checking current branch...');
	exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
		if (err) {
			console.error(`Error: ${stderr}`);
			vscode.window.showErrorMessage(`Error: ${stderr}`);
			return;
		}

		const currentBranch = stdout.trim();
		console.log('Current branch:', currentBranch);
		if (currentBranch === 'develop' || currentBranch === 'main') {
			vscode.window.showWarningMessage(`You are currently on the ${currentBranch} branch. Be careful with changes!`);
		}
	});
}

export function deactivate() {}
