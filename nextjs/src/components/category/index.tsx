import { mockProducts } from "@/mocks/products";
import { Checkbox } from "../checkbox";
import { ProductCard } from "../productCard";
import styles from "./index.module.scss";
import { BsFilter } from "react-icons/bs";
import { Product } from "@/types/product";
import { useEffect } from "react";
import { config } from "@/config";
import {
  trackProductListClickSpec,
  trackProductListViewSpec,
} from "@/lib/tracking/snowplow";

interface CategoryProps {
  products?: Product[];
  categoryName?: string;
}

export function Category({
  products = mockProducts,
  categoryName = "All shoes",
}: CategoryProps) {
  useEffect(() => {
    const productFormatToTrack = products.map((product, idx) => ({
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
      name: categoryName,
    });
  }, []);

  function handleCategoryProductClick(product: Product, index: number) {
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
      name: categoryName,
    });
  }

  return (
    <div className={styles.categoryPage}>
      <div>
        <header className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>
              {categoryName} ({products.length})
            </h1>
            <nav>
              <button className={styles.hideFilters}>
                <span>Hide filters</span>
                <BsFilter />
              </button>
            </nav>
          </div>
        </header>
      </div>
      <div className={styles.categoryContent}>
        <div className={styles.categoryFilter}>
          <div className={styles.filterContainer}>
            <div className={styles.categoriesFilter}>
              <button>Adult</button>
              <button>Kid&#39;s</button>
              <button>Adolescent</button>
            </div>
            <div className={styles.checksFilters}>
              <div className={styles.filterTitle}>
                <span>Shoe height</span>
              </div>
              <Checkbox label="Low profile" />
              <Checkbox label="Mid profile" />
              <Checkbox label="High profile" />
            </div>
            <div className={styles.checksFilters}>
              <div className={styles.filterTitle}>
                <span>Sports</span>
              </div>
              <Checkbox label="Running" />
              <Checkbox label="Lifestyle" />
              <Checkbox label="Basketball" />
            </div>
          </div>
        </div>
        <div className={styles.productGrid}>
          {products.map((product, idx) => (
            <div className={styles.product} key={product.id}>
              <div className={styles.productCard}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  imgSrc={product.imgSrc}
                  category={product.category}
                  price={`$${product.price}`}
                  productCardClickCallback={() =>
                    handleCategoryProductClick(product, idx)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
