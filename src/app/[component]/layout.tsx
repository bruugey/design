"use client";

import React from "react";
import { css } from "@emotion/css";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { spacing } from "@leafygreen-ui/tokens";
import { H2 } from "@leafygreen-ui/typography";
import { useRouter, usePathname } from "next/navigation";

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentComponent = pathname.split("/")[1];

  return (
    <div
      className={css`
        margin-left: ${spacing[800]}px;
        margin-right: ${spacing[1200]}px;
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
          onClick={() => router.push(`/${currentComponent}/live-example`)}
          name="Live Example"
        >
          <></>
        </Tab>
        <Tab
          onClick={() => router.push(`/${currentComponent}/design-docs`)}
          name="Design Documentation"
        >
          <></>
        </Tab>
        <Tab
          onClick={() => router.push(`/${currentComponent}/code-docs`)}
          name="Code Documentation"
        >
          <></>
        </Tab>
      </Tabs>

      <div>{children}</div>
    </div>
  );
}
