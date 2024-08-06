import type { Stripe } from "stripe";
import { snowplowTracker } from ".";
import { Product } from "@/types/product";
import {
  SelfDescribingJson,
  buildSelfDescribingEvent,
} from "@snowplow/node-tracker";
import {
  createProduct,
  createSnowplowEcommerceAction,
  createTransaction,
} from "@/lib/tracking/snowplow";

export function trackSnowplowTransaction({
  session,
}: {
  session: Stripe.Checkout.Session;
}) {
  /* Metadata added on checkout_session when the Stripe session starts. */
  const { cartProducts, snowplowIdCookie } = session.metadata as Record<
    string,
    string
  >;

  const snowplowIdCookieValues = snowplowIdCookie.split(".");
  const domainUserId = snowplowIdCookieValues[0];
  const sessionId = snowplowIdCookieValues[5];
  snowplowTracker.setDomainUserId(domainUserId);
  snowplowTracker.setSessionId(sessionId);

  if (session.status === "complete" && session.payment_status === "paid") {
    const products: Product[] = JSON.parse(cartProducts);

    const currency = session.currency || "EUR";
    const totalQuantity =
      session.line_items?.data.reduce(
        (accum, lineItem) => lineItem.quantity || 1 + accum,
        0
      ) || 0;

    const productContexts = products.map((product) =>
      createProduct({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: product.quantityInCart,
        size: product.size,
        variant: product.variant,
        brand: product.brand,
        currency,
        creative_id: product.imgSrc,
      })
    ) as unknown as SelfDescribingJson<Record<string, unknown>>[];

    snowplowTracker.track(
      // Fix to node.js compatible tracking function when snowtype allows multiple configuration file generation in the same codebase
      // After that, create an event spec that is the backend transaction.
      buildSelfDescribingEvent({
        event: createSnowplowEcommerceAction({
          type: "transaction",
        }) as unknown as SelfDescribingJson<Record<string, unknown>>,
      }),
      [
        createTransaction({
          transaction_id: session.id,
          revenue: (session.amount_total as number) / 100,
          currency,
          payment_method: "card", //could be retrieved from PI if further options,
          total_quantity: totalQuantity,
          tax: (session.total_details?.amount_tax || 0) / 100,
          shipping: (session.total_details?.amount_shipping || 0) / 100,
        }) as unknown as SelfDescribingJson<Record<string, unknown>>,
        /* Product contexts */
        ...productContexts,
      ]
    );
  }
}
