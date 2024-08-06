import { Home } from "@/components/home";
import Head from "next/head";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>Snowplow shoes</title>
        <meta name="description" content="Snowplow shoes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Home />
    </>
  );
}
