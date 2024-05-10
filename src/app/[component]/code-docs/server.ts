"use server";

import { getTSDoc } from "@/utils/getTsDoc";

export default async function server(component: string) {
  return await getTSDoc(component);
}
