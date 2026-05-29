"use client";

import Image from "next/image";
import { ProductI } from "@/types/interfaces/Interfaces.type";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/store/UseCard";
import Link from "next/link";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface Props {
  product: ProductI;
}

export default function ProductCard({ product }: Props) {
  const { items, addToCart, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const cartItem = items.find((item) => item.product._id === product._id);

  if (!mounted) return null;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden group h-full flex flex-col bg-background rounded-[2rem] border-muted/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/80 backdrop-blur-md text-primary hover:bg-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-none shadow-lg">
              {product.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-black text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
              <span className="text-xl font-black text-primary tracking-tighter">${product.price}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 font-medium uppercase tracking-wider leading-relaxed">
              {product.description}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          {cartItem ? (
            <div className="flex items-center justify-between w-full border-2 border-primary/20 rounded-2xl overflow-hidden bg-primary/5 h-12 animate-in zoom-in duration-300 shadow-inner">
              <Button
                variant="ghost"
                size="icon"
                className="h-full w-12 rounded-none hover:bg-primary/10 text-primary transition-colors"
                onClick={() => updateQuantity(product._id, cartItem.quantity - 1)}
              >
                <Minus size={16} />
              </Button>
              <span className="text-xs font-black text-primary tracking-tighter">
                {cartItem.quantity} IN BAG
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-full w-12 rounded-none hover:bg-primary/10 text-primary transition-colors"
                onClick={() => updateQuantity(product._id, cartItem.quantity + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full h-12 rounded-2xl font-black gap-2 shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] active:scale-95 group/btn uppercase tracking-widest text-[10px]"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={18} className="group-hover/btn:rotate-12 transition-transform" />
              Add to Bag
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
