"use client";

import React from "react";
import { categories } from "@/types/data/Categorys.data";
import { CategoryI } from "@/types/interfaces/Interfaces.type";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

const CategoryShowcase: React.FC = () => {
  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="heading-lg font-black tracking-tighter text-gray-900">
              Browse Categories
            </h2>
            <div className="h-2 w-32 bg-primary rounded-full"></div>
          </div>
          <p className="text-muted-foreground max-w-md text-lg font-medium leading-relaxed italic border-l-4 border-primary/10 pl-6">
            Find exactly what you need with our curated collections of premium goods.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {categories.map((category: CategoryI, index: number) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={category.link}
                className="group relative flex flex-col items-center text-center space-y-6"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 border-4 border-transparent group-hover:border-primary/10">
                  <Image
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                    <span className="bg-white text-black px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-xl">
                      View All
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider">
                      {category.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
