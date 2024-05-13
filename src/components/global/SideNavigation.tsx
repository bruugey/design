"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { css } from "@emotion/css";
// @ts-expect-error
import AppsIcon from "@leafygreen-ui/icon/dist/Apps";
// @ts-expect-error
import GovernmentBuildingIcon from "@leafygreen-ui/icon/dist/GovernmentBuilding";
// @ts-expect-error
import UniversityIcon from "@leafygreen-ui/icon/dist/University";
import { useDarkMode } from "@leafygreen-ui/leafygreen-provider";
import { MongoDBLogo } from "@leafygreen-ui/logo";
import { SideNav, SideNavGroup, SideNavItem } from "@leafygreen-ui/side-nav";
import { spacing } from "@leafygreen-ui/tokens";
import { ComponentMeta, Group, groupedComponents } from "@/utils/components";

export function SideNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const currentComponent = pathname.split("/")[1];
  const { darkMode } = useDarkMode();

  return (
    <SideNav
      darkMode={darkMode}
      aria-label="Side Navigation"
      className={css`
        height: 100%;
        position: fixed;
        z-index: 0;
      `}
    >
      <SideNavItem
        href="/"
        className={css`
          padding-top: ${spacing[600]}px;
          padding-bottom: ${spacing[600]}px;
        `}
        onClick={(e) => {
          e.preventDefault();
          router.push("/");
        }}
      >
        <MongoDBLogo height={24} color={darkMode ? "white" : "green-dark-2"} />
      </SideNavItem>

      <SideNavGroup
        collapsible
        header="Foundations"
        glyph={<UniversityIcon />}
      ></SideNavGroup>
      <SideNavGroup
        collapsible
        header="Resources"
        glyph={<GovernmentBuildingIcon />}
      ></SideNavGroup>
      <SideNavGroup collapsible header="components" glyph={<AppsIcon />}>
        {Object.keys(groupedComponents).map((groupName) => (
          <SideNavGroup key={groupName} header={groupName.split("-").join(" ")}>
            {groupedComponents[groupName as Group].map(
              (component: ComponentMeta) => {
                return (
                  <SideNavItem
                    key={component.name}
                    onClick={() => router.push(component.navPath)}
                    active={
                      currentComponent.toLowerCase().split("-").join(" ") ===
                      component.name.toLowerCase()
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
  );
}
