"use client";

import React from "react";
import { css } from "@emotion/css";
import Card from "@leafygreen-ui/card";
import {
  Table,
  TableHead,
  HeaderRow,
  HeaderCell,
  TableBody,
  Row,
  Cell,
} from "@leafygreen-ui/table";
import { InlineCode } from "@leafygreen-ui/typography";

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

export const PropsTable = ({ componentProps }: { componentProps: any }) => {
  return (
    <Card>
      {componentProps && (
        <Table darkMode>
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
                  <Row>
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
    </Card>
  );
};
