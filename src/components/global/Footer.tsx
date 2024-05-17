"use client";

import { css, cx } from "@emotion/css";

import { useDarkMode } from "@leafygreen-ui/leafygreen-provider";
import { MongoDBLogo } from '@leafygreen-ui/logo';
import { color, fontWeights, Mode, spacing, typeScales } from "@leafygreen-ui/tokens";
import { Disclaimer, Link } from "@leafygreen-ui/typography";

const MONGODB_URL = "https://www.mongodb.com";

const FOOTER_LINKS = [
  { href: `${MONGODB_URL}/blog/post/meet-our-product-design-team-part-1`, text: "About design at MongoDB" },
  { href: `${MONGODB_URL}/blog`, text: "Blog" },
  { href: `${MONGODB_URL}/blog/channel/events`, text: "Events" },
  { href: "https://github.com/mongodb/leafygreen-ui", text: "GitHub" },
  { href: `${MONGODB_URL}/careers`, text: "Careers" },
];

const footerContainerStyle = (theme: Mode) => css`
  border-top: 1px solid ${color[theme].border.secondary.default};
  width: 100%;
  display: flex;

  padding-top: ${spacing[600]}px;
  padding-bottom: ${spacing[600]}px;
`;

const linksContainer = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[400]}px;
  padding-top: 5px; // Used for vertical alignment with logo
  padding-left: ${spacing[1600]}px;
  padding-right: ${spacing[1600]}px;
  padding-bottom: ${spacing[600]}px;
`;

const linkStyles = (theme: Mode) => css`
  margin: 0;
  font-size: 14px;
  font-weight: ${fontWeights.regular};
  line-height: ${typeScales.body1.lineHeight}px;
  text-decoration: none;
  color: ${color[theme].text.secondary.default};
  
  &:hover {
    text-decoration: none;
    color: ${color[theme].text.secondary.hover};
  }
`;

const trademarkStyle = (theme: Mode) => css`
  padding-top: ${spacing[1600]}px;
  font-size: 12px;
  color: ${color[theme].text.secondary.default};
`;

export function Footer() {
  const { theme } = useDarkMode();

  return (
    <div
      role="contentinfo"
      className={footerContainerStyle(theme)}
    >
      <a href={MONGODB_URL} target="_blank" rel="noopener noreferrer">
        <MongoDBLogo height={spacing[4]} aria-hidden="true" />
      </a>
      <div
        className={cx([
          linksContainer,
        ])}
      >
        {FOOTER_LINKS.map(({ href, text }) => (
          <Link
            key={text}
            className={linkStyles(theme)}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            hideExternalIcon
          >
            {text}
          </Link>
        ))}
        <Disclaimer className={trademarkStyle(theme)}>
          © {new Date().getFullYear()} MongoDB, Inc.
        </Disclaimer>
      </div>
    </div>
  );
}
