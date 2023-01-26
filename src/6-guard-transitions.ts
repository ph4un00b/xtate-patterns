import "./style.css";

/**
 * @abstract Statecharts (1987, david harel)
 * Statecharts: a visual formalism for complex systems
 *
 * takeaway:
 * prefer object syntax
 * over function syntax
 *
 * in version 5:
 * actions will be called in order
 * instead of being prioritized!
 */
import { assign, createMachine, interpret } from "xstate";

const element = document.querySelector("button");
const body = document.querySelector("body");

type CTX = {
  tries: number;
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  deltaX: number;
  deltaY: number;
};

const resetPosition = assign({
  deltaX: 0,
  deltaY: 0,
  initialX: 0,
  initialY: 0,
});

const machine = createMachine<CTX>({
  preserveActionOrder: true,
  /**
   * @abstract predictableActionArguments
   * default behavior on xstate 5!
   */
  predictableActionArguments: true,
  initial: "idle",
  context: {
    tries: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    initialX: 0,
    initialY: 0,
  },
  states: {
    idle: {
      on: {
        pointerdown: [
          /**
           * transition 1
           * if it is not taken for instance
           * due to a condition, then
           * the next transition will be taken!
           */
          {
            cond: (ctx) => ctx.tries < 5,
            target: "dragging",
            /**
             * more flexible in the array way
             * instead of setting an inline function
             */
            actions: [
              assign({
                initialX: (_ctx, e: PointerEvent) => e.clientX,
                initialY: (_ctx, e: PointerEvent) => e.clientY,
              }),
            ],
          },
          /**
           * transition 2
           */
          { target: "end" },
        ],
      },
    },
    end: { type: "final" },
    dragging: {
      /**
       * @abstract assigns should be pure functions!
       */
      entry: assign({
        tries: (ctx) => ctx.tries + 1,
      }),
      on: {
        pointermove: {
          // target: "no target!",
          actions: [
            assign({
              deltaX: (ctx, e: PointerEvent) => e.clientX - ctx.initialX,
              deltaY: (ctx, e: PointerEvent) => e.clientY - ctx.initialY,
            }),
          ],
        },
        pointerup: {
          target: "idle",
          actions: [
            assign({
              x: (ctx) => ctx.x + ctx.deltaX,
              y: (ctx) => ctx.y + ctx.deltaY,
              deltaX: 0,
              deltaY: 0,
              initialX: 0,
              initialY: 0,
            }),
          ],
        },
        "keyup.esc": {
          target: "idle",
          actions: resetPosition,
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

function setInitialPoint(_ctx: unknown, evt: MouseEvent) {
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

  // transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px));
  element.style.transform =
    `translate(${state.context.deltaX}px, ${state.context.deltaY}px)`;

  if (!state.changed) return;
  console.log(JSON.stringify(state.value, null, 2));
  console.log(JSON.stringify(state.context.tries, null, 2));
  element.dataset.state = state.value as string;
  element.dataset.state = state.value.toString();
  element.style.setProperty("--dx", state.context.deltaX.toString());
  element.style.setProperty("--dy", state.context.deltaY.toString());
  element.style.setProperty("--x", state.context.x.toString());
  element.style.setProperty("--y", state.context.y.toString());

  // top: calc(var(--y) * 1px);
  element.style.top = state.context.y + "px";
  // left: calc(var(--x) * 1px);
  element.style.left = state.context.x + "px";
});

service.start();

element?.addEventListener("pointerdown", service.send);
body?.addEventListener("pointermove", service.send);
body?.addEventListener("pointerup", service.send);
