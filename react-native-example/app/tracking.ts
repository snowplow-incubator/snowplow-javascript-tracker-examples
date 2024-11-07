import { newTracker } from "@snowplow/react-native-tracker";

export async function getTracker() {
  return await newTracker({
    namespace: "sp1",
    appId: "my-app",
    endpoint: "http://0.0.0.0:9090",
  });
}

export async function trackPageView() {
    const tracker = await getTracker();
    tracker.trackPageViewEvent({
        pageUrl: "https://snowplow.io",
        pageTitle: "My Page"
    });
}

export async function trackStructEvent() {
    const tracker = await getTracker();
    tracker.trackStructuredEvent({
        category: "cat",
        action: "act",
        label: "lbl"
    });
}
