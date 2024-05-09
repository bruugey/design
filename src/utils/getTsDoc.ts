import fs from "fs";
import path from "path";
import util from "util";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function () {
  return null;
}

const getFileContent = util.promisify(fs.readFile);

export async function getTSDoc(componentName: string = "button") {
  if (typeof componentName !== "string") return null;

  try {
    return JSON.parse(
      await getFileContent(
        path.join(
          "./node_modules",
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
