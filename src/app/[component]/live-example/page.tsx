"use client";

import React, { cloneElement, useEffect, useState } from "react";
import { composeStories } from "@storybook/react";
// import { css } from "@emotion/css";
import Card from "@leafygreen-ui/card";
import { mergeObjects } from "@/utils/mergeObjects";
import { getStories } from "./server";
import { Knobs } from "@/components/live-example/Knobs";

//TODO: omit props
const OMIT_PROPS = ["as", "baseFontSize", "children"];

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

export default function Page({ params }: { params: { component: string } }) {
  const [Component, setComponent] = useState<React.ReactElement | undefined>();
  const [props, setProps] = useState<any>({});
  const [componentProps, setComponentProps] = useState({});

  const updateKnobValue = (propName: string, newValue: any) => {
    console.log("🐞updateKnobValue🐞", { propName, newValue });

    setProps((p) => {
      return {
        ...p,
        [propName]: {
          ...p[propName],
          value: newValue,
        },
      };
    });
  };

  useEffect(() => {
    getStories(params.component).then((response) => {
      if (response) {
        const { LiveExample } = composeStories(response);
        setComponent(LiveExample as React.ReactElement);

        const mergedProps = mergeObjects(
          constructArgValues(response?.default?.args),
          response?.default?.argTypes
        );

        console.log({
          response,
          LiveExample,
          props: mergedProps,
        });

        setProps(mergedProps);
      }
    });
  }, []);

  useEffect(() => {
    const propsCopy = {};
    console.log("🔺setComponentProps useEffect", { props, propsCopy });

    for (let key in props) {
      propsCopy[key] =
        props[key].value ?? props[key].props?.children ?? undefined;
    }

    setComponentProps(propsCopy);
  }, [props]);

  useEffect(() => {
    console.log("🍊🍊🍊", { componentProps });
  }, [componentProps]);

  return (
    <Card className={""}>
      <div>{Component && React.cloneElement(Component, componentProps)}</div>
      <div>
        <Knobs props={props} updateKnobValue={updateKnobValue} />
      </div>
    </Card>
  );
}
