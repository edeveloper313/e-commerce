import { create } from 'zustand';
import { ProductI } from '@/types/interfaces/Interfaces.type';

interface CartState {
  items: ProductI[];
  addToCart: (product: ProductI) => void;
  removeFromCart: (id: string) => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addToCart: (product) => set((state) => ({ items: [...state.items, product] })),
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((item) => item._id !== id)
  })),
}));