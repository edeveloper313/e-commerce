"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/lib/sanity"; // Sanity Client
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/UseCard";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const Products: React.FC = () => {
  const { items, addToCart, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  // 1. Sanity products ke liye state
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);

    // 2. GROQ Query: Sanity se products mangwana
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        "id": _id,
        name,
        price,
        "imageSrc": image.asset->url,
        "imageAlt": name,
        isNew,
        isBestSeller,
        reviewCount,
        description
      }`;
      const data = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // 3. Cart handle logic ko update kiya (Direct product object pass karein)
  const handleAddToCart = (product: any) => {
    // Hamara UseCard store product._id ya product.id expect karta hai
    // Sanity ke case mein humne query mein "id": _id kar diya hai
    const cartProduct = { ...product, _id: product.id };
    addToCart(cartProduct);
  };

  if (!mounted) return null;

  return (
    <section className="bg-background py-24 border-t border-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section (Same as before) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="heading-lg font-black tracking-tighter text-gray-900">
              The Essentials
            </h2>
            <div className="h-2 w-32 bg-primary rounded-full"></div>
          </div>
          <Link href="/all-products" className="...">
            Explore More
          </Link>
        </div>

        {/* Products Grid - Ab dynamic 'products' array se map ho raha hai */}
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product: any, index: number) => {
            // Cart item check logic
            const cartItem = items.find(
              (item) => item.product._id === product.id,
            );

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col h-full"
              >
                {/* Badges Logic */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {product.isNew && (
                    <span className="bg-green-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-xl">
                      Fresh
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-primary text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-xl">
                      Hot Pick
                    </span>
                  )}
                </div>

                {/* Product Image */}
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-muted/20 relative border border-muted transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 group-hover:-translate-y-2">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      alt={product.imageAlt || product.name}
                      src={product.imageSrc}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>
                </div>

                {/* Info & Price */}
                <div className="mt-8 flex-1 space-y-3 px-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                      <Link href={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-2xl font-black text-primary leading-none tracking-tighter">
                      ${product.price}
                    </p>
                  </div>
                  {/* Rating Placeholder */}
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">★★★★★</span>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                      {product.reviewCount || 0} Reviews
                    </span>
                  </div>
                </div>

                {/* Cart Logic (Plus/Minus or Add Button) */}
                <div className="mt-8 px-2">
                  {cartItem ? (
                    <div className="flex items-center justify-between border-2 border-primary/20 rounded-2xl overflow-hidden bg-primary/5 h-14 w-full">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateQuantity(product.id, cartItem.quantity - 1)
                        }
                      >
                        <Minus size={20} />
                      </Button>
                      <span className="text-sm font-black text-primary">
                        {cartItem.quantity} In Bag
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateQuantity(product.id, cartItem.quantity + 1)
                        }
                      >
                        <Plus size={20} />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full h-14 rounded-2xl font-black gap-3 shadow-xl"
                    >
                      <ShoppingCart size={20} /> Add to Bag
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
