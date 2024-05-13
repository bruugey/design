import React from "react";
import { css } from "@emotion/css";
import Card from "@leafygreen-ui/card";
import { Body, H3 } from "@leafygreen-ui/typography";
import { Foundations, Resources } from "@/components/glyphs";
import { spacing } from "@leafygreen-ui/tokens";

const imageMap = {
  Foundations: Foundations,
  Resources: Resources,
} as const;

type HomeCardProps = JSX.IntrinsicElements["div"] & {
  title: "Foundations" | "Resources";
  description: string;
  link?: string;
};

export function HomeCard({ title, description, link, ...rest }: HomeCardProps) {
  const Image = imageMap[title];

  return (
    <Card
      className={css`
        height: 350px;
      `}
      {...rest}
    >
      <H3
        className={css`
          margin-bottom: ${spacing[200]}px;
          position: relative;
        `}
      >
        {title}
      </H3>
      <Body>{description}</Body>
      <Image
        className={css`
          position: absolute;
          bottom: 0;
          right: 0;
        `}
      />
    </Card>
  );
}
