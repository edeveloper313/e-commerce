// src/lib/mockData.ts
import { faker } from '@faker-js/faker';
import { IProduct } from '@/types/Products.types';

export const generateMockProducts = (count: number): IProduct[] => {
  return Array.from({ length: count }, () => ({
    _id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    category: faker.commerce.department(),
    images: [faker.image.urlLoremFlickr({ category: 'fashion' })],
    stock: faker.number.int({ min: 0, max: 100 }),
  }));
};