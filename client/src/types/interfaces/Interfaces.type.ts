// Category Interface
export interface CategoryI {
    id:string,
    name:string,
    imageUrl:string,
    link:string,
    description?:string
}

// Featured Product Interface

export interface FeaturedProductI {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // for discount
  imageSrc: string;
  imageAlt: string;
  href: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Product Interface

export interface ProductI {
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