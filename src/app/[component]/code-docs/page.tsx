"use client";

import { useEffect, useState } from "react";

import { css } from "@emotion/css";

import { spacing } from "@leafygreen-ui/tokens";

import server from "./server";

import {
  InstallCard,
  PropsTable,
  VersionCard,
} from "../../../components/code-docs";

export default function Page({ params }: { params: { component: string } }) {
  const [props, setProps] = useState<any>();

  useEffect(() => {
    const component = params.component;
    server(component).then((response) => {
      const allProps = response[0].props;
      let mergedProps = {};
      Object.keys(allProps).forEach((key) => {
        if (typeof allProps[key] === "object") {
          mergedProps = { ...mergedProps, ...allProps[key] };
        }
      });
      setProps(mergedProps);
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
        <VersionCard />
      </div>

      <PropsTable componentProps={props} />
    </div>
  );
}
