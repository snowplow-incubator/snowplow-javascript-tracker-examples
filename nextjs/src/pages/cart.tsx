import { Cart } from "@/components/cart";
import Head from "next/head";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Snowplow Shoes</title>
        <meta name="description" content="Snowplow shoes app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Cart />
    </>
  );
}
