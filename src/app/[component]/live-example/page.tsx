"use client";

import React, { useEffect, useState } from "react";

import Card from "@leafygreen-ui/card";
import { mergeObjects } from "@/utils/mergeObjects";
import { Data } from "@/components/live-example/types";
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
  const [data, setData] = useState<Data | null>();
  const [props, setProps] = useState<any>();
  const [componentProps, setComponentProps] = useState({});

  const updateKnobValue = (propName: string, newValue: any) => {
    console.log("🐞updateKnobValue🐞", { propName, newValue });

    setProps((props) => {
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
      const combinedProps = mergeObjects(
        constructArgValues(data.allData?.default?.args),
        data.allData?.default?.argTypes
      );

      setProps(combinedProps);

      const propsCopy = {};

      // creates an object with all the prop names and the values
      for (let key in combinedProps) {
        if (key === "children") {
          // if the child is a string the value is a string, else return the entire object
          propsCopy[key] = combinedProps[key].value ?? {
            ...combinedProps[key],
          };
        } else {
          propsCopy[key] = combinedProps[key].value ?? undefined;
        }
      }

      setComponentProps(propsCopy);
    }
  }, [data]);

  useEffect(() => {
    console.log({ props, componentProps });
  }, [componentProps, props]);

  if (data?.LiveExample) {
    const Component = data.LiveExample;
    return (
      <Card className={""}>
        <div>
          {/* @ts-expect-error */}
          <Component {...componentProps} />
        </div>
        <div>
          <Knobs props={props} updateKnobValue={updateKnobValue} />
        </div>
      </Card>
    );
  }

  return null;
}
