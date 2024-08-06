import Stripe from "stripe";
import { readableToBuffer } from "@/server/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { config as appConfig } from "@/config";
import { trackSnowplowTransaction } from "@/server/lib/snowplow";
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(appConfig.stripe.SECRET_KEY as string, {
  apiVersion: appConfig.stripe.API_VERSION,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"] as string;

    const buf = await readableToBuffer(req);
    const rawBody = buf.toString("utf8");

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        appConfig.stripe.WEBHOOK_SECRET as string
      );
    } catch (err) {
      // @ts-ignore
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    try {
      switch (event.type) {
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;

          const session: Stripe.Checkout.Session =
            await stripe.checkout.sessions.retrieve(checkoutSession.id, {
              expand: ["line_items"],
            });

          trackSnowplowTransaction({ session });

          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      // @ts-ignore
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
