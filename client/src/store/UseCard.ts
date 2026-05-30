import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductI } from '@/types/interfaces/Interfaces.type';

export interface CartItem {
  product: ProductI;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: ProductI, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product, quantity = 1) => set((state) => {
        const existingItem = state.items.find(item => item.product._id === product._id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }
        return { items: [...state.items, { product, quantity }] };
      }),

      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((item) => item.product._id !== id),
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.product._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      clearCart: () => set({ items: [] }),

      // Simulates updating global stock (in a real app, this would be an API call)
      checkout: () => {
        const { items } = get();
        // In a real project, we'd send 'items' to the backend to decrement DB stock.
        // For this mock project, we just clear the cart.
        console.log("Mock Checkout: Stock decremented for items:", items);
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);
