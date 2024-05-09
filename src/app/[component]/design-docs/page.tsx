"use client";

import { css } from "@emotion/css";
import Card from "@leafygreen-ui/card";

export default function Page({ params }: { params: { component: string } }) {
  return (
    <Card
      className={css`
        height: 300px;
      `}
    >
      Hello World, From Design Docs
    </Card>
  );
}
