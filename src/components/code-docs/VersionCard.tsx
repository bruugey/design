"use client";

import React from "react";
import { css } from "@emotion/css";
import Button from "@leafygreen-ui/button";
import Card from "@leafygreen-ui/card";
// @ts-expect-error
import ActivityFeed from "@leafygreen-ui/icon/dist/ActivityFeed";
import { spacing } from "@leafygreen-ui/tokens";
import { Subtitle } from "@leafygreen-ui/typography";

export const VersionCard = () => {
  return (
    <Card>
      <Subtitle
        className={css`
          margin-bottom: ${spacing[400]}px;
        `}
      >
        Version
      </Subtitle>
      <Button leftGlyph={<ActivityFeed />}>View Changelog</Button>
    </Card>
  );
};
