"use server";

import fs from "fs";
import path from "path";
import util from "util";
import { markdownToHtml } from "@/utils/markdownToHtml";

const getFileContent = util.promisify(fs.readFile);

export async function getTSDocs(componentName: string = "button") {
  if (typeof componentName !== "string") return null;

  try {
    return JSON.parse(
      await getFileContent(
        path.join(
          __dirname,
          "../../../../../node_modules",
          `@leafygreen-ui/${componentName}`,
          "/tsdoc.json"
        ),
        "utf-8"
      )
    );
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function getTSDocFromServer(component: string) {
  return await getTSDocs(component);
}

export async function getChangelog(
  componentName: string
): Promise<string | null> {
  try {
    const changelogMarkdown = await getFileContent(
      path.join(
        __dirname,
        "../../../../../node_modules",
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

export async function getChangelogFromServer(component: string) {
  return await getChangelog(component);
}
