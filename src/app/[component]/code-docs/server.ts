"use server";

import { getTSDoc } from "@/utils/getTSDoc";

export default async function getTSDocFromServer(component: string) {
  return await getTSDoc(component);
}
