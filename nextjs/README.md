# Next.js Ecommerce Example

A Next.js ecommerce application showcasing Snowplow Ecommerce tracking, with Stripe.

## Running locally

1. `npm install`

2. Fill the environment variables required in a local env file. A template is  provided in `.env.example`. You can copy this file to `.env.local` and fill in the required values.

| Environment Variable                | Description                                                                                         |
|-------------------------------------|-----------------------------------------------------------------------------------------------------|
| `NEXT_PUBLIC_SNOWPLOW_COLLECTOR_URL` | The URL of your Snowplow collector. If you don't have a Snowplow collector, you can use [Snowplow Micro](https://docs.snowplow.io/docs/testing-debugging/snowplow-micro/) for testing. |
| `STRIPE_SECRET_KEY`                 | Your Stripe secret key. If you don't have a Stripe account, you can create one [here](https://stripe.com/).  |
| `STRIPE_WEBHOOK_SECRET`             | Your Stripe webhook secret. You can find this in your Stripe dashboard.                              |

> [!IMPORTANT]
> `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are required for the application to function correctly.

3. `npm run dev`
