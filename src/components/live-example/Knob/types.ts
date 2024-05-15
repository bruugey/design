import { HTMLElementProps } from "@leafygreen-ui/lib";

// import { KnobOptionType, TypeString } from "../../types";

export type KnobOptionType = string | number;

export interface KnobProps extends HTMLElementProps<"input"> {
  propName: string;
  // knobType: TypeString;
  knobType: any;
  knobOptions: Array<KnobOptionType>;
  value: any;
  onChange: (val: any) => void;
  darkMode?: boolean;
  [key: string]: any;
}
