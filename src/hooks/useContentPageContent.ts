"use client";

import { startCase } from "lodash";
import { useState, useEffect } from "react";

import { getContentPage } from "@/utils/ContentStack/getContentstackResources";
import { ContentPage as ContentPageType } from "@/utils/ContentStack/types";

export default function useContentPageContent(contentPageGroup: string) {
  const [contentPage, setContentPage] = useState<ContentPageType>();

  useEffect(() => {
    async function getContentPageAsync() {
      const contentPageObj = await getContentPage(startCase(contentPageGroup));
      setContentPage(contentPageObj);
    }
    getContentPageAsync();
  }, [contentPageGroup]);

  return contentPage?.content;
}