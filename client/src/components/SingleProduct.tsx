"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getProductById, allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCart } from "@/store/UseCard";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function SingleProduct() {
  const params = useParams();
  const id = params.id as string;
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const product = getProductById(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!product)
    return <div className="p-20 text-center text-xl font-semibold">Product not found</div>;

  if (!mounted) return null;

  const cartItem = items.find((item) => item.product._id === id);

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Shopping</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* IMAGE SECTION */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex md:flex-col w-full md:w-24 gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={cn(
                    "border-2 rounded-xl overflow-hidden relative h-20 w-20 md:w-full flex-shrink-0 transition-all duration-300",
                    currentImageIndex === idx
                      ? "border-primary ring-4 ring-primary/10"
                      : "border-transparent hover:border-muted",
                  )}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} thumbnail ${idx + 1}`} 
                    fill
                    className="object-cover" 
                  />
                </button>
              ))}
            </div>
            <div className="flex-1 relative aspect-[4/5] bg-muted/20 rounded-3xl overflow-hidden border order-1 md:order-2 shadow-inner">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-primary/5 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-primary/10">
                {product.category}
              </div>
              <h1 className="heading-lg font-black tracking-tighter text-foreground">{product.name}</h1>
              <p className="text-muted-foreground leading-relaxed text-xl border-l-4 border-primary/20 pl-6 py-2">
                &quot;{product.description}&quot;
              </p>
            </div>

            <div className="flex items-center gap-8">
              <span className="text-5xl font-black text-primary tracking-tighter">${product.price}</span>
              <div className="h-12 w-[2px] bg-muted/50 rounded-full"></div>
              {product.stock > 0 ? (
                <div className="flex flex-col">
                  <span className="text-green-600 text-xs font-black uppercase tracking-widest mb-1">Stock Status</span>
                  <span className="text-sm font-bold bg-green-50 text-green-700 px-3 py-1 rounded-lg">Available ({product.stock})</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-red-600 text-xs font-black uppercase tracking-widest mb-1">Stock Status</span>
                  <span className="text-sm font-bold bg-red-50 text-red-700 px-3 py-1 rounded-lg">Sold Out</span>
                </div>
              )}
            </div>

            <div className="space-y-6 pt-4">
              {cartItem ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-primary/5 border-2 border-primary/10 p-6 rounded-3xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border-2 border-primary/20 rounded-full bg-background shadow-lg overflow-hidden ring-4 ring-primary/5">
                        <Button
                          variant="ghost"
                          className="h-14 w-14 rounded-none hover:bg-primary/5 transition-colors"
                          onClick={() => updateQuantity(product._id, cartItem.quantity - 1)}
                        >
                          <Minus size={20} />
                        </Button>
                        <span className="w-14 text-center font-black text-2xl">{cartItem.quantity}</span>
                        <Button 
                          variant="ghost" 
                          className="h-14 w-14 rounded-none hover:bg-primary/5 transition-colors"
                          onClick={() => updateQuantity(product._id, cartItem.quantity + 1)}
                        >
                          <Plus size={20} />
                        </Button>
                      </div>
                      <span className="font-bold text-muted-foreground hidden sm:inline">Items in Bag</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10 rounded-full h-14 w-14 border-2 border-destructive/10"
                      onClick={() => removeFromCart(product._id)}
                    >
                      <Trash2 size={24} />
                    </Button>
                  </div>
                  <Button variant="outline" size="lg" className="w-full h-16 rounded-2xl text-lg font-bold border-2 hover:bg-muted/50 transition-all" asChild>
                     <Link href="/">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center border-2 border-muted-foreground/10 rounded-full bg-muted/5 overflow-hidden w-full sm:w-auto shadow-inner">
                    <Button
                      variant="ghost"
                      className="h-16 w-16 rounded-none hover:bg-primary/5 transition-colors"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus size={24} />
                    </Button>
                    <span className="w-16 text-center font-black text-2xl">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      className="h-16 w-16 rounded-none hover:bg-primary/5 transition-colors"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <Plus size={24} />
                    </Button>
                  </div>
                  <Button 
                    size="lg" 
                    className="flex-1 w-full h-16 text-xl font-black rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 gap-4 group"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={28} className="group-hover:rotate-12 transition-transform" />
                    Add To Bag
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 space-y-12">
            <div className="space-y-4">
              <h2 className="heading-md font-black tracking-tighter">You Might Also Like</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
