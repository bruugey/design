"use client";

import React from "react";
import { css } from "@emotion/css";
import { useRouter, usePathname } from "next/navigation";
import IconButton from "@leafygreen-ui/icon-button";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { color, spacing } from "@leafygreen-ui/tokens";
import { H2 } from "@leafygreen-ui/typography";
import { CodeSandbox, Figma, Github } from "@/components/glyphs";
import { useDarkMode } from "@leafygreen-ui/leafygreen-provider";

const liveExamplePath = "live-example";
const designDocsPath = "design-docs";
const codeDocsPath = "code-docs";

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentComponent = pathname.split("/")[2];
  const { theme } = useDarkMode();

  const getSelected = () => {
    const suffix = pathname.split("/")[3];
    if (suffix === liveExamplePath) {
      return 0;
    }

    if (suffix === designDocsPath) {
      return 1;
    }

    if (suffix === codeDocsPath) {
      return 2;
    }
  };

  return (
    <div
      className={css`
        margin-left: ${spacing[800]}px;
        margin-right: ${spacing[1200]}px;
        min-height: 100vh;
      `}
    >
      <H2
        className={css`
          text-transform: capitalize;
          margin-bottom: ${spacing[600]}px;
        `}
      >
        {currentComponent.split("-").join(" ")}
      </H2>
      <Tabs
        selected={getSelected()}
        aria-label="main tabs"
        className={css`
          margin-bottom: ${spacing[800]}px;
        `}
        inlineChildren={
          <div
            className={css`
              display: flex;
              gap: ${spacing[200]}px;
              border-bottom: 1px solid ${color[theme].border.secondary.default};
              flex: 1;
              justify-content: flex-end;
              height: 100%;
            `}
          >
            <IconButton aria-label="View on Figma" size="large" disabled>
              <Figma />
            </IconButton>

            <IconButton aria-label="View on Github" size="large" disabled>
              <Github />
            </IconButton>

            <IconButton aria-label="View in CodeSandbox" size="large" disabled>
              <CodeSandbox />
            </IconButton>
          </div>
        }
      >
        <Tab
          onClick={() => router.push(`/${currentComponent}/${liveExamplePath}`)}
          name="Live Example"
        >
          <></>
        </Tab>
        <Tab
          onClick={() => router.push(`/${currentComponent}/${designDocsPath}`)}
          name="Design Documentation"
        >
          <></>
        </Tab>
        <Tab
          onClick={() => router.push(`/${currentComponent}/${codeDocsPath}`)}
          name="Code Documentation"
        >
          <></>
        </Tab>
      </Tabs>

      <div>{children}</div>
    </div>
  );
}
