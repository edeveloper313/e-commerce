"use client";

import React, { useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity"; // Sanity client import karein
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

const CategoryShowcase: React.FC = () => {
  // 1. State banayein categories store karne ke liye
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // 2. GROQ Query likhein data mangwane ke liye
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{
        "id": _id,
        name,
        "slug": slug.current,
        description,
        "imageUrl": image.asset->url
      }`;
      const data = await client.fetch(query);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section (Wahi rahega jo aapka tha) */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {categories.map((category: any, index: number) => (
            <motion.div
              key={category.id}
              // ... animations ...
            >
              {/* 3. Link ko dynamic banayein category slug ke mutabiq */}
              <Link
                href={`/category/${category.slug}`} 
                className="group relative flex flex-col items-center text-center space-y-6"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-[2.5rem] ...">
                  <Image
                    className="object-cover ..."
                    src={category.imageUrl} // Sanity ki image URL
                    alt={category.name}
                    fill
                  />
                  {/* ... View All button ... */}
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black ...">{category.name}</h3>
                  <p className="text-muted-foreground ...">{category.description}</p>
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