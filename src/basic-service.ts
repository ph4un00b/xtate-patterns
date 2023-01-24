import "./style.css";

import { createMachine, interpret } from "xstate";

const feedbackM = createMachine({
  /**
   * @abstract predictableActionArguments
   * default behavior on xstate 5!
   */
  predictableActionArguments: true,
  initial: "question",
  states: {
    question: {
      on: {
        /** verbose mode CLICK_GOOD: { target: "form" }, */
        CLICK_GOOD: /** goto */ "thanks",
      },
    },
    form: {},
    thanks: {},
    closed: {},
  },
});

/**
 * @abstract Service
 * A runtime instance of any machine
 */

const feedbackS = interpret(feedbackM);

feedbackS.onTransition((state) => {
  console.log(state.value);
});

feedbackS.start();

globalThis.send = feedbackS.send;

/**
 *  send("CLICK_GOOD") => thanks
 *
 * do not forget to stop
 * in order to clean up all listeners!
 */

feedbackS.stop();
