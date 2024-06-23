// import * as vscode from 'vscode';
// import * as child_process from 'child_process';
// import { stderr, stdout } from 'process';

// export function activate(context: vscode.ExtensionContext) {

// 	// 拡張機能がアクティブになったときに呼ばれる
// 	console.log('Congratulations, your extension "branch-alert" is now active!');

// 	let disposable2 = vscode.commands.registerCommand('branch-alert.debug', () => {
// 		vscode.window.showInformationMessage('debuuuuuuug');
// 	});

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// package.jsonのcommands内に記述したcommand名と変数をここで呼び出している（機能を追加する時はpackage.jsonに記述する）
// 	let disposable = vscode.commands.registerCommand('branch-alert.showAlert', async () => {
// 		// ワークスペースの現在の作業ディレクトリを取得
// 		let workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
// 		// 'git status'コマンドを実行して現在のブランチを取得
// 		if (workspaceFolder) {
// 			child_process.exec('git status -b --porcelain', { cwd: workspaceFolder }, (error, stdout, stderr) => {
// 				if (error) {
// 					console.error(`Error executing command: ${error}`);
// 					return;
// 				}
// 				// 出力から現在のブランチ名を取り出す
// 				let lines = stdout.split('\n');
// 				let currentBranch = '';
// 				lines.forEach(line => {
// 					if (line.startsWith('## ')) {
// 						currentBranch = line.replace('## ', '').trim();
// 					}
// 				});
// 				console.log(currentBranch);
// 				// developブランチかどうかを判定する
// 				if (currentBranch === 'develop') {
// 					vscode.window.showWarningMessage('developブランチで作業しています!!!!');
// 				} else {
// 					vscode.window.showInformationMessage(`${currentBranch}で作業しています`);
// 				}
// 			});
// 		} else {
// 			vscode.window.showErrorMessage('No workspace opened.');
// 		}
// 	});

// 	context.subscriptions.push(disposable);
// 	context.subscriptions.push(disposable2);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}



import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // コマンド登録
  const disposable = vscode.commands.registerCommand('branch-alert.showAlert', async () => {
    // 現在開いているエディターのワークスペースフォルダを取得
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspaceFolder) {
      vscode.window.showErrorMessage('ワークスペースフォルダが見つかりません。');
      return;
    }

    // Gitリポジトリの存在を確認
    const gitExtension = vscode.extensions.getExtension('vscode.git');
    if (!gitExtension || !gitExtension.isActive) {
      vscode.window.showErrorMessage('Git拡張機能がインストールされていないか、有効になっていません。');
      return;
    }

    // ローカルブランチを取得
    const currentBranch = await vscode.commands.executeCommand('git branch --current');
    if (!currentBranch) {
      vscode.window.showErrorMessage('現在のブランチを取得できませんでした。');
      return;
    }

    // // developブランチかどうかを確認
    // if (currentBranch.trim() === 'develop') {
    //   // developブランチならブランチ名とメッセージを表示
    //   const branchMessage = await vscode.commands.executeCommand('git branch -v develop');
    //   vscode.window.showInformationMessage(`現在のブランチはdevelopです。\n${branchMessage}`);
    // } else {
      vscode.window.showInformationMessage(`現在のブランチはdevelopではありません。`);
    // }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

