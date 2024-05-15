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
      setProps(
        mergeObjects(
          constructArgValues(data.allData?.default?.args),
          data.allData?.default?.argTypes
        )
      );
    }
  }, [data]);

  useEffect(() => {
    const propsCopy = {};
    for (let key in props) {
      if (key === "children") {
        propsCopy[key] = props[key].value ?? { ...props[key] };
      } else {
        propsCopy[key] = props[key].value ?? undefined;
      }
    }

    setComponentProps(propsCopy);

    console.log("🔺setComponentProps useEffect", { props, propsCopy });
  }, [props]);

  useEffect(() => {
    console.log({ props });
  }, [props]);

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
