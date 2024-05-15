import { KnobRow } from "./KnobRow";

interface Knobs {
  props: any;
  updateKnobValue: (prop: string, val: any) => void;
}

export const Knobs = ({ props, updateKnobValue }: Knobs) => {
  // console.log("🪿Knobs: ", { props });
  let propsArr = [];

  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      // not everything has a value, need to update that?
      const prop = {
        ...props[key],
        name: key,
      };
      propsArr.push(prop);
    }
  }

  // console.log({ propsArr });

  return (
    <div>
      {propsArr.map((knob) => {
        return (
          <KnobRow
            key={knob.name}
            knob={knob}
            knobValue={knob.value ?? undefined}
            setKnobValue={updateKnobValue}
          />
        );
      })}
    </div>
  );
};
