"use client";

import { css } from "@emotion/css";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import { SideNav, SideNavGroup, SideNavItem } from "@leafygreen-ui/side-nav";
import { spacing } from "@leafygreen-ui/tokens";
import { useRouter } from "next/navigation";

import { components } from "../utils/components";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <LeafyGreenProvider darkMode>
      <div>
        <SideNav
          aria-label="Side Navigation"
          className={css`
            height: 100%;
            position: fixed;
            z-index: 1;
          `}
        >
          <SideNavGroup header="components">
            {components.map((component) => (
              <SideNavItem
                key={component.name}
                onClick={() => router.push(component.navPath)}
              >
                {component.name}
              </SideNavItem>
            ))}
          </SideNavGroup>
        </SideNav>

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
