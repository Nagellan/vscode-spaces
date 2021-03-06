import * as vscode from 'vscode';

class ViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewId = 'vscode-presets-view';

	private view?: vscode.WebviewView;

	constructor(private readonly extensionUri: vscode.Uri) {}

	public resolveWebviewView(webviewView: vscode.WebviewView) {
		const webview = webviewView.webview;

		this.view = webviewView;

		webview.options = {
			enableScripts: true,
			localResourceRoots: [this.extensionUri],
		};

		webview.html = this.getWebviewContent();

		webview.onDidReceiveMessage((data) => {
			switch (data.type) {
				default:
					break;
			}
		});
	}

	private getWebviewContent() {
		const styleVSCodeUri = this.view?.webview.asWebviewUri(
			vscode.Uri.joinPath(this.extensionUri, 'resources', 'vscode.css')
		);

		return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <link href="${styleVSCodeUri}" rel="stylesheet">
          <title>Presets</title>
      </head>
      <body>
	  	  <p>An extension is currently under active development.<br /><b>Not usable yet.</b></p>
		  <button disabled>Create a Preset</button>
      </body>
      </html>`;
	}
}

export default ViewProvider;
