"use client";

import { useEffect, useState } from "react";

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

import server from "./server";

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

export default function Page({ params }: { params: { component: string } }) {
  const [props, setProps] = useState<any>();

  useEffect(() => {
    const component = params.component;
    server(component).then((response) => {
      const allProps = response[0].props;
      let mergedProps = {};
      Object.keys(allProps).forEach((key) => {
        if (typeof allProps[key] === "object") {
          mergedProps = { ...mergedProps, ...allProps[key] };
        }
      });
      setProps(mergedProps);
    });
  }, []);

  return (
    <Card>
      {props && (
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
            {Object.keys(props)
              .sort()
              .map((row) => {
                return (
                  <Row>
                    <Cell>
                      <>
                        {props[row].name}
                        <span
                          className={css`
                            color: red;
                          `}
                        >
                          {props[row].required ? "*" : ""}
                        </span>
                      </>
                    </Cell>
                    <Cell>
                      <InlineCode>
                        {props[row].defaultValue?.value ?? `'-'`}
                      </InlineCode>
                    </Cell>
                    <Cell>{props[row].description}</Cell>
                    <Cell>
                      <InlineCode>{formatType(props[row].type)}</InlineCode>
                    </Cell>
                  </Row>
                );
              })}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
