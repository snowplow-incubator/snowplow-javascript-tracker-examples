import Stripe from "stripe";
import { config } from "@/config";
import { NextApiRequest, NextApiResponse } from "next";
import { productsToStripeLineItems } from "@/server/utils/stripe";
import { getSnowplowCookieValue } from "@/server/lib/snowplow/utils";

const stripe = new Stripe(config.stripe.SECRET_KEY as string, {
  apiVersion: config.stripe.API_VERSION,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { cartProducts, cartId } = req.body;
    const lineItems = productsToStripeLineItems(cartProducts);
    const snowplowIdCookie = getSnowplowCookieValue(req.cookies);

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {
          cartProducts: JSON.stringify(cartProducts),
          snowplowIdCookie,
          cartId,
        },
      });

      res.json({ url: session.url, session: session });
    } catch (err) {
      // @ts-ignore
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
