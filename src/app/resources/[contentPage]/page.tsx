"use client";
import { css } from "@emotion/css";
// import { ContentstackRichText } from "@/components/content-stack";
// import useContentPageContent from "@/hooks/useContentPageContent";

const ContentPage = ({
  params: { contentPage },
}: {
  params: { contentPage: string };
}) => {
  // const content = useContentPageContent(contentPage);

  return (
    <div
      className={css`
        max-width: 1000px; // TODO: Make this responsive
      `}
    >
      Resources
    </div>
  );
};

export default ContentPage;
