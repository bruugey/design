"use server";

import fs from "fs";
import path from "path";
import util from "util";

import markdownToHtml from "./markdownToHtml";

const getFileContent = util.promisify(fs.readFile);

export async function getChangelog(
  componentName: string
): Promise<string | null> {
  try {
    const changelogMarkdown = await getFileContent(
      path.join(
        "./node_modules",
        `@leafygreen-ui/${componentName}`,
        "/CHANGELOG.md"
      )
    );
    return await markdownToHtml(changelogMarkdown);
  } catch (error) {
    console.warn(error);
    return null;
  }
}
