import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";

interface ProductCardProps {
  id: string;
  imgSrc: string;
  name: string;
  category: string;
  price?: string;
  productCardClickCallback?: () => void;
}

export function ProductCard({
  id,
  imgSrc,
  name,
  category,
  price,
  productCardClickCallback = () => ({}),
}: ProductCardProps) {
  function handleClick() {
    productCardClickCallback();
  }

  return (
    <Link href={`/product/${id}`} onClick={handleClick}>
      <figure className={styles.figure}>
        <div>
          <Image width={310} height={370} alt={name} src={imgSrc}></Image>
        </div>
        <div className={styles.description}>
          <div>
            <span className={styles.model}>{name}</span>
            <br />
            <span className={styles.category}>{category}</span>
            <br />
            {price && <span className={styles.price}>{price}</span>}
          </div>
        </div>
      </figure>
    </Link>
  );
}
