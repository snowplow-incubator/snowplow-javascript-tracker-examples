import { newTracker } from "@snowplow/node-tracker";

export const expressTracker = newTracker(
  {
    namespace: "myTracker",
    appId: "myApp",
    encodeBase64: false,
  },
  {
    customEmitter: () => ({
      input: (payload) => {
        return Promise.resolve();
      },
      flush: () => {
        return Promise.resolve();
      },
      setCollectorUrl: (url) => {},
      setAnonymousTracking: (anonymous) => {},
      setBufferSize: (bufferSize) => {},
    }),
  }
);
