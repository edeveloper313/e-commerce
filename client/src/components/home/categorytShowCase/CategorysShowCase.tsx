import React from "react";
import { categories } from "@/types/data/Categorys.data";
import { CategoryI } from "@/types/interfaces/Interfaces.type";

import Image from "next/image";

const CategoryShowcase: React.FC = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-xl:text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {categories.map((category: CategoryI) => (
            <a
              key={category.id}
              href={category.link}
              className="relative group rounded-3xl overflow-hidden cursor-pointer block"
            >
              <div className="relative w-full h-64 overflow-hidden rounded-2xl">
                <Image
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <h3 className="text-white text-xl font-bold">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-white/80 text-sm mt-1">
                    {category.description}
                  </p>
                )}
                <span className="inline-block mt-2 text-indigo-300 text-sm font-medium group-hover:text-indigo-200 transition">
                  Shop Now →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
