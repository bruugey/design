"use client";

import { css } from "@emotion/css";
import Card from "@leafygreen-ui/card";

export default function Page({
  params,
  searchParams,
}: {
  params: { component: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Card
      className={css`
        height: 300px;
      `}
    >
      Hello World, From Live Example
    </Card>
  );
}
