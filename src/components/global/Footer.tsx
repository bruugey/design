"use client";

import { css } from "@emotion/css";
import { Logo } from "@/components/glyphs";
import { spacing } from "@leafygreen-ui/tokens";
import { Body, Link } from "@leafygreen-ui/typography";

export function Footer() {
  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: ${spacing[1600]}px;
      `}
    >
      <div>
        <Logo />
      </div>
      <div
        className={css`
          display: flex;
          gap: ${spacing[400]}px;
        `}
      >
        <Link href="https://www.mongodb.com/blog/post/meet-our-product-design-team-part-1">
          About Design at MongoDB
        </Link>
        <Link href="https://www.mongodb.com/blog">Blog</Link>
        <Link href="https://www.mongodb.com/blog/channel/events">Events</Link>
        <Link href="https://github.com/mongodb/leafygreen-ui">Github</Link>
        <Link href="https://www.mongodb.com/company/careers">Careers</Link>
        <Body>@2024 MongoDB, Inc.</Body>
      </div>
    </div>
  );
}
