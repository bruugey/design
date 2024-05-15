"use client";

import { ContentstackRichText } from "@/components/content-stack";
import useContentPageContent from "@/hooks/useContentPageContent";

const ContentPage = ({
  params: { contentPageGroup },
}: {
  params: { contentPageGroup: string };
}) => {
  const content = useContentPageContent(contentPageGroup);

  return (
    <ContentstackRichText
      content={content}
    />
  );
};

export default ContentPage;
