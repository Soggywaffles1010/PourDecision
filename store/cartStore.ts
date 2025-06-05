import { create } from 'zustand';

type CartItem = {
  id: string;
  title: string;
  price: string;
  media: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((p) => p.id === item.id);
      if (exists) return state; // avoid duplicates
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cart: [] }),
}));
