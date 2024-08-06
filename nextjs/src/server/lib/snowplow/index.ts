import { config } from "@/config";
import {
  tracker,
  gotEmitter,
  HttpProtocol,
  HttpMethod,
} from "@snowplow/node-tracker";

if (!config.tracking.SNOWPLOW_COLLECTOR_URL) {
  throw "No Snowplow collector URL configured.";
}

const snowplowCollector = new URL(config.tracking.SNOWPLOW_COLLECTOR_URL);

const emitter = gotEmitter(
  snowplowCollector.hostname,
  snowplowCollector.protocol.slice(0, -1) as HttpProtocol,
  Number(snowplowCollector.port),
  HttpMethod.POST,
  0
);

export const snowplowTracker = tracker(
  [emitter],
  "sp",
  config.tracking.SNOWPLOW_APP_ID,
  false
);

export * from "./trackSnowplowTransaction";
