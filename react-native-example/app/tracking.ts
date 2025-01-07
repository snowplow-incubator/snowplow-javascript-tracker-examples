import { newTracker, ReactNativeTracker } from "@snowplow/react-native-tracker";
import { SnowplowEcommercePlugin, trackProductView, trackTransaction } from "@snowplow/browser-plugin-snowplow-ecommerce";

let tracker: ReactNativeTracker | undefined;
export async function getTracker() {
  if (tracker) {
    return tracker;
  }
  tracker = await newTracker({
    namespace: "sp1",
    appId: "my-app",
    appVersion: "0.1.0",
    endpoint: "http://0.0.0.0:9090",
    installAutotracking: true,
    plugins: [SnowplowEcommercePlugin()],
  });
  return tracker;
}

export async function trackScreenView(name: string) {
  const tracker = await getTracker();
  tracker.trackScreenViewEvent({ name });
}

export async function trackPageView() {
  const tracker = await getTracker();
  tracker.trackPageViewEvent({
    pageUrl: "https://snowplow.io",
    pageTitle: "My Page",
  });
}

export async function trackStructEvent() {
  const tracker = await getTracker();
  tracker.trackStructuredEvent({
    category: "cat",
    action: "act",
    label: "lbl",
  });
}

export async function trackScrollChanged() {
  const tracker = await getTracker();
  tracker.trackScrollChangedEvent({
    yOffset: 100,
    xOffset: 200,
  });
}

export function trackProductViewEvent() {
    trackProductView({
        id: "product-1",
        price: 100,
        currency: "USD",
        name: "Product 1",
        category: "Category 1",
    })
}

export function trackTransactionEvent() {
    trackTransaction({
      currency: "USD",
      transaction_id: "transaction-1",
      revenue: 500,
      payment_method: "Visa",
      products: [
        {
          id: "product-1",
          price: 100,
          quantity: 1,
          currency: "USD",
          category: "Category 1",
        },
        {
          id: "product-2",
          price: 200,
          quantity: 2,
          currency: "USD",
          category: "Category 2",
        },
      ],
    });
}
