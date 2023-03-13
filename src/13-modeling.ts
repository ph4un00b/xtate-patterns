import { createMachine } from "xstate";
const PanelMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAUCGA7MAbAdASwizAGIAHAez3QBcwAnCcgd3QG0AGAXUVAtj2p5y6HiAAeiALQBGAEwB2HADYlAZlmz28gBzyArFu0AaEAE9E0gCw5ZSvUsvTpB+dIfylAX08m0mXBB0qFBQVFBklDT0ALbkAG5gHNxIIHwCQiIpEgiq7DZazq7yHgCc2qpqJuYI0mU47JZq7NLsJXqWstLF3j4g6OQQcKJ+2KJpgsKi2TL6ymoahvpaOlVSVqrKzQrS2rJ6e86q3r4Y2PiEYGPk-BOZoNMt2jh6OvLs7Zaq2pYe8qsIknsOCctX0eh2JR22mkxxAIwCQRCYSuNwyUzW7CeL1070sn2+v3+UPqBi+3yU2nKWi8PSAA */

  /** @xstate-layout N4IgpgJg5mDOIC5QAUCGA7MAbAdASwizAGIAHAez3QBcwAnCcgd3QG0AGAXUVAtj2p5y6HiAAeiAIwBWdjgAskgBwBmaUtXt2k9vOkAaEAE9EAJgBsknOYDs5tZNNLT80zcnmAvp8NpMuCDpUKCgqKDJKGnoAW3IANzAObiQQPgEhERSJBCUbFRwlAE5pQsL5dyVddUMTBABaKx0ZdnUbeXNTD3l5b18MbBxA4ND0cIoqWjoAV1Ik0TTBYVFsyRUlAu1XFUK7DvlcmqlpUwUVUxbLVQsbG1NekD8BoZCwnHRyOmjULGI5lIWMstECU5B5JPJCip2G4yqZCocEBZCjgdu0VHkbOxbuCej4Hv0AkEXqMcABjchYLCoUiwSC-Ljzcj8RaZUDZVo4aTo8zyBzsFRqeHGRAqPQ4LTscyFVR2SSrGz3R6E4ZhCITeikjCk7B-XhM9JLLJSczSAryFp5dhlUrFeQI7b5HQ2WRuGxKOWQ3F494QOCiJWM5mAo31E0KUyyN2FZTmXQChF1DScoqis7c+xePFK-CEMCBg2s8SIBo2cORooxuOmBFuR1KXlrc6FFwmzN9fyDIkjKD5llAhCuE6FWNyyVKY4Qu3ChCOUutdhKKU2QrQ0xuRUEzsqknvT7fXvBtmIcpyYfaHTmccuMo1y84ToC46qWx5E0bjvPbtkilUmmQA+GkeCBuvI4rmooi6XsUti3lYkp6Ks+wCpCbTeN4QA */
  createMachine({
    id: "Panel",
    tsTypes: {} as import("./13-modeling.typegen").Typegen0,
    schema: {
      context: {} as { contextType },
      events: {} as { type: "eventType" },
    },
    context: {
      initialContextValue,
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          pointerdown: {
            target: "dragging",
            actions: "setPointerCapture",
          },
        },
      },

      dragging: {
        on: {
          pointerup: "idle",
          pointercancel: "idle",
        },

        states: {
          normal: {
            always: {
              target: "collapsed",
              cond: "ctx.width < 100px",
            },
          },

          collapsed: {
            always: {
              target: "normal",
              cond: "ctx.width >= 100px",
            },
          },
        },

        initial: "normal",
        exit: "realeasePointerCapture",
      },
    },
  });
