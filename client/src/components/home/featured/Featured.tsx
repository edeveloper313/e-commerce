"use client";

import React from "react";
import { FeaturedProductI } from "@/types/interfaces/Interfaces.type";
import { featuredProductsD } from "@/types/data/Featured.data";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/UseCard";
import { allProducts } from "@/lib/mockData";

const FeaturedProducts: React.FC = () => {
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = (featuredProduct: FeaturedProductI) => {
    // Find the actual product object from mockData to maintain consistency
    const product = allProducts.find(p => p._id === featuredProduct.id);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <Link
              href="/home"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              View All →
            </Link>
          </div>

          {/* Products Grid */}
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProductsD.map((product: FeaturedProductI) => (
              <div key={product.id} className="group relative">
                {/* Badge (New/Best Seller) */}
                <div className="absolute top-2 left-2 z-10 flex gap-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 font-semibold">
                      <Link href={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    {/* Rating Stars (simple) */}
                    <div className="mt-1 flex items-center">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-gray-400 text-sm ml-1">★</span>
                      <span className="ml-1 text-xs text-gray-500">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                    {product.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">
                        ${product.originalPrice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Add Button (hover pe show) */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-indigo-500 focus:outline-none"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
