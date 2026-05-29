"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { getProductById } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SingleProduct() {
  const params = useParams();
  const id = params.id as string;

  const product = getProductById(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product)
    return <div className="p-20 text-center text-xl font-semibold">Product not found</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* IMAGE SECTION */}
        <div className="flex gap-4">
          <div className="flex flex-col w-24 gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={cn(
                  "border-2 rounded-md overflow-hidden relative h-20 w-full",
                  currentImageIndex === idx
                    ? "border-black"
                    : "border-transparent",
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
          <div className="flex-1 relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground uppercase text-sm font-semibold tracking-wider">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
            <p className="text-gray-600 mt-4 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">${product.price}</span>
            {product.stock > 0 ? (
              <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-red-600 text-sm font-bold bg-red-50 px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div className="flex items-center border rounded-lg overflow-hidden bg-white shadow-sm">
              <Button
                variant="ghost"
                className="h-11 px-4 hover:bg-gray-100"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus size={16} />
              </Button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <Button 
                variant="ghost" 
                className="h-11 px-4 hover:bg-gray-100"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
            <Button size="lg" className="flex-1 h-11 text-lg font-semibold shadow-md">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
