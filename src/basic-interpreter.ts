import "./style.css";

import { createMachine, interpret } from "xstate";

const element = document.querySelector("button");

const machine = createMachine({
  /**
   * @abstract predictableActionArguments
   * default behavior on xstate 5!
   */
  predictableActionArguments: true,
  initial: "inactive",
  states: {
    inactive: {
      on: {
        mousedown: "active",
      },
    },
    active: {
      on: {
        mouseup: "inactive",
      },
    },
  },
});

/**
 * @abstract Service
 * A runtime instance of any machine
 */

const service = interpret(machine);

service.onTransition((state) => {
  console.log(state.value);
});

service.start();

element?.addEventListener("mousedown", (event) => {
  //   service.send({ type: "mousedown" });
  service.send(event);
});

element?.addEventListener("mouseup", (event) => {
  //   service.send({ type: "mouseup" });
  service.send(event);
});
