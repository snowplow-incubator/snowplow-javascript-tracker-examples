import type { Stripe } from "stripe";

export const config = {
  tracking: {
    SNOWPLOW_APP_ID: "next-js-ecommerce-example",
    SNOWPLOW_COLLECTOR_URL: process.env.NEXT_PUBLIC_SNOWPLOW_COLLECTOR_URL,
    /** The ID cookie prefix will be the same for different environments/hosts */
    SNOWPLOW_ID_COOKIE_PREFIX: "_sp_id",
  },
  stripe: {
    SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    /** API version key, check releases at https://github.com/stripe/stripe-node/blob/master/API_VERSION */
    API_VERSION: "2023-08-16" as Stripe.StripeConfig["apiVersion"],
  },
  store: {
    DEFAULT_CURRENCY: "USD",
  },
};
