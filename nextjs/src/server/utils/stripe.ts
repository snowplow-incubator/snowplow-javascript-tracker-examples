import { config } from "@/config";
import { Product } from "@/types/product";
import type { Stripe } from "stripe";

export function productsToStripeLineItems(
  products: Product[]
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return products.map((product: Product) => ({
    quantity: product.quantityInCart,
    price_data: {
      currency: config.store.DEFAULT_CURRENCY,
      product_data: { name: product.name },
      /* Stripe expects price without decimal dot/comm e.g. 10.24 should be 1024  */
      unit_amount: Math.round(product.price * 100),
    },
  }));
}
