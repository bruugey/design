"use server";

import { getTSDoc } from "@/utils/getTsDoc";

export default async function getTsDocFromServer(component: string) {
  return await getTSDoc(component);
}
