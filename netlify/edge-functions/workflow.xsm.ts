import { createMachine } from 'https://cdn.skypack.dev/xstate';
const jamonMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEEAKAlA8gNWQYQElMA5AOjxIBUDiBVZdAYgFEA3MAOwBcACARgDaABgC6iUAAcA9rACWXWVI7iQAD0QAWAEwBWUgA4hATgDMGk0f0mA7EOs6dAGhABPRFqFbSWrfetGdK2sNfQ0AXzDnNCxcQhJSAFlmABEiFnZufmExJBBpOQUlFXUEbT1DU3NLGzsHZzcEfT5SEKMtIwA2EyEuk18IqIwcfCIyZAAZSkx0zl5BURV8+UVlXJK+Do7SPiFuvlajEI8tevdPb18df0CbEPCBkA4pCDgVaOG44kWZZaK1xAAtB1TgggaQhBCIRoHGZTAEtA93rFRqQJlNvgUVsVNCdXIg+IdSF19DohPotB19EYekJ7oMYiN4klUpgMb9VqASjCDNSAnwfPsNsC8QgCdZtiYSWSKVSaXSQEjGWQKMRqHQGGzChy1O4mtsjAaHCS+E1rHwQcdSNYPGYOkYNkZbDoOhEIkA */
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
