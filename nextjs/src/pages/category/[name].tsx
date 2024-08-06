import { Category } from "@/components/category";
import { mockProducts } from "@/mocks/products";
import Head from "next/head";
import { useRouter } from "next/router";

export default function CategoryPage() {
  const {
    query: { name },
  } = useRouter();

  const products = mockProducts.filter(
    (product) => name === product.category.toLowerCase().split(" ").join("-")
  );

  if (!products.length) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`Snowplow shoes: ${name}`}</title>
        <meta name="description" content={`Snowplow shoes: ${name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Category categoryName={products[0].category} products={products} />
    </>
  );
}
