import { createMachine } from 'https://cdn.skypack.dev/xstate';
const jamonMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEEAKAlA8gNWQYQElMA5AOmQBkAVTAYgFEA3MAOwBcACARgG0AGALqJQABwD2sAJZtJYlsJAAPRFwBsq0lz4BmPlwAsADgCcxowCY+5gDQgAnokvnS58wHYArG+MfD2t0b6AL5BtmhYuIQkpACy9AAiRAzM7Nz8Qkgg4lIycgrKCPrmHqSGfMba+trGfm58nh62DgiGXKRGxubGqro92u4hYRg4+ERkeCRUBMQAqsjoyaycvIIK2dKy8pkFRSVlFVU1-vUejfaOVi7uXj61gSGhICxiEHAK4SNRxGsSG3nbiAAtKomkCNHwIRDzKoAh5utoPOZBiAPpExuRqJgfjlNvlEEVQQguGZSD1DB4+IZoSY+Ko+MFHqjRtE4oksZl1rktqACqdtKVjOUPFxXAY1CDzkTjG5NNpyZTqYK6QyhhFmeNJtM5uhsX9uUpHK1NKYfL5ha03FxCU5SG5LJVVMY1NK+B5VA8gkA */
  id: "APROVACION",

  tsTypes: {} as import("./workflow.xsm.typegen").Typegen0,

  schema: {
    events: {} as { type: 'eventType' },
  },


  states: {
    ALTO: {
      on: {
        "Event 1": "CONTINUAR"
      }
    },
    MEDIO: {
      on: {
        "Event 1": "ALTO"
      }
    },
    CONTINUAR: {
      on: {
        "Event 1": "MEDIO"
      }
    }
  }
});

export default async function handler() {
  return new Response("edge!")
}
