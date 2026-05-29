"use client";

import React, { useState, useEffect } from "react";
import { FeaturedProductI } from "@/types/interfaces/Interfaces.type";
import { featuredProductsD } from "@/types/data/Featured.data";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/UseCard";
import { allProducts } from "@/lib/mockData";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const FeaturedProducts: React.FC = () => {
  const { items, addToCart, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (featuredProduct: FeaturedProductI) => {
    const product = allProducts.find(p => p._id === featuredProduct.id);
    if (product) {
      addToCart(product);
    }
  };

  if (!mounted) return null;

  return (
    <section className="bg-background py-24 border-t border-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="heading-lg font-black tracking-tighter text-gray-900">
              The Essentials
            </h2>
            <div className="h-2 w-32 bg-primary rounded-full"></div>
          </div>
          <Link
            href="/home"
            className="group flex items-center gap-3 text-primary font-black uppercase tracking-widest hover:text-primary/80 transition-colors text-sm"
          >
            Explore More
            <span className="bg-primary/5 p-2 rounded-full group-hover:translate-x-1 transition-transform border border-primary/10">→</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProductsD.map((product: FeaturedProductI, index: number) => {
            const cartItem = items.find((item) => item.product._id === product.id);
            
            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col h-full"
              >
                {/* Badge (New/Best Seller) */}
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
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>
                  {/* Quick Link Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-sm w-full py-3 rounded-2xl text-center text-xs font-black uppercase tracking-widest text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                      Quick View
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-8 flex-1 space-y-3 px-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                      <Link href={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-2xl font-black text-primary leading-none tracking-tighter">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400 gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-xs">★</span>
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                      {product.reviewCount} Verified Reviews
                    </span>
                  </div>
                </div>

                {/* Cart Action Button */}
                <div className="mt-8 px-2">
                  {cartItem ? (
                    <div className="flex items-center justify-between border-2 border-primary/20 rounded-2xl overflow-hidden bg-primary/5 h-14 w-full animate-in zoom-in duration-500 shadow-inner">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full w-14 rounded-none hover:bg-primary/10 text-primary transition-colors"
                        onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                      >
                        <Minus size={20} />
                      </Button>
                      <span className="text-sm font-black text-primary uppercase tracking-tighter">
                        {cartItem.quantity} In Bag
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full w-14 rounded-none hover:bg-primary/10 text-primary transition-colors"
                        onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                      >
                        <Plus size={20} />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full h-14 rounded-2xl font-black gap-3 shadow-xl shadow-primary/10 transition-all hover:scale-[1.02] active:scale-95 group/btn uppercase tracking-widest text-xs"
                    >
                      <ShoppingCart size={20} className="group-hover/btn:rotate-12 transition-transform" />
                      Add to Bag
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

export default FeaturedProducts;
