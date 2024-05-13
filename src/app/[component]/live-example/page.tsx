"use client";

import React, { useEffect, useState } from "react";
import { composeStories } from "@storybook/react";
import { css } from "@emotion/css";
import Card from "@leafygreen-ui/card";

import { getStories } from "./server";
import { mergeObjects } from "@/utils/mergeObjects";

function constructArgValues(argValues: Record<string, any>) {
  let returnObj: Record<string, any> = {};

  for (let key in argValues) {
    if (typeof argValues[key] !== "object") {
      returnObj[key] = { value: argValues[key] };
    } else {
      returnObj[key] = argValues[key];
    }
  }

  return returnObj;
}

export default function Page({
  params,
  searchParams,
}: {
  params: { component: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [Component, setComponent] = useState<React.ReactNode | undefined>();
  const [props, setProps] = useState<any>();

  useEffect(() => {
    getStories(params.component).then((response) => {
      if (response) {
        const { LiveExample } = composeStories(response);
        setComponent(LiveExample as React.ReactNode);

        setProps(
          mergeObjects(
            constructArgValues(response?.default?.args),
            response?.default?.argTypes
          )
        );
      }
    });
  }, []);

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <Card
      className={css`
        height: 300px;
      `}
    >
      {Component && Component}
    </Card>
  );
}
