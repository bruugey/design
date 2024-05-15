"use client";

import React, { useEffect, useState } from "react";
import Card from "@leafygreen-ui/card";
import { mergeObjects } from "@/utils/mergeObjects";
import { Data } from "@/components/live-example/types";
import { getStories } from "./server";

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

  useEffect(() => {
    async function getAsyncStories() {
      const response = await getStories(params.component);
      if (response) {
        setData(response);
      }
    }
    getAsyncStories();
  }, [getStories]);

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
    console.log({ props });
  }, [props]);

  if (data?.LiveExample) {
    const Component = data.LiveExample;
    // @ts-expect-error
    return <Card>{<Component />}</Card>;
  }

  return null;
}
