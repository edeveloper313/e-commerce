"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, Filter, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const CategoryPage = () => {
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "low-to-high" | "high-to-low">("default");
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const params = useParams();
  const slug = params.slug as string;

  // Filter products by category slug
  const filteredProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === slug.toLowerCase() || 
           p.category.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    return 0;
  });

  if (!mounted) return null;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h1 className="heading-lg font-black tracking-tighter uppercase text-gray-900">
              {slug.replace("-", " ")}
            </h1>
            <div className="h-1.5 w-24 bg-primary rounded-full"></div>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
              Showing {sortedProducts.length} Premium Essentials
            </p>
          </div>
          
          {/* SORTING CONTROLS */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full border-2 font-black uppercase tracking-widest text-[10px] h-12 px-6 gap-2">
                  <SlidersHorizontal size={14} />
                  Sort By: {sortBy === "default" ? "Featured" : sortBy === "low-to-high" ? "Price: Low to High" : "Price: High to Low"}
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-2 shadow-xl">
                <DropdownMenuItem onClick={() => setSortBy("default")} className="rounded-xl font-bold uppercase tracking-widest text-[10px] p-3">
                  Featured
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("low-to-high")} className="rounded-xl font-bold uppercase tracking-widest text-[10px] p-3">
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("high-to-low")} className="rounded-xl font-bold uppercase tracking-widest text-[10px] p-3">
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* SIDEBAR FILTER (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="bg-muted/10 border-2 border-muted/50 rounded-[2.5rem] p-8 sticky top-32 space-y-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Filter size={20} className="text-primary" />
                <h3 className="text-xl font-black tracking-tighter uppercase">Filter By</h3>
              </div>
              
              <Separator className="bg-muted-foreground/10" />

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Price Sorting</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setSortBy("low-to-high")}
                    className={`text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${sortBy === "low-to-high" ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-background border-transparent hover:border-muted-foreground/20"}`}
                  >
                    Low to High
                  </button>
                  <button 
                    onClick={() => setSortBy("high-to-low")}
                    className={`text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${sortBy === "high-to-low" ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-background border-transparent hover:border-muted-foreground/20"}`}
                  >
                    High to Low
                  </button>
                  <button 
                    onClick={() => setSortBy("default")}
                    className={`text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${sortBy === "default" ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-background border-transparent hover:border-muted-foreground/20"}`}
                  >
                    Clear Filter
                  </button>
                </div>
              </div>

              <div className="pt-8">
                 <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest leading-relaxed">
                      All our products are curated for the modern lifestyle. Quality is our baseline.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="lg:col-span-9">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 bg-muted/5 rounded-[3rem] border-2 border-dashed border-muted/30">
                <div className="bg-muted/20 p-10 rounded-full">
                  <LayoutGrid size={64} className="text-muted-foreground/20" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tighter uppercase">No Products Found</h3>
                  <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">We&apos;re currently restoking this collection.</p>
                </div>
                <Button asChild variant="outline" className="rounded-full px-8 h-12 font-black uppercase tracking-widest border-2">
                  <Link href="/">Explore Other Collections</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
