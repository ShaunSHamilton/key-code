import { Uri } from "vscode";
import { createReadStream, readFileSync } from "fs";
import { createInterface } from "readline";

const DESCRIPTION_MARKER = "### --description--";
const SEED_MARKER = "### --seed--";
const CMD_MARKER = "### --cmd--";
const NEXT_MARKER = `### --`;

/**
 * Reads the first line of the file to get the project name
 */
export async function getProjectTitle(file: string) {
  const readable = createReadStream(file);
  const reader = createInterface({ input: readable });
  const firstLine: string = await new Promise((resolve) => {
    reader.on("line", (line) => {
      reader.close();
      resolve(line);
    });
  });
  readable.close();
  const proj = firstLine.replace("# ", "").split(" - ");
  return { projectTopic: proj[0], currentProject: proj[1] };
}

/**
 * Gets all content within a lesson
 */
export function getLessonFromFile(file: string, lessonNumber: number) {
  const fileContent = readFileSync(file, "utf8");
  const lesson = fileContent.match(
    new RegExp(`## ${lessonNumber}\n(.*?)\n## ${lessonNumber + 1}`, "s")
  )?.[1];
  return lesson;
}

/**
 * Gets the description of the lesson
 */
export function getLessonDescription(lesson: string) {
  const description = lesson.match(
    new RegExp(`${DESCRIPTION_MARKER}\n(.*?)\n(?=${NEXT_MARKER})`, "s")
  )?.[1];
  return description;
}

/**
 * Gets the hints and tests of the lesson
 */
export function getLessonHintsAndTests(lesson: string) {
  const testsString = lesson.trim().split(NEXT_MARKER)?.[2];
  const hintsAndTestsArr = [];
  const hints = testsString?.match(/^(.*?)$(?=\n+```js)/gm)?.filter(Boolean);
  const tests = testsString.match(/(?<=```js\n).*?(?=\n```)/gms);

  if (hints?.length) {
    for (let i = 0; i < hints.length; i++) {
      hintsAndTestsArr.push([hints[i], tests?.[i]]);
    }
  }
  return hintsAndTestsArr;
}

/**
 * Gets the seed of the lesson. If none is found, returns `''`.
 */
export function getLessonSeed(lesson: string) {
  const seed = lesson.match(
    new RegExp(`${SEED_MARKER}\n(.*)${NEXT_MARKER}`, "s")
  )?.[1];
  return seed ?? "";
}

/**
 * Gets the seed of the lesson. If none is found, returns `''`.
 */
export function getCmd(lesson: string) {
  const cmd = lesson.match(new RegExp(`${CMD_MARKER}\n(.*)`, "s"))?.[1];
  return cmd ?? "";
}

/**
 * Returns a string stripped from the input codeblock
 */
export function extractStringFromCode(code: string) {
  return code.replace(/.*?```[a-z]+\n(.*?)\n```/s, "$1");
}
