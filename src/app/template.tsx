"use client";

import { useState } from "react";
import { css } from "@emotion/css";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import { color, spacing } from "@leafygreen-ui/tokens";

import {
  DarkModeToggle,
  Footer,
  UserMenu,
  SideNavigation,
} from "@/components/global";

export default function Template({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        className={css`
          min-height: 100vh;
          height: 100%;
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
          `}
        >
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
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
    </LeafyGreenProvider>
  );
}
