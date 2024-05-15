"use client";

import { KnobRow } from "./KnobRow";

export const Knobs = (
  props: any,
  updateKnobValue: (prop: string, val: any) => void
) => {
  const knobsArray = props?.props ? Object.entries(props.props) : [];
  // name is the first item in the array, the object is the second item in the array
  const arrayCombine = knobsArray.map((knob) => {
    return {
      ...knob[1],
      name: knob[0],
    };
  });

  console.log("🪿Knobs: ", { knobsArray, arrayCombine, props: props.props });

  const consoleLog = (p, v) => {
    console.log("🦞", { p, v });
    updateKnobValue(p, v);
  };

  return (
    <>
      <div>
        {arrayCombine.map((knob) => {
          console.log("😈", { knob });
          return (
            <KnobRow key={knob.name} knob={knob} setKnobValue={consoleLog} />
          );
        })}
      </div>
    </>
  );
};
