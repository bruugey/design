"use server";

import { getTSDocs } from "@/utils/getTSDocs";

export default async function getTSDocFromServer(component: string) {
  return await getTSDocs(component);
}
