import { HTMLElementProps } from "@leafygreen-ui/lib";

export type KnobOptionType = string;
export type KnobTypeObj = {
  type: string;
  min?: number;
  max?: number;
  [key: string]: any;
};
export type KnobType = string | KnobTypeObj;

export interface KnobProps extends HTMLElementProps<"input"> {
  propName: string;
  knobType: KnobType;
  knobOptions: Array<KnobOptionType>;
  value: any;
  onChange: (val: any) => void;
  darkMode?: boolean;
  [key: string]: any;
}
