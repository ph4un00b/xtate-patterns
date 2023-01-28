import { createMachine } from "xstate";

const basicMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHcCGAbA1gOjQSwBc8A7KAYnTFQDcwACACwHsBbMAbQAYBdRUAByaxCeJsT4gAHogC0AJgBs2ACzKAjAA4NATgCsChXoDMukwBoQAT0Rzd2NQqOc5yuSa3aFugL7eLaLGwxOlQ6AMwyKCY6ACNUAGNMRlYOHglBYSIxCWkENTlsXQB2NSM5IpcFThL9bQtrPN1le04NUw1NBQ6i6t8-EGImCDgJcPShEWykKVkXOzk1ItNtDqNtIvV62QUCsp2Kpwc1PW1ffwwcfCJScczRcWncmWPmg2VtOT1200cthCcVD05JwjGpdIoNl4imcQOEgsQQmELrdJg9QLkFs05IojBojEZ1BoihoQX8Sdh1p41OpjnjdKYYXDwnQwMRhhAUVk0TMEM91tgFks1qt1psrIgwc01JxSpxXMoNAY1j4+kA */
  createMachine({
    id: "walk",

    states: {
      waiting: {
        on: {
          "leave home": "on a walk",
        },
      },

      "on a walk": {
        on: {
          "go back home": "walk ended",
        },
      },

      "walk ended": {
        type: "final",
      },
    },

    initial: "waiting",
  });

const compoundMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BbADqgrgOwgDoBDWAGzDEwGIzcIACPVAS1jAG0AGAXUVGywWAFxao8-EAA9EAWgCMiwgFYAnAGYAbJoBMAdgAcyzXt2aANCACeieXvmEALOq7LXq1TsfyDBzQF9-SzQsXAISckoaOhxGZjZOeT4kEEERMQkUmQRZZXVCD1UDR315bXVHEssbBHUdVScueVVHA0MuPTzHQOCMbHwiUgoqalh0MDIyWAYAM1RUCG5kgVQhUXFJbNlNR0Idep1ir2VlHTzlasQPAudHPVVmly5VHZ6QEP7w4gB3YgBrMDUGbESbTIZRJaSNLrTKgLbNHSEdTqPT3ZTydQGHSaE7qS4IHTIm5qFqmXxY5R6N4fMKDX4AwiRKhWUaUWbzRa8KGrdIbLKIQmInH1OwPPRcHQSizWWz2JwuNwkrw+PyBIIgZgQOCSGkDblrDKbOQufLtVQS+zqDEXGU5DRORxcAzyPJ6byOTRFal9WkRYaYfW82HSORnZSEM0WjHW-HXDS6RynZStYzKb2hAYkelgQMwo0IHy7YVisUSqX43IFdHo3xaTQovTqVTpz50-5gRn+morA18uECol3LjI+uqe6aXw6fHOlQN1Hip32NPq3VfbOEAAW+CgACdu6keXn+QTvEidPJHJ5NHYPS18diHMi7IoDBVMVoW76fu3GchiDvIFzQ1j0JfIhxHJtx0nfF1DcFRmmKRNYMbRQ1X8IA */
  createMachine({
    id: "compound",

    states: {
      asleep: {
        on: {
          "loud noise": [
            {
              target: "awake",
              cond: "isVeryTired",
            },
            "awake.scared",
          ],
          "smells food": "awake",
        },
      },

      awake: {
        on: {
          "falls asleep": "asleep",
        },

        states: {
          sleepy: {
            on: {
              "see food": "hungry",
            },
          },

          hungry: {},
          scared: {},
        },

        initial: "sleepy",
      },
    },

    initial: "asleep",
  });

/**
 * created with "xsm" shortcut
 * from xstate extension
 */
const parallelMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAcCGAnVAbLYsDoBbASwGMiBXAF0gGIKA7Q6sAbQAYBdRFAe1mJVivBjxAAPRAFoATAE4A7PgCM7ZcpnKALFoBsAVi3s5ugDQgAnohnt8N9voUL9M-brkAOJ7oC+P82iYOHhEZPiMzDQQtJFsXGLI-ILCokgS0nL4HnLaAMxaHvrqOWrK5lYIubn4uqVeOTkKDvp+ARjYuAQAbsQQYLz46IwMxAxQtGgUsHHcaYkCQiJikggyNvgmcq5erlq5Mrke5YgeylkFyrlyclqeuS6+-iCBHSE9fQOT09HIWKgWHFmfAWKWWiEOunwzn0ai2ulubg8WmOCFO51OVxudxccj8TwYvD68Dm7WCWASSUWqVAKykV2qqnUmh0BiMJhRsiuGxhumUhQUugUaz2rWepM6oVIFJBSzStPy+hUpWZekMxjMlmkyhc+D0lzWMiah0UopeZMllCi0uSsppWoONQF7iR7CF7CuGoqUnhGzdrhMRjcnlN4pCJHIERYEGtVLBCCk6khpzkxkN7ED7BkR01CGUOTs2nYHg8uQUuSLuhkWhDQQl736MdBcsQyiFG3c2yFhn2hw52khuQ0gv0+kHZdbNde3V6-UGw1GUEbtvSqyr+HL8l5XkK7gKHP0HiyB1L2RuBq0LSeZrrM8+qCmkCX1JXa0PhsOpZyuXhH5RfLOehOEUpweJmngeHiPhAA */
  createMachine({
    id: "parallel",
    tsTypes: {} as import("./12-visual-editor.typegen").Typegen2,
    schema: {
      context: {} as { contextType },
      events: {} as { type: "eventType" },
    },
    context: {
      initialContextValue,
    },
    states: {
      mic: {
        states: {
          muted: {
            on: {
              unmute: {
                target: "unmuted",
                actions: ["unmuteMic", "recordUserUnmutes"],
              },
            },
          },

          unmuted: {
            on: {
              mute: {
                target: "muted",
                actions: ["muteMic"],
              },
            },
          },
        },

        initial: "muted",
      },
      video: {
        states: {
          running: {
            tags: "jamon",
            exit: ["recordVideoPauses"],
            on: {
              pause: "paused",
            },
          },

          paused: {
            entry: ["fetchAdstobeShown"],
            on: {
              play: "running",
            },
          },
        },

        initial: "running",
      },
    },
    type: "parallel",
  });
