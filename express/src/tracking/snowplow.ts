import { tracker, gotEmitter, HttpProtocol } from "@snowplow/node-tracker";

const emitter = gotEmitter("0.0.0.0", HttpProtocol.HTTPS, 9090);

export const expressTracker = tracker(emitter, "myTracker", "myApp", false);
