import { ExtensionContext, commands, window } from "vscode";

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand("key-code.start", () => {
    window.showInformationMessage("Key Code Activated");
    commands.executeCommand("setContext", "key-code.active", true);
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
        }
      }
    )
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  commands.executeCommand("setContext", "key-code.active", false);
  window.showInformationMessage("Key Code Deactivated");
}
