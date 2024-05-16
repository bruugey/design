"use client";

import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import Card from "@leafygreen-ui/card";
import { color, spacing } from "@leafygreen-ui/tokens";
import { mergeObjects } from "@/utils/mergeObjects";
import { Data } from "@/components/live-example/types";
import { getStories } from "./server";
import { Knobs } from "@/components/live-example/Knobs";
import { useDarkMode } from "@leafygreen-ui/leafygreen-provider";

const OMIT_PROPS = [
  "aria-controls",
  "as",
  "baseFontSize",
  "children",
  "className",
  "contentClassName",
  "defaultOpen",
  "href",
  "id",
  "inputValue",
  "loadingIndicator",
  "menuItems",
  "name",
  "onCurrentPageOptionChange",
  "onDismiss",
  "open",
  "primaryButton",
  "refButtonPosition",
  "shouldTooltipUsePortal",
  "stateNotifications",
  "timeout",
  "usePortal",
  "value",
];

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

function removeProps(object: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !OMIT_PROPS.includes(key))
  );
}

function createDefaultProps(data: Data, darkMode: boolean) {
  const combinedProps = mergeObjects(
    constructArgValues(data.allData?.default?.args),
    data.allData?.default?.argTypes
  );

  const filteredProps = removeProps(combinedProps);

  filteredProps.darkMode = { value: darkMode, control: "boolean" };

  return filteredProps;
}

export default function Page({ params }: { params: { component: string } }) {
  const { darkMode } = useDarkMode();
  const [data, setData] = useState<Data | null>();
  const [knobProps, setKnobProps] = useState({});
  const [componentProps, setComponentProps] = useState({});

  useEffect(() => {
    async function getAsyncStories() {
      const response = await getStories(params.component);
      if (response) {
        setData(response);
      }
    }
    getAsyncStories();
  }, [params.component]);

  useEffect(() => {
    if (data) {
      const normalizedProps = createDefaultProps(data, darkMode);
      setKnobProps(normalizedProps);

      const propsCopy = {};
      // creates an object with all the prop names and the values
      for (let key in normalizedProps) {
        if (key === "children") {
          // if the child is a string the value is a string, else return the entire object
          propsCopy[key] = normalizedProps[key].value ?? {
            ...combinedProps[key],
          };
        } else {
          propsCopy[key] = normalizedProps[key].value ?? undefined;
        }
      }

      setComponentProps(propsCopy);
    }
  }, [data]);

  useEffect(() => {
    console.log({ props: knobProps, componentProps });
  }, [componentProps, knobProps]);

  const updateKnobValue = (propName: string, newValue: any) => {
    console.log("🐞updateKnobValue🐞", { propName, newValue });

    setKnobProps((props) => {
      return {
        ...props,
        [propName]: {
          ...props[propName],
          value: newValue,
        },
      };
    });

    setComponentProps((props) => {
      return {
        ...props,
        [propName]: newValue, // TODO: will break if not a string or boolean
      };
    });
  };

  if (data?.LiveExample) {
    const Component = data.LiveExample;
    return (
      <Card>
        <div
          className={css`
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            padding: ${spacing[600]}px;
            background-color: ${color[
              componentProps?.darkMode ? "dark" : "light"
            ].background.primary.default};
          `}
        >
          {/* @ts-expect-error */}
          <Component {...componentProps} />
        </div>
        <div>
          <Knobs props={knobProps} updateKnobValue={updateKnobValue} />
        </div>
      </Card>
    );
  }

  return null;
}
