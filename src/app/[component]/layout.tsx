"use client";

import React, { useCallback } from "react";
import { css } from "@emotion/css";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { spacing } from "@leafygreen-ui/tokens";
import { H2 } from "@leafygreen-ui/typography";
import { useRouter, usePathname } from "next/navigation";

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
  const currentComponent = pathname.split("/")[1];

  const getSelected = useCallback(() => {
    const suffix = pathname.split("/")[2];
    if (suffix === liveExamplePath) {
      return 0;
    }

    if (suffix === designDocsPath) {
      return 1;
    }

    if (suffix === codeDocsPath) {
      return 2;
    }
  }, [pathname]);

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
            `}
          >
            <div>Figma</div>
            <div>GitHub</div>
            <div>CodeSandbox</div>
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
