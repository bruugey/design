import { composeStories } from "@storybook/react";

export async function getStories(componentName: string) {
  // import * as stories from "./Button.stories";
  return await import(`@leafygreen-ui/${componentName}/stories`);

  // const { LiveExample } = composeStories(story);
  // console.log(LiveExample);
  // return LiveExample;
}
