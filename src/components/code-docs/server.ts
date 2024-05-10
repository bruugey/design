import { getChangelog } from "@/utils/getChangelog";

export async function getChangelogFromServer(component: string) {
  return await getChangelog(component);
}
