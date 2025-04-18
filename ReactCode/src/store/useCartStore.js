import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => ({
          cart: [...state.cart, product],
        })),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== productId),
        })),

      clearCart: () => {
        set({ cart: [] });
        localStorage.removeItem("dronehub-cart");
      },
    }),
    {
      name: "dronehub-cart",
    }
  )
);
