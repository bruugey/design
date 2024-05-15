"use client";

import { ContentstackRichText } from "@/components/content-stack";
import useContentPageContent from "@/hooks/useContentPageContent";

const ContentPage = ({
  params: { contentPage },
}: {
  params: { contentPage: string };
}) => {
  const content = useContentPageContent(contentPage);

  return (
    <ContentstackRichText
      content={content}
    />
  );
};

export default ContentPage;
