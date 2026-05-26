import { create } from 'zustand';
import { IProduct } from '@/types/Products.types';

interface CartState {
  items: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addToCart: (product) => set((state) => ({ items: [...state.items, product] })),
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((item) => item._id !== id)
  })),
}));