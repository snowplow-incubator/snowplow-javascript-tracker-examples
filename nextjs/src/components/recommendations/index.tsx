import { mockProducts } from "@/mocks/products";
import { ProductCard } from "../productCard";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { config } from "@/config";
import {
  trackProductListClickSpec,
  trackProductListViewSpec,
} from "@/lib/tracking/snowplow";

interface RecommendationsProps {
  containerClass?: string;
  title?: string;
}

export function Recommendations({
  containerClass,
  title = "You might also be interested in",
}: RecommendationsProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    /* Get random products */
    const shuffled = mockProducts.sort(() => 0.5 - Math.random());
    setSelectedProducts(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    const productFormatToTrack = selectedProducts.map((product, idx) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      position: idx,
      variant: product.variant,
      creative_id: product.imgSrc,
      size: product.size,
      currency: config.store.DEFAULT_CURRENCY,
    }));

    trackProductListViewSpec({
      products: productFormatToTrack,
      name: title,
    });
  }, []);

  function handleRecommendedProductClick(product: Product, index: number) {
    trackProductListClickSpec({
      product: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        position: index,
        variant: product.variant,
        creative_id: product.imgSrc,
        size: product.size,
        currency: config.store.DEFAULT_CURRENCY,
      },
      name: title,
    });
  }

  return (
    <div className={clsx(styles.recommendationsContainer, containerClass)}>
      <div className={styles.recommendationsTitle}>
        <span>{title}</span>
      </div>
      <div className={styles.recommendations}>
        {selectedProducts &&
          selectedProducts.map((recommdendedProduct, idx) => (
            <ProductCard
              id={recommdendedProduct.id}
              key={recommdendedProduct.id}
              name={recommdendedProduct.name}
              imgSrc={recommdendedProduct.imgSrc}
              category={recommdendedProduct.category}
              productCardClickCallback={() =>
                handleRecommendedProductClick(recommdendedProduct, idx)
              }
            />
          ))}
      </div>
    </div>
  );
}
