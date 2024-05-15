import { Fragment } from "react";
import { Polymorph } from "@leafygreen-ui/polymorphic";
import { CSTextNode } from "./types";

type CSRichTextProps = JSX.IntrinsicElements["span"] & {
  node: CSTextNode;
};

export const ContentstackText = ({ node, ...rest }: CSRichTextProps) => {
  const renderAs = node.bold ? "b" : rest.className ? "span" : Fragment;

  return (
    <Polymorph as={renderAs} {...rest}>
      {node.text}
    </Polymorph>
  );
};
