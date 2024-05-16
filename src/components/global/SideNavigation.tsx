"use client";

import kebabCase from "lodash/kebabCase";
import React from "react";
import NextLink from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { css, cx } from "@emotion/css";
import Icon from "@leafygreen-ui/icon";
// @ts-expect-error
import AppsIcon from "@leafygreen-ui/icon/dist/Apps";
// @ts-expect-error
import LockIcon from "@leafygreen-ui/icon/dist/Lock";
import {
  PortalContextProvider,
  useDarkMode,
} from "@leafygreen-ui/leafygreen-provider";
import { MongoDBLogo } from "@leafygreen-ui/logo";
import { SideNav, SideNavGroup, SideNavItem } from "@leafygreen-ui/side-nav";
import { palette } from "@leafygreen-ui/palette";
import { color, spacing } from "@leafygreen-ui/tokens";

import { useContentStackContext } from "@/contexts/ContentStackContext";
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
}: JSX.IntrinsicElements["li"] & { active: boolean }) {
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
  const { contentPageGroups } = useContentStackContext();
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
        background-color: ${color[theme].background.secondary.default};
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
          active={pathname === "/"}
        >
          <MongoDBLogo
            height={24}
            color={darkMode ? "white" : "green-dark-2"}
          />
        </NavItem>
      </header>

      {contentPageGroups.map((contentPageGroup) => (
        <>
          <NavLabel
            key={contentPageGroup.uid}
            label={contentPageGroup.title}
            glyph={
              <Icon
                glyph={contentPageGroup.iconname}
                className={css`
                  margin-right: ${spacing[200]}px;
                `}
              />
            }
          />
          {contentPageGroup.content_pages &&
            contentPageGroup.content_pages.map((contentPage) => {
              const contentPageKebabCaseName = kebabCase(contentPage.title);

              return (
                <NavItem
                  key={contentPage.title}
                  active={contentPageKebabCaseName === activeSubDirOrPage}
                  onClick={() =>
                    router.push(
                      `/${kebabCase(
                        contentPageGroup.title
                      )}/${contentPageKebabCaseName}`
                    )
                  }
                >
                  {contentPage.title}
                </NavItem>
              );
            })}
        </>
      ))}

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

//</nav>   return (
//     <SideNav
//       widthOverride={240}
//       darkMode={darkMode}
//       aria-label="Side Navigation"
//       className={css`
//         height: 100%;
//         position: fixed;
//         z-index: 0;
//       `}
//     >
//       <SideNavItem
//         href="/"
//         className={css`
//           padding-top: ${spacing[600]}px;
//           padding-bottom: ${spacing[600]}px;
//         `}
//         onClick={(e) => {
//           e.preventDefault();
//           router.push("/");
//         }}
//       >
//         <MongoDBLogo height={24} color={darkMode ? "white" : "green-dark-2"} />
//       </SideNavItem>

//       {contentPageGroups.map(contentPageGroup => (
//         <SideNavGroup
//           key={contentPageGroup.uid}
//           header={contentPageGroup.title}
//           glyph={<Icon glyph={contentPageGroup.iconname} />}
//           collapsible
//         >
//           {contentPageGroup.content_pages &&
//             contentPageGroup.content_pages.map(contentPage => {
//               const contentPageKebabCaseName = kebabCase(contentPage.title);

//               return (
//                 <SideNavItem
//                   key={contentPage.title}
//                   as={NextLink}
//                   href={`/${kebabCase(
//                     contentPageGroup.title,
//                   )}/${contentPageKebabCaseName}`}
//                   active={contentPageKebabCaseName === activeSubDirOrPage}
//                 >
//                   {contentPage.title}
//                 </SideNavItem>
//               );
//             })}
//         </SideNavGroup>
//       ))}
//       <SideNavGroup
//         initialCollapsed={false}
//         collapsible
//         header="components"
//         glyph={<AppsIcon />}
//       >
//         {Object.keys(groupedComponents).map((groupName) => (
//           <SideNavGroup key={groupName} header={groupName.split("-").join(" ")}>
//             {groupedComponents[groupName as Group].map(
//               (component: ComponentMeta) => {
//                 return (
//                   <SideNavItem
//                     key={component.name}
//                     onClick={() => router.push(component.navPath)}
//                     active={
//                       currentComponent.toLowerCase().split("-").join(" ") ===
//                       component.name.toLowerCase()
//                     }
//                   >
//                     {component.name}
//                     {component.isPrivate && (
//                       <LockIcon
//                         className={css`
//                           margin-left: ${spacing[400]}px;
//                         `}
//                       />
//                     )}
//                   </SideNavItem>
//                 );
//               }
//             )}
//           </SideNavGroup>
//         ))}
//       </SideNavGroup>
//     </SideNav>
//   );
// }
