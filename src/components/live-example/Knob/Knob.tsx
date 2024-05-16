import { css, cx } from "@leafygreen-ui/emotion";
import { RadioBox, RadioBoxGroup } from "@leafygreen-ui/radio-box-group";
import { Option, Select, SelectProps } from "@leafygreen-ui/select";
import TextInput, { TextInputProps } from "@leafygreen-ui/text-input";
import Toggle from "@leafygreen-ui/toggle";

import { radioBoxOverrideStyle } from "./Knob.styles";
import { RawKnob } from "./RawKnob";
import { KnobOptionType, KnobProps, KnobTypeObj } from "./types";

const inputStyle = css`
  min-width: 256px;
`;

export const Knob = ({
  propName,
  knobType: knobTypeProp,
  value,
  onChange,
  knobOptions,
  ...rest
}: KnobProps) => {
  console.log("🪼🪼", { propName, value, knobTypeProp, knobOptions });

  const knobType =
    typeof knobTypeProp !== "string" ? knobTypeProp.type : knobTypeProp;

  switch (knobType) {
    case "string":
    case "text":
      return (
        <TextInput
          {...(rest as TextInputProps)}
          aria-label={propName}
          placeholder={propName}
          value={value}
          onChange={onChange}
          className={cx(inputStyle, rest.className)}
        />
      );

    case "number":
    case "range":
      return (
        <TextInput
          {...(rest as TextInputProps)}
          aria-label={propName}
          type="number"
          placeholder={propName}
          value={value?.toString() ?? value}
          onChange={onChange}
          className={cx(inputStyle, rest.className)}
          min={(knobTypeProp as KnobTypeObj)?.min ?? undefined}
          max={(knobTypeProp as KnobTypeObj)?.max ?? undefined}
        />
      );

    case "boolean":
      return (
        /// @ts-expect-error
        <Toggle
          {...rest}
          checked={!!value as boolean}
          onChange={onChange}
          size="small"
        />
      );

    case "array":
    case "enum":
    case "select":
    case "radio": {
      if (knobOptions && knobOptions.length) {
        if (knobOptions.length <= 3) {
          return (
            <RadioBoxGroup
              {...rest}
              onChange={onChange}
              value={value}
              size="compact"
            >
              {knobOptions.map((opt: KnobOptionType) => (
                <RadioBox
                  className={radioBoxOverrideStyle}
                  key={opt}
                  value={opt}
                >
                  {opt}
                </RadioBox>
              ))}
            </RadioBoxGroup>
          );
        }

        return (
          /// @ts-expect-error
          <Select
            {...(rest as SelectProps)}
            value={value}
            onChange={onChange}
            className={cx(inputStyle, rest.className)}
          >
            {knobOptions.map((opt: KnobOptionType) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        );
      }

      return <>{`${value}`}</>;
    }

    default:
      return <RawKnob propName={propName} value={value} onChange={onChange} />;
  }
};
