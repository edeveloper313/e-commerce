"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { allProducts } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";

const CategoryPage = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const params = useParams();
  const slug = params.slug as string;

  const products = allProducts.filter(
    (p) => p.category.toLowerCase() === slug.toLowerCase(),
  );

  if (!mounted) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        Category {slug.replace("-", " ")}
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 italic">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
