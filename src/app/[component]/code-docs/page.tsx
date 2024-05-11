"use client";

import { useEffect, useState } from "react";
import { pickBy } from "lodash";
import { css } from "@emotion/css";
import { spacing } from "@leafygreen-ui/tokens";
import { InstallCard, PropsTable, VersionCard } from "@/components/code-docs";
import { components } from "@/utils/components";
import {
  TSDocResponse,
  PropTableState,
  mergeProps,
} from "@/components/code-docs";

import getTsDocFromServer from "./server";

/*
 * TODO:
 * Broken components:
 * SideNav: Item props don't render
 * Understand null defaults (and fix)
 */

export default function Page({ params }: { params: { component: string } }) {
  const [componentProps, setComponentProps] = useState<Array<PropTableState>>(
    []
  );

  useEffect(() => {
    const component = params.component;
    getTsDocFromServer(component).then((response: Array<TSDocResponse>) => {
      const subComponents = components.find(
        (componentMeta) =>
          componentMeta.name.toLowerCase().replace(/\s/g, "") ===
          component.split("-").join("")
      )?.subComponents;

      if (!!subComponents) {
        const propTables = response.filter((response) =>
          subComponents.includes(response.displayName)
        );

        const reducedPropTables: Array<PropTableState> = propTables.reduce(
          (acc: Array<PropTableState>, value: TSDocResponse) => {
            const mergedProps = mergeProps(value.props);
            return [...acc, { name: value.displayName, props: mergedProps }];
          },
          []
        );

        setComponentProps(reducedPropTables);
      } else {
        const centralProps = response.find((response) => {
          return response.displayName
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(component.toLowerCase().split("-").join(""));
        });
        const mergedProps = mergeProps(centralProps?.props);
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
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: ${spacing[800]}px;
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
