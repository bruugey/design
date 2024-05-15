"use client";

import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';

import ContentstackRichText from '@/components/ContentstackRichText';
import {
  getContentPage,
  getContentPageGroups,
} from '@/utils/ContentStack/getContentstackResources';

import { CSNode } from '@/components/ContentstackRichText/types';
import { useEffect, useState } from 'react';
import { ContentPage as ContentPageType } from '@/utils/ContentStack/types';

const ContentPage = ({ params: { contentPageGroup } }: { params: { contentPageGroup: string } }) => {
  const [contentPage, setContentPage] = useState<ContentPageType>();

  useEffect(() => {
    async function getContentPageAsync() {
      const contentPageObj = await getContentPage(startCase(contentPageGroup));
      setContentPage(contentPageObj);
    }
    getContentPageAsync();
  }, [contentPageGroup]);

  return (
    <div>
      <ContentstackRichText content={contentPage?.content as CSNode | undefined} />;
    </div>
  );
};

export default ContentPage;
