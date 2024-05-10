"use client";

import { useRouter, usePathname } from "next/navigation";
import { css } from "@emotion/css";
// @ts-expect-error
import AppsIcon from "@leafygreen-ui/icon/dist/Apps";
// @ts-expect-error
import GovernmentBuildingIcon from "@leafygreen-ui/icon/dist/GovernmentBuilding";
// @ts-expect-error
import UniversityIcon from "@leafygreen-ui/icon/dist/University";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import { SideNav, SideNavGroup, SideNavItem } from "@leafygreen-ui/side-nav";
import { spacing } from "@leafygreen-ui/tokens";

import { ComponentMeta, Group, groupedComponents } from "@/utils/components";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentComponent = pathname.split("/")[1];

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
          <SideNavGroup
            header="Foundations"
            glyph={<UniversityIcon />}
          ></SideNavGroup>
          <SideNavGroup
            header="Resources"
            glyph={<GovernmentBuildingIcon />}
          ></SideNavGroup>
          <SideNavGroup header="components" glyph={<AppsIcon />}>
            {Object.keys(groupedComponents).map((groupName) => (
              <SideNavGroup header={groupName.split("-").join(" ")}>
                {groupedComponents[groupName as Group].map(
                  (component: ComponentMeta) => {
                    return (
                      <SideNavItem
                        key={component.name}
                        onClick={() => router.push(component.navPath)}
                        active={
                          currentComponent
                            .toLowerCase()
                            .split("-")
                            .join(" ") === component.name.toLowerCase()
                        }
                      >
                        {component.name}
                      </SideNavItem>
                    );
                  }
                )}
              </SideNavGroup>
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
