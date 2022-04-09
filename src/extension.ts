import {
  ExtensionContext,
  commands,
  window,
  ViewColumn,
  Uri,
  WebviewPanel,
  workspace,
  WorkspaceEdit,
  Position,
  Selection,
} from "vscode";
import { readFileSync, appendFile, mkdir } from "fs";
import { join, dirname } from "path";
import {
  extractStringFromCode,
  getCmd,
  getLessonDescription,
  getLessonFromFile,
  getLessonHintsAndTests,
  getLessonSeed,
} from "./lessons";

let LESSON = 1;

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
  const URI_OF_TEXT_DOCUMENT = Uri.file(
    join(workspace.workspaceFolders?.[0].name ?? "./", `key-code.js`)
  );

  let disposable = commands.registerCommand("key-code.start", async () => {
    window.showInformationMessage("Key Code Activated");
    commands.executeCommand("setContext", "key-code.active", true);

    panel.webview.html = getWebviewContent(context.extensionPath);
    // Test if `./key-code.js` exists
    try {
      await workspace.fs.stat(URI_OF_TEXT_DOCUMENT);
    } catch (err) {
      // Prompt user to create file
      const createFile = await window.showInformationMessage(
        "Create file `key-code.js`?",
        "Yes",
        "No"
      );
      if (createFile === "Yes") {
        // Create file
        try {
          await workspace.fs.writeFile(URI_OF_TEXT_DOCUMENT, Buffer.from(""));
        } catch (er) {
          console.warn(er);
          window.showErrorMessage(
            `Failed to create file. Try manually creating it in the root of your workspace.`
          );
        }
      }
    }
    runLesson(panel, LESSON);
  });

  context.subscriptions.push(
    commands.registerCommand(
      "key-code.keybind",
      ({ key, command, text = "" }) => {
        // Extension keybinding takes priority over default keybinding
        // Execute default keybinding
        if (command) {
          commands.executeCommand(command, text).then(() => {
            runTests(key, LESSON);
          });
        }
      }
    )
  );

  context.subscriptions.push(disposable);

  function getSel() {
    return window.activeTextEditor?.selections[0];
  }
  function assert(condition: boolean, message?: string) {
    if (!condition) {
      throw new Error(message ?? "Assertion failed");
    }
  }
  function placeCursor(line: number, col: number) {
    const sel = new Selection(line, col, line, col);
    const editor = window.activeTextEditor;
    if (editor) {
      editor.selection = sel;
    }
  }

  async function runLesson(panel: WebviewPanel, lessonNum: number) {
    // Get lesson content
    const projectFile = Uri.file(
      join(context.extensionPath, "lessons", `editor.md`)
    );
    const lesson = getLessonFromFile(projectFile.fsPath, lessonNum);
    // @ts-expect-error TODO
    const description = getLessonDescription(lesson);
    // @ts-expect-error TODO
    const seed = getLessonSeed(lesson);
    // @ts-expect-error TODO
    const initialCommands = getCmd(lesson);
    try {
      await eval(
        `(async () => {${extractStringFromCode(initialCommands)}})();`
      );
    } catch (e) {
      console.error(e);
    }

    workspace.openTextDocument(URI_OF_TEXT_DOCUMENT).then((doc) => {
      const edit = new WorkspaceEdit();
      edit.insert(doc.uri, new Position(0, 0), extractStringFromCode(seed));
      workspace.applyEdit(edit);
    });
    // Post message to panel
    panel.webview.postMessage({
      event: "update-description",
      data: description,
    });
  }

  async function runTests(key: string, lessonNum: number) {
    // Get tests
    const projectFile = Uri.file(
      join(context.extensionPath, "lessons", `editor.md`)
    );
    const lesson = getLessonFromFile(projectFile.fsPath, lessonNum);
    // @ts-expect-error TODO
    const hintsAndTestsArr = getLessonHintsAndTests(lesson);

    // console.log("🟠 ", hintsAndTestsArr);
    const testPromises = hintsAndTestsArr.map(async ([hint, test], i) => {
      try {
        const _testOutput = await eval(`(async () => {${test}})();`);
        // console.log(_testOutput);
      } catch (e) {
        // console.error("🔴 ", e);
        return Promise.reject(`- ${hint}\n`);
      }
      return Promise.resolve();
    });

    try {
      const passed = await Promise.all(testPromises);
      if (passed) {
        console.log("All tests passed!");
        LESSON += 1;
        runLesson(panel, lessonNum + 1);
      }
      panel.webview.postMessage({
        event: "update-tests",
        data: passed,
      });
    } catch (e) {
      panel.webview.postMessage({
        event: "update-tests",
        data: e,
      });
      // console.error(e);
    }

    // const result = tests.map((test) => {
    //   const res = eval(`(() => ${test.code})()`);
    //   console.log(window.activeTextEditor);
    //   return res;
    // });
    // If key is correct, pass, and move to next lesson
    // If key is incorrect, fail.
    // panel.webview.postMessage({
    //   event: "update-tests",
    //   data: result,
    // });
  }
  /**
   * Gets the webview/index.html file content
   */
  function getWebviewContent(extensionPath: string): string {
    const webviewHTML = panel.webview.asWebviewUri(
      Uri.file(join(extensionPath, "webview", "index.html"))
    );
    const file = readFileSync(webviewHTML.fsPath, "utf8");
    return file;
  }
}

export function deactivate() {
  commands.executeCommand("setContext", "key-code.active", false);
  window.showInformationMessage("Key Code Deactivated");
}
