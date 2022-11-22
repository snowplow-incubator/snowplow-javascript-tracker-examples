import { tracker, gotEmitter, HttpProtocol, HttpMethod } from "@snowplow/node-tracker";

const emitter = gotEmitter(
  "0.0.0.0",
  HttpProtocol.HTTPS,
  9090,
  HttpMethod.POST,
  1, // buffer size – 1 means that each event is sent right away, without buffering
  5,
  undefined,
  function (error, response) {
    // Callback called for each request
    if (error) {
      console.log(error, "Request error");
    } else {
      console.log("Event Sent");
    }
  }
);

export const expressTracker = tracker(emitter, "myTracker", "myApp", false);
