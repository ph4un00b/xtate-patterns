import "./style.css";

import { createMachine } from "xstate";

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
        CLICK_GOOD: /** goto */ "thank",
      },
    },
    form: {},
    thank: {},
    closed: {},
  },
});

// console.log(JSON.stringify(feedbackM.initialState, null, 2));

const clickGoodEvt = {
  type: "CLICK_GOOD",
  /** we can add extra payloads */ time: Date.now(),
};

const nextState = feedbackM.transition(
  feedbackM.initialState,
  clickGoodEvt,
);

console.log(JSON.stringify(nextState, null, 2));
