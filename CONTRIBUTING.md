# Key Code

## Project Structure

- `lessons` - Contains all the lessons in the form of Markdown files.
- `src/lessons` - Contains all the parsing/utility logic for handling the lesson files.
- `src/extension.ts` - Contains the main logic for this extension.
- `webview` - Contains the files/content served in the VSCode WebView.

## Markdown Syntax

### Keys

- `## <number>` - The lesson number
- `### --description--` - The description of the lesson
- `### --tests--` - The tests for the lesson
- `### --seed--` - The seed for the lesson
- `### --cmd--` - The command to run to prepare the lesson

## Opening a Pull Request

Before you open a pull request, please ensure you follow this guide. This hopes to reduce the amount of time spent triaging and maintaing this project.

### Title

Please give your PR a relevant title. Specifically, it helps to follow these examples:

> _fix(minor): prevent extension from crashing during start_

> _feat(patch): improve the css of the webview_

> _chore(docs): update contributing docs_

### Description

A description of the changes, along with a justification as to why this change is a `patch`, `minor`, or `major`.
