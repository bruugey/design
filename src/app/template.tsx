"use client";

import { css } from "@emotion/css";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import { spacing } from "@leafygreen-ui/tokens";

import { SideNavigation } from "@/components/global";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <LeafyGreenProvider darkMode>
      <div>
        <SideNavigation />

        <div
          className={css`
            width: 100%;
            z-index: 1;
            padding-top: ${spacing[400]}px;
            padding-right: ${spacing[400]}px;
            display: flex;
            justify-content: flex-end;
          `}
        />

        <div
          className={css`
            margin-left: 184px;
            height: 100%;
            padding: ${spacing[400]}px;
          `}
        >
          {children}
        </div>
      </div>
    </LeafyGreenProvider>
  );
}
