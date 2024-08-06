import { Category } from "@/components/category";
import { mockProducts } from "@/mocks/products";
import { trackSiteSearch } from "@snowplow/browser-plugin-site-tracking";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SearchPage() {
  const {
    query: { q: searchTerm },
  } = useRouter();

  const productRegex = new RegExp((searchTerm as string) || "", "i");
  const products = mockProducts.filter((product) =>
    product.name.match(productRegex)
  );

  useEffect(() => {
    trackSiteSearch({
      terms: ["q"],
      filters: { name: searchTerm as string },
      totalResults: products.length,
    });
  }, [searchTerm, products.length]);

  return (
    <>
      <Head>
        <title>Snowplow shoes search</title>
        <meta name="description" content="Snowplow shoes search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Category
        categoryName={`Search results '${searchTerm}'`}
        products={products}
      />
    </>
  );
}
