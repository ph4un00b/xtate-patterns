import "./style.css";

/**
 * @abstract Actions
 * side effects!
 * me: kind of hooks!
 * EXIT => DO => ENTRY
 *
 * refactor:
 * in case of depending on actions
 * you should model it as state!
 */
import { createMachine, interpret } from "xstate";

const element = document.querySelector("button");

const machine = createMachine({
  /**
   * @abstract predictableActionArguments
   * default behavior on xstate 5!
   */
  predictableActionArguments: true,
  initial: "idle",
  states: {
    idle: {
      on: {
        mousedown: {
          target: "dragging",
          /**
           * more flexible in the array way
           * instead of setting an inline function
           */
          actions: [setPoint],
        },
      },
    },
    dragging: {
      on: {
        mouseup: {
          target: "idle",
          //   actions: [setPoint],
        },
      },
    },
  },
}, {
  actions: {
    overrideAction: () => {
      console.log("good for integration testing!");
    },
  },
});

function setPoint(_ctx: unknown, evt: MouseEvent) {
  if (!element) return;
  element.dataset.point = `(${evt.clientX},${evt.clientY})`;
}

const service = interpret(machine);

/**
 * @abstract mealy machines states take its external inputs on count
 * https://en.wikipedia.org/wiki/Mealy_machine
 *
 * @abstract moore machines states take its previous state
 * https://en.wikipedia.org/wiki/Moore_machine
 */
service.onTransition((state) => {
  if (!element) return;
  element.dataset.state = state.value as string;
});

service.start();

element?.addEventListener("mousedown", service.send);
element?.addEventListener("mouseup", service.send);
