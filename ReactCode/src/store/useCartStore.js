import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item._id === product._id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
            };
          }
        }),

      removeFromCart: (productId) =>
        set((state) => {
          const existing = state.cart.find((item) => item._id === productId);
          if (existing && existing.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item._id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: state.cart.filter((item) => item._id !== productId),
            };
          }
        }),

      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => {
          const existing = state.cart.find((item) => item._id === productId);
          if (existing?.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item._id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: state.cart.filter((item) => item._id !== productId),
            };
          }
        }),

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
