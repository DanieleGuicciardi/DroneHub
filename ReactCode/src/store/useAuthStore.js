import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./useCartStore";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: (email) => set({ user: { email } }),

      logout: () => {
        console.log("Logging out and clearing cart");
        useCartStore.getState().clearCart(); 
        set({ user: null }); 
        localStorage.removeItem("dronehub-auth");
      },
    }),
    {
      name: "dronehub-auth",
    }
  )
);
