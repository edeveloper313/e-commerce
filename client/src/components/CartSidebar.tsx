"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/store/UseCard";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function CartSidebar() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full h-12 w-12 border-2 hover:bg-primary hover:text-white transition-all">
          <ShoppingCart size={22} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-background shadow-lg">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-0 shadow-2xl">
        <SheetHeader className="p-6 pb-4 bg-background">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart size={28} className="text-primary" />
              <span className="text-2xl font-black tracking-tighter uppercase">My Bag</span>
            </div>
            <span className="bg-muted px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {getTotalItems()} Items
            </span>
          </SheetTitle>
        </SheetHeader>
        
        <Separator className="bg-muted/50" />

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="bg-muted/30 p-12 rounded-full ring-8 ring-muted/10">
                <ShoppingCart size={80} className="text-muted-foreground/30" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-black tracking-tight">Your bag is empty</p>
                <p className="text-muted-foreground font-medium max-w-[200px] mx-auto">Looks like you haven&apos;t added anything yet.</p>
              </div>
              <Button variant="outline" className="rounded-full px-8 font-bold border-2" asChild>
                <SheetTrigger>Start Shopping</SheetTrigger>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product._id} className="flex gap-6 group">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-muted border border-muted/50 flex-shrink-0 shadow-sm transition-transform group-hover:scale-95">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-black text-sm uppercase tracking-tight leading-tight line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">{item.product.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-full"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-black text-primary tracking-tighter">${item.product.price}</p>
                      <div className="flex items-center border-2 border-muted rounded-full bg-background overflow-hidden shadow-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none hover:bg-muted"
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none hover:bg-muted"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-6 bg-muted/5 border-t border-muted/50 flex-col gap-6">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Estimated Total</span>
                <span className="text-2xl font-black tracking-tighter text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium text-center bg-muted/30 py-2 rounded-lg border border-muted/50 uppercase tracking-[0.2em]">
                Shipping & Taxes calculated at checkout
              </p>
            </div>
            <Link href={`checkout`} className="w-full h-16 text-lg font-black rounded-[1.25rem] shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all uppercase tracking-widest">
              Proceed to Checkout
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
