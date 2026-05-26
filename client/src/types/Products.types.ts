// client/src/types/index.ts
export interface IProduct {
  _id: string; // MongoDB ki ID
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  createdAt?: string; // Optional field
  updatedAt?: string; // Optional field
}