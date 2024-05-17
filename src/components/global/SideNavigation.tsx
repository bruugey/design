"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { css, cx } from "@emotion/css";
// @ts-expect-error
import GovernmentBuildingIcon from "@leafygreen-ui/icon/dist/GovernmentBuilding";
// @ts-expect-error
import UniversityIcon from "@leafygreen-ui/icon/dist/University";
// @ts-expect-error
import AppsIcon from "@leafygreen-ui/icon/dist/Apps";
// @ts-expect-error
import LockIcon from "@leafygreen-ui/icon/dist/Lock";
import { useDarkMode } from "@leafygreen-ui/leafygreen-provider";
import { MongoDBLogo } from "@leafygreen-ui/logo";
import { palette } from "@leafygreen-ui/palette";
import { color, spacing } from "@leafygreen-ui/tokens";

import { ComponentMeta, Group, groupedComponents } from "@/utils/components";

function NavLabel({
  label,
  glyph,
}: {
  label: string;
  glyph?: React.ReactNode;
}) {
  const { darkMode } = useDarkMode();

  return (
    <h4
      key={label}
      className={css`
        color: ${darkMode ? palette.green.light1 : palette.green.dark2};
        text-transform: uppercase;
        margin-top: 0;
        margin-bottom: 0;
        padding: ${spacing[400]}px ${spacing[400]}px ${spacing[200]}px;
        display: flex;
        align-items: center;
      `}
    >
      {glyph}
      {label.split("-").join(" ")}
    </h4>
  );
}

function NavList({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className={css`
        margin-block-start: 0;
        margin-block-end: 0;
        padding: 0;
      `}
    >
      {children}
    </ul>
  );
}

function NavItem({
  children,
  className,
  active,
  ...rest
}: JSX.IntrinsicElements["li"] & { active?: boolean }) {
  const { theme } = useDarkMode();
  return (
    <li
      {...rest}
      className={cx(
        css`
          position: relative;
          height: ${spacing[800]}px;
          margin: 0;
          padding: ${spacing[200]}px ${spacing[400]}px;
          display: flex;
          color: ${color[theme].text.primary.default};
          transition: background-color 150ms ease-in-out;
          cursor: pointer;

          &:before {
            content: "";
            position: absolute;
            background-color: transparent;
            left: 0px;
            top: 6px;
            bottom: 6px;
            width: 4px;
            border-radius: 0px 6px 6px 0px;
            transition: transform 150ms ease-in-out 0s;
            transform: scaleY(0.3);
          }

          &:hover {
            color: ${color[theme].text.primary.hover};
            background-color: ${color[theme].background.secondary.hover};
          }
        `,
        {
          [css`
            background-color: ${color[theme].background.success.default};
            font-weight: bolder;

            &:before {
              background-color: ${color[theme].icon.success.default};
              transform: scaleY(1);
              left: 1px;
            }
          `]: active,
        },
        className
      )}
    >
      {children}
    </li>
  );
}

export function SideNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [_, topLevelPage, activeSubDirOrPage] = pathname.split("/");
  const currentComponent =
    topLevelPage === "component" ? activeSubDirOrPage : "";
  const { darkMode, theme } = useDarkMode();

  return (
    <nav
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 240px;
        overflow-y: auto;
        list-style-type: none;
        overflow-x: hidden;
        padding-bottom: 16px;
        font-size: 12px;
        border-right: 1px solid ${color[theme].border.secondary.default};
      `}
    >
      <header>
        <NavItem
          className={css`
            padding-top: ${spacing[600]}px;
            padding-bottom: ${spacing[600]}px;
            height: unset;
          `}
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          <MongoDBLogo
            height={24}
            color={darkMode ? "white" : "green-dark-2"}
          />
        </NavItem>
      </header>

      <NavLabel
        label="Foundations"
        glyph={
          <UniversityIcon
            className={css`
              margin-right: ${spacing[200]}px;
            `}
          />
        }
      />
      <NavList>
        <NavItem
          active={pathname === "/foundations/grid"}
          onClick={() => router.push("/foundations/grid")}
        >
          Grid
        </NavItem>
        <NavItem
          active={pathname === "/foundations/icons"}
          onClick={() => router.push("/foundations/icons")}
        >
          Icons
        </NavItem>
        <NavItem
          active={pathname === "/foundations/palette"}
          onClick={() => router.push("/foundations/palette")}
        >
          Palette
        </NavItem>
        <NavItem
          active={pathname === "/foundations/tokens"}
          onClick={() => router.push("/foundations/tokens")}
        >
          Tokens
        </NavItem>
        <NavItem
          active={pathname === "/foundations/typography"}
          onClick={() => router.push("/foundations/typography")}
        >
          Typography
        </NavItem>
      </NavList>

      <NavLabel
        label="Resources"
        glyph={
          <GovernmentBuildingIcon
            className={css`
              margin-right: ${spacing[200]}px;
            `}
          />
        }
      />
      <NavList>
        <NavItem
          active={pathname === "/resources/accessibility"}
          onClick={() => router.push("/resources/accessibility")}
        >
          Accessibility
        </NavItem>
        <NavItem
          active={pathname === "/resources/icon-creation"}
          onClick={() => router.push("/resources/icon-creation")}
        >
          Icon Creation
        </NavItem>
        <NavItem
          active={pathname === "/resources/refresh-guide"}
          onClick={() => router.push("/resources/refresh-guide")}
        >
          Refresh Guide
        </NavItem>
      </NavList>

      <NavLabel
        label="Components"
        glyph={
          <AppsIcon
            className={css`
              margin-right: ${spacing[200]}px;
            `}
          />
        }
      />

      {Object.keys(groupedComponents).map((groupName) => (
        <>
          <NavLabel key={groupName} label={groupName.split("-").join(" ")} />

          <NavList>
            {groupedComponents[groupName as Group].map(
              (component: ComponentMeta) => {
                return (
                  <NavItem
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
                  </NavItem>
                );
              }
            )}
          </NavList>
        </>
      ))}
    </nav>
  );
}
