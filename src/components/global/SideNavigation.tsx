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
import { SideNav, SideNavGroup, SideNavItem } from "@leafygreen-ui/side-nav";

import { ComponentMeta, Group, groupedComponents } from "@/utils/components";

export function SideNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const currentComponent = pathname.split("/")[1];

  return (
    <SideNav
      aria-label="Side Navigation"
      className={css`
        height: 100%;
        position: fixed;
        z-index: 1;
      `}
    >
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
