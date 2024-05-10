"use client";

import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { spacing } from "@leafygreen-ui/tokens";
import { InstallCard, PropsTable, VersionCard } from "@/components/code-docs";

import getTsDocFromServer from "./server";

export default function Page({ params }: { params: { component: string } }) {
  const [componentProps, setComponentProps] = useState<any>();

  useEffect(() => {
    const component = params.component;
    getTsDocFromServer(component).then((response) => {
      const allProps = response[0].props;
      let mergedProps = {};
      Object.keys(allProps).forEach((key) => {
        if (typeof allProps[key] === "object") {
          mergedProps = { ...mergedProps, ...allProps[key] };
        }
      });
      setComponentProps(mergedProps);
    });
  }, []);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[800]}px;
      `}
    >
      <div
        className={css`
          display: flex;
          gap: ${spacing[400]}px;
        `}
      >
        <InstallCard component={params.component} />
        <VersionCard component={params.component} />
      </div>

      <PropsTable componentProps={componentProps} />
    </div>
  );
}
