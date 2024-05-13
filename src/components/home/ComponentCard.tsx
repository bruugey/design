import React from "react";
import { css } from "@emotion/css";
import Card from "@leafygreen-ui/card";
import { useDarkMode } from "@leafygreen-ui/leafygreen-provider";
import { color, spacing } from "@leafygreen-ui/tokens";
import { Body, H3 } from "@leafygreen-ui/typography";
import {
  Components,
  Display,
  FormElements,
  Modals,
  Navigation,
  Notifications,
  Patterns,
} from "@/components/glyphs";

const ImageMap = {
  Navigation: Navigation,
  Notifications: Notifications,
  Modals: Modals,
  Display: Display,
  FormElements: FormElements,
  Patterns: Patterns,
} as const;

type ImageKey = keyof typeof ImageMap;

export function ComponentCard() {
  const { theme } = useDarkMode();

  return (
    <Card>
      <div
        className={css`
          padding-bottom: ${spacing[1000]}px;
          border-bottom: 1px solid ${color[theme].border.secondary.default};
          position: relative;
          min-height: 250px;
        `}
      >
        <H3
          className={css`
            margin-bottom: ${spacing[200]}px;
          `}
        >
          Components
        </H3>
        <Body>
          These components are the building blocks of MongoDB’s design system.
          We’ve grouped these components into the following categories.
        </Body>
        <Components
          className={css`
            position: absolute;
            bottom: 0;
            right: 0;
          `}
        />
      </div>
      <div
        className={css`
          margin-top: ${spacing[600]}px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        `}
      >
        {Object.keys(ImageMap).map((type) => {
          const Image = ImageMap[type as ImageKey];

          return (
            <div
              className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
              `}
            >
              <Image
                className={css`
                  margin-bottom: ${spacing[400]}px;
                `}
              />
              {type
                .replace(/([A-Z])/g, " $1")
                .trim()
                .replace(/^\w/, (c) => c.toUpperCase())}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
