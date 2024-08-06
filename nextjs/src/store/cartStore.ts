import { Product } from "@/types/product";
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

type CartStore = {
  cartProducts: Product[];
  totalAmount: number;
  numberOfProducts: number;
  addProductToCart: (product: Product) => void;
  clearCart: VoidFunction;
  cartId: string;
};

const useCartStore = create<CartStore>((set) => ({
  cartProducts: [],
  totalAmount: 0,
  numberOfProducts: 0,
  cartId: uuidv4(),
  addProductToCart: (product) => {
    set((state) => {
      const alreadyAdded = state.cartProducts.find(
        (entry) => entry.name === product.name
      );

      if (alreadyAdded && alreadyAdded.quantityInCart) {
        alreadyAdded.quantityInCart += 1;
        return {
          ...state,
          totalAmount: state.totalAmount + product.price,
          numberOfProducts: state.numberOfProducts + 1,
        };
      }

      product.quantityInCart = 1;
      return {
        ...state,
        cartProducts: [...state.cartProducts, product],
        totalAmount: state.totalAmount + product.price,
        numberOfProducts: state.numberOfProducts + 1,
      };
    });
  },
  clearCart: () =>
    set((state) => ({
      ...state,
      cartProducts: [],
      totalAmount: 0,
      numberOfProducts: 0,
      cartId: uuidv4(),
    })),
}));

export { useCartStore };
