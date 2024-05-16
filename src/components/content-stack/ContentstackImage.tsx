import { useState } from "react";
import { css } from "@emotion/css";
import Image from "next/image";
import { spacing } from "@leafygreen-ui/tokens";
import { CSNode } from "./types";

// TODO: restrict the type of `content` more (should assert it has certain attrs)
export const ContentstackImage = ({
  content,
  ...props
}: {
  content: CSNode;
  [key: string]: any;
}) => {
  const attrs = content.attrs;

  return (
    <div
      css={
        !props.isNested &&
        css`
          max-width: 700px;
          margin-top: ${spacing[800]}px;
          margin-bottom: ${spacing[600]}px;
        `
      }
      {...props}
    >
      <Image
        src={attrs["asset-link"]}
        layout="intrinsic"
        alt={attrs["asset-name"]}
        width={700}
        height={700}
      />
    </div>
  );
};
