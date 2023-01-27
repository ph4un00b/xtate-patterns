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
  user: string | undefined;
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

const createStateMachine = ({ user }: { user: CTX["user"] }) =>
  createMachine<CTX, PointerEvent>({
    preserveActionOrder: true,
    /**
     * @abstract predictableActionArguments
     * default behavior on xstate 5!
     */
    predictableActionArguments: true,
    initial: "checkingAuth",
    context: {
      user,
      tries: 0,
      x: 0,
      y: 0,
      deltaX: 0,
      deltaY: 0,
      initialX: 0,
      initialY: 0,
    },
    states: {
      checkingAuth: {
        always: [
          { target: "idle", cond: (ctx) => Boolean(ctx.user) },
          // else
          { target: "unauthorize" },
        ],
      },
      unauthorize: {},
      idle: {
        on: {
          pointerdown: [
            {
              cond: (ctx) => ctx.tries < 15,
              /**
               * using the history mode!
               */
              target: "dragging.hist",
              actions: [
                assign({
                  initialX: (_ctx, e: PointerEvent) => e.clientX,
                  initialY: (_ctx, e: PointerEvent) => e.clientY,
                }),
              ],
            },
            // else
            { target: "end" },
          ],
        },
      },
      end: { type: "final" },
      dragging: {
        /**
         * @abstract assigns should be pure functions!
         */
        entry: assign({ tries: (ctx) => ctx.tries + 1 }),
        after: { TIMEOUT: { target: "end", actions: resetPosition } },
        initial: "normal",
        states: {
          normal: {
            on: { "keydown.shift": "lockedX", SWITCH: { target: "blue" } },
          },
          blue: {
            on: { "keydown.shift": "lockedX", SWITCH: { target: "normal" } },
          },
          lockedX: {
            on: {
              "keyup.shift": "normal",
              pointermove: {
                // target: "no target!",
                actions: [
                  assign({ deltaX: (ctx, e) => e.clientX - ctx.initialX }),
                ],
              },
            },
          },
          // optional; default is 'shallow'
          hist: { type: "history", history: "shallow" },
        },
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
          "keyup.esc": { target: "idle", actions: resetPosition },
        },
      },
    },
  }, {
    delays: {
      // aliases
      TIMEOUT: 2000,
    },
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

const service = interpret(createStateMachine({ user: "jamon" }));

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
  const stateName = state.toStrings().join(" ");

  console.log(stateName);
  console.log(JSON.stringify(state.context.tries, null, 2));

  element.dataset.state = stateName;
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
body?.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key == "Escape") {
    service.send("keyup.esc");
  }
  if (e.code == "Space") {
    service.send("SWITCH");
  }
});
body?.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.shiftKey) {
    // console.log(e);
    service.send("keydown.shift");
  }
});
body?.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.shiftKey) {
    // console.log(e);
    service.send("keyup.shift");
  }
});
