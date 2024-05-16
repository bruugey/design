"use client";

import React, { useState } from "react";
import { css } from "@emotion/css";
import LeafyGreenProvider, {
  useDarkMode,
} from "@leafygreen-ui/leafygreen-provider";
import { color, spacing } from "@leafygreen-ui/tokens";
import {
  DarkModeToggle,
  Footer,
  UserMenu,
  SideNavigation,
} from "@/components/global";

export default function Template({ children }: { children: React.ReactNode }) {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={css`
        position: relative;
        min-height: 100vh;
        height: 100%;
        width: 100%;
        background-color: ${darkMode
          ? color.dark.background.primary.default
          : color.light.background.primary.default};
      `}
    >
      <SideNavigation />

      <div
        className={css`
          width: 100%;
          padding-top: ${spacing[400]}px;
          padding-right: ${spacing[400]}px;
          display: flex;
          justify-content: flex-end;
          position: absolute;
          top: 0;
          right: 0;
        `}
      >
        <UserMenu />
        <DarkModeToggle />
      </div>

      <div
        className={css`
          margin-left: calc(
            240px + ${spacing[600]}px
          ); // SideNav override + padding
          margin-right: ${spacing[600]}px;
          height: 100%;
          padding: ${spacing[400]}px;
        `}
      >
        {children}
        <Footer />
      </div>
    </div>
  );
}
