export type Product = {
  id: string;
  price: number;
  category: string;
  name: string;
  size: string;
  variant: string;
  imgSrc: string;
  brand: string;
  /** Added through the cart store. */
  quantityInCart?: number;
};
