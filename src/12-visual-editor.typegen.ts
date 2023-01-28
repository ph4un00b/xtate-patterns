// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions:
      | "fetchAdstobeShown"
      | "muteMic"
      | "recordUserUnmutes"
      | "recordVideoPauses"
      | "unmuteMic";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    "fetchAdstobeShown": "pause";
    "muteMic": "mute";
    "recordUserUnmutes": "unmute";
    "recordVideoPauses": "pause" | "xstate.stop";
    "unmuteMic": "unmute";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "mic"
    | "mic.muted"
    | "mic.unmuted"
    | "video"
    | "video.paused"
    | "video.running"
    | { "mic"?: "muted" | "unmuted"; "video"?: "paused" | "running" };
  tags: "jamon";
}
