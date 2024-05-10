"use client";

import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { spacing } from "@leafygreen-ui/tokens";
import { InstallCard, PropsTable, VersionCard } from "@/components/code-docs";
import { components } from "@/utils/components";

import getTsDocFromServer from "./server";

/*
 * TODO:
 * Fix type errors
 * Format page
 * Broken components:
 * Loading Indicator: line 61
 * Skeleton Loader: line 61
 * Table: empty states
 */

function mergeProps(componentProps: Record<string, any>) {
  let mergedProps = {};

  Object.keys(componentProps).forEach((key) => {
    if (typeof componentProps[key] === "object") {
      mergedProps = { ...mergedProps, ...componentProps[key] };
    }
  });

  return mergedProps;
}

export default function Page({ params }: { params: { component: string } }) {
  const [componentProps, setComponentProps] = useState<Array<any>>([]);

  useEffect(() => {
    const component = params.component;
    getTsDocFromServer(component).then((response) => {
      const subComponents = components.find(
        (componentMeta) =>
          componentMeta.name.toLowerCase().replace(/\s/g, "") ===
          component.split("-").join("")
      )?.subComponents;

      if (!!subComponents) {
        const propTables = response.filter((response) =>
          subComponents.includes(response.displayName)
        );

        const reducedPropTables = propTables.reduce((acc, value) => {
          const mergedProps = mergeProps(value.props);
          return [...acc, { name: value.displayName, props: mergedProps }];
        }, []);

        setComponentProps(reducedPropTables);
      } else {
        const centralProps = response.find((response) => {
          return response.displayName
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(component.toLowerCase().split("-").join(""));
        });
        const mergedProps = mergeProps(centralProps.props);
        setComponentProps([{ name: component, props: mergedProps }]);
      }
    });
  }, []);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[800]}px;
      `}
    >
      <div
        className={css`
          display: flex;
          gap: ${spacing[400]}px;
        `}
      >
        <InstallCard component={params.component} />
        <VersionCard component={params.component} />
      </div>

      {componentProps.map(({ name, props }) => {
        return <PropsTable key={name} name={name} componentProps={props} />;
      })}
    </div>
  );
}
