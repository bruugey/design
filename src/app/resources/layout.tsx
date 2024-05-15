"use client";

import React from 'react';
import startCase from 'lodash/startCase';
import Head from 'next/head';
import getFullPageTitle from '@/utils/getFullPageTitle';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { css } from '@emotion/css';

const DESKTOP_MARGIN_TOP = 72;
const DESKTOP_MAX_WIDTH = 700;

const layoutStyles = css`
  margin-top: ${DESKTOP_MARGIN_TOP}px;
  max-width: ${DESKTOP_MAX_WIDTH}px;
`;

function ContentPageLayout({
  contentPageTitle,
  children,
}: {
  contentPageTitle: string;
  children?: React.ReactNode;
}) {
  const pageTitle = getFullPageTitle(startCase(contentPageTitle));
  return (
    <div role="main" className={layoutStyles}>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta name="keywords" content={contentPageTitle} />
      </Head>
      <LeafyGreenProvider baseFontSize={16}>
        <div>{children}</div>
      </LeafyGreenProvider>
    </div>
  );
}

ContentPageLayout.displayName = 'ContentPageLayout';

export default ContentPageLayout;
