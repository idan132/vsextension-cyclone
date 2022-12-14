import * as vscode from 'vscode';

//main logic function, here we will run diagnostics logic on newly added dependencies to package.json manifest files
async function getDiagnostics(doc: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
	const text = doc.getText();
	const diagnostics = new Array<vscode.Diagnostic>();

	let packageJson: PackageJson;
	try{
		packageJson = JSON.parse(text)
	}
	catch(err){
		return diagnostics
	}
} 

//activate function, will recognize relevant code changes and execute logic in accordance
export async function activate(context: vscode.ExtensionContext) {
	const diagnosticsCollection = vscode.languages.createDiagnosticCollection('package-scanner')
	
	const handler = async(doc: vscode.TextDocument) => {
		if(!doc.fileName.endsWith('package.json')){
			return
		}

		const diagnostics = await getDiagnostics(doc);
		diagnosticsCollection.set(doc.uri, diagnostics);
	};

	const didOpen = vscode.workspace.onDidOpenTextDocument(doc => handler(doc))
	const didChange = vscode.workspace.onDidChangeTextDocument(e => handler(e.document))
	const codeActionProvider = vscode.languages.registerCodeActionsProvider()
}

// This method is called when your extension is deactivated
export function deactivate() {}
