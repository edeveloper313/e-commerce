// src/lib/mockData.ts
import { faker } from '@faker-js/faker';
import { ProductI } from '@/types/interfaces/Interfaces.type';

// Set a seed for faker to ensure consistency between server and client
faker.seed(123);

// Predefined products to ensure consistent IDs and data for testing
const fixedProducts: ProductI[] = [
  {
    _id: "midnight-oud",
    name: "Midnight Oud Perfume",
    description: "A deep, mysterious fragrance with notes of agarwood, rose, and amber. Perfect for evening wear.",
    price: 89.99,
    category: "Perfume",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop"],
    stock: 25,
  },
  {
    _id: "chronograph-watch",
    name: "Chronograph Rose Gold Watch",
    description: "Elegant rose gold watch with a precision chronograph movement and premium leather strap.",
    price: 199.99,
    category: "Watches",
    images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop"],
    stock: 12,
  },
  {
    _id: "silver-ring",
    name: "Diamond Cut Silver Ring",
    description: "Handcrafted 925 sterling silver ring with a sophisticated diamond-cut pattern.",
    price: 149.99,
    category: "Jewelry",
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop"],
    stock: 5,
  },
  {
    _id: "aviator-glasses",
    name: "Polarized Aviator Sunglasses",
    description: "Classic aviator style with high-quality polarized lenses for maximum UV protection and clarity.",
    price: 79.99,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop"],
    stock: 50,
  },
  {
    _id: "leather-bag",
    name: "Leather Messenger Bag",
    description: "Genuine full-grain leather messenger bag, designed to carry your laptop and essentials in style.",
    price: 129.99,
    category: "Bags",
    images: ["https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=600&fit=crop"],
    stock: 15,
  },
  {
    _id: "cufflinks",
    name: "Sapphire Cufflinks Set",
    description: "Sophisticated sapphire blue cufflinks that add a touch of class to any formal attire.",
    price: 59.99,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1617038260891-97778c2e6e5a?w=600&h=600&fit=crop"],
    stock: 8,
  }
];

// Generate additional random products with deterministic values
const generatedProducts: ProductI[] = Array.from({ length: 44 }, (_, i) => {
  const name = faker.commerce.productName();
  const category = faker.helpers.arrayElement(["Perfume", "Watches", "Jewelry", "Accessories", "Bags"]);
  return {
    _id: `random-${i}`,
    name: name,
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    category: category,
    images: [`https://loremflickr.com/640/480/fashion?lock=${i}`], // Use lock for consistent images
    stock: faker.number.int({ min: 0, max: 100 }),
  };
});

export const allProducts: ProductI[] = [...fixedProducts, ...generatedProducts];

export const getProductById = (id: string): ProductI | undefined => {
  return allProducts.find(p => p._id === id);
};

export const generateMockProducts = (count: number): ProductI[] => {
  return allProducts.slice(0, count);
};
