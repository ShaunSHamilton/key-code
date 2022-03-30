import {
  ExtensionContext,
  commands,
  window,
  ViewColumn,
  Uri,
  WebviewPanel,
} from "vscode";
import { readFileSync } from "fs";
import { join } from "path";

export function activate(context: ExtensionContext) {
  const panel = window.createWebviewPanel(
    "key-code",
    "Key Code",
    ViewColumn.Two,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );

  let disposable = commands.registerCommand("key-code.start", () => {
    window.showInformationMessage("Key Code Activated");
    commands.executeCommand("setContext", "key-code.active", true);

    panel.webview.html = getWebviewContent(context.extensionPath);
    runLesson(panel);
  });

  context.subscriptions.push(
    commands.registerCommand(
      "key-code.keybind",
      ({ key, command, text = "" }) => {
        // Extension keybinding takes priority over default keybinding
        // Execute default keybinding
        window.showInformationMessage(`${key}`);
        if (command) {
          commands.executeCommand(command, text);
          runTests(key);
        }
      }
    )
  );

  context.subscriptions.push(disposable);

  function runLesson(panel: WebviewPanel) {
    // Get lesson content
    // Post message to panel
    panel.webview.postMessage({
      event: "update-description",
      description: "Hello World",
    });
  }

  function runTests(key: string) {
    // Get tests
    // If key is correct, pass, and move to next lesson
    // If key is incorrect, fail.
    panel.webview.postMessage({
      event: "update-description",
      description: key,
    });
  }
}

export function deactivate() {
  commands.executeCommand("setContext", "key-code.active", false);
  window.showInformationMessage("Key Code Deactivated");
}

/**
 * Gets the webview/index.html file content
 */
function getWebviewContent(extensionPath: string): string {
  const webviewHTML = Uri.file(
    join(extensionPath, "src", "webview", "index.html")
  );
  const file = readFileSync(webviewHTML.fsPath, "utf8");
  return file;
}
