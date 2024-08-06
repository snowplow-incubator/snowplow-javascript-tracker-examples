import { Category } from "@/components/category";
import Head from "next/head";

export default function CategoryPage() {
  return (
    <>
      <Head>
        <title>Snowplow shoes category</title>
        <meta name="description" content="Snowplow shoes category" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Category />
    </>
  );
}
