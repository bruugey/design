"use client";

import React from 'react';

import { css } from '@emotion/css';

const DESKTOP_MARGIN_TOP = 72;
const DESKTOP_MAX_WIDTH = 700;

const mainContainerStyles = css`
  margin-top: ${DESKTOP_MARGIN_TOP}px;
  max-width: ${DESKTOP_MAX_WIDTH}px;
`;

export default function ContentPageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div role="main" className={mainContainerStyles}>
      {children}
    </div>
  );
}
