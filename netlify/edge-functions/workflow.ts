import { createMachine } from "https://cdn.skypack.dev/xstate"

const nameOfMachine = createMachine({
	id: 'nameOf',
	tsTypes: {} as import("./workflow.typegen").Typegen0,
	schema: {
		context: {} as { contextType },
		events: {} as { type: 'eventType' },
	},
	initial: 'initialState',
	states: {
		initialState: {},
	},
});

export default async function handler() {
	return new Response("hello from the edge!");
}
