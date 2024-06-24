// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import git from 'simple-git';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.workspace.onDidSaveTextDocument(async (document) => {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        
        if (workspaceFolder) {
            const gitRepo = git(workspaceFolder.uri.fsPath);
            
            try {
                const branchSummary = await gitRepo.branch();
                const currentBranch = branchSummary.current;
                
                if (currentBranch === 'develop') {
                    vscode.window.showWarningMessage('You are currently working on the develop branch!');
                }
            } catch (error) {
                console.error('Error checking Git branch:', error);
            }
        }
    });


	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
