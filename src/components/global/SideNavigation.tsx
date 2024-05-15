"use client";

import kebabCase from "lodash/kebabCase";
import React from "react";
import NextLink from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import { css } from "@emotion/css";
import Icon from "@leafygreen-ui/icon";
// @ts-expect-error
import AppsIcon from "@leafygreen-ui/icon/dist/Apps";
// @ts-expect-error
import GovernmentBuildingIcon from "@leafygreen-ui/icon/dist/GovernmentBuilding";
// @ts-expect-error
import LockIcon from "@leafygreen-ui/icon/dist/Lock";
// @ts-expect-error
import UniversityIcon from "@leafygreen-ui/icon/dist/University";
import { useDarkMode } from "@leafygreen-ui/leafygreen-provider";
import { MongoDBLogo } from "@leafygreen-ui/logo";
import { SideNav, SideNavGroup, SideNavItem } from "@leafygreen-ui/side-nav";
import { spacing } from "@leafygreen-ui/tokens";

import { useAppContext } from "@/contexts/AppContext";
import { ComponentMeta, Group, groupedComponents } from "@/utils/components";

export function SideNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const currentComponent = pathname.split("/")[1];
  const activePage = pathname.split('/')[2];
  const { contentPageGroups } = useAppContext();
  const { darkMode } = useDarkMode();

  console.log({ contentPageGroups });
  
  return (
    <SideNav
      widthOverride={240}
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

      {contentPageGroups.map(contentPageGroup => (
        <SideNavGroup
          key={contentPageGroup.uid}
          header={contentPageGroup.title}
          glyph={<Icon glyph={contentPageGroup.iconname} />}
        >
          {contentPageGroup.content_pages &&
            contentPageGroup.content_pages.map(contentPage => {
              const contentPageKebabCaseName = kebabCase(contentPage.title);

              return (
                <SideNavItem
                  key={contentPage.title}
                  as={NextLink}
                  href={`/${kebabCase(
                    contentPageGroup.title,
                  )}/${contentPageKebabCaseName}`}
                  active={contentPageKebabCaseName === activePage}
                >
                  {contentPage.title}
                </SideNavItem>
              );
            })}
        </SideNavGroup>
      ))}
      <SideNavGroup
        collapsible
        header="Resources"
        glyph={<GovernmentBuildingIcon />}
      ></SideNavGroup>
      <SideNavGroup
        initialCollapsed={false}
        collapsible
        header="components"
        glyph={<AppsIcon />}
      >
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
                    {component.isPrivate && (
                      <LockIcon
                        className={css`
                          margin-left: ${spacing[400]}px;
                        `}
                      />
                    )}
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
