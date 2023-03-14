
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
    '@@xstate/typegen': true;
    internalEvents: {
        "": { type: "" };
        "xstate.init": { type: "xstate.init" };
        "xstate.stop": { type: "xstate.stop" };
    };
    invokeSrcNameMap: {

    };
    missingImplementations: {
        actions: "realeasePointerCapture" | "setPointerCapture";
        delays: never;
        guards: "ctx.width < 100px" | "ctx.width >= 100px";
        services: never;
    };
    eventsCausingActions: {
        "realeasePointerCapture": "pointercancel" | "pointerup" | "xstate.stop";
        "setPointerCapture": "pointerdown";
    };
    eventsCausingDelays: {

    };
    eventsCausingGuards: {
        "ctx.width < 100px": "";
        "ctx.width >= 100px": "";
    };
    eventsCausingServices: {

    };
    matchesStates: "dragging" | "dragging.collapsed" | "dragging.normal" | "idle" | { "dragging"?: "collapsed" | "normal"; };
    tags: never;
}
