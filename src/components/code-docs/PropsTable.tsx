"use client";

import React from "react";
import { css } from "@emotion/css";
import ExpandableCard from "@leafygreen-ui/expandable-card";
import {
  Table,
  TableHead,
  HeaderRow,
  HeaderCell,
  TableBody,
  Row,
  Cell,
} from "@leafygreen-ui/table";
import { InlineCode, Subtitle } from "@leafygreen-ui/typography";

// TODO: Add empty state

const columns = ["name", "default", "description", "type"];

function formatType(type: { raw?: string; name?: string; value?: any }) {
  if (!type) {
    return;
  }

  if (type.raw === "boolean" || type.raw === "ReactNode") {
    return type.raw;
  }

  if (type.value && Array.isArray(type.value)) {
    return type.value.map((obj) => obj.value).join(", ");
  }

  return type.name;
}

export const PropsTable = ({
  componentProps,
  name,
}: {
  componentProps: any;
  name: string;
}) => {
  return (
    <ExpandableCard
      defaultOpen
      title={
        <div
          className={css`
            text-transform: capitalize;
          `}
        >
          {name.split("-").join(" ")} Props
        </div>
      }
    >
      {componentProps && (
        <Table darkMode shouldAlternateRowColor>
          <TableHead>
            <HeaderRow>
              {columns.map((columnName: string) => (
                <HeaderCell
                  key={columnName}
                  className={css`
                    text-transform: capitalize;
                  `}
                >
                  {columnName}
                </HeaderCell>
              ))}
            </HeaderRow>
          </TableHead>
          <TableBody>
            {Object.keys(componentProps)
              .sort()
              .map((row) => {
                return (
                  <Row key={componentProps[row].name}>
                    <Cell>
                      <>
                        {componentProps[row].name}
                        <span
                          className={css`
                            color: red;
                          `}
                        >
                          {componentProps[row].required ? "*" : ""}
                        </span>
                      </>
                    </Cell>
                    <Cell>
                      <InlineCode>
                        {componentProps[row].defaultValue?.value ?? `'-'`}
                      </InlineCode>
                    </Cell>
                    <Cell>{componentProps[row].description}</Cell>
                    <Cell>
                      <InlineCode>
                        {formatType(componentProps[row].type)}
                      </InlineCode>
                    </Cell>
                  </Row>
                );
              })}
          </TableBody>
        </Table>
      )}
    </ExpandableCard>
  );
};
