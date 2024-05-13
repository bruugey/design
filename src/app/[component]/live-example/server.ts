export async function getStories(componentName: string) {
  return await import(`@leafygreen-ui/${componentName}/stories`);
}
