"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowLeft, ShieldCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { useCart } from "@/store/UseCard";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, checkout, getTotalPrice, getTotalItems } = useCart();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = getTotalPrice();
  const giftWrapPrice = isGiftWrap ? 5.0 : 0;
  const totalPrice = subtotal + giftWrapPrice;

  const handlePayment = async () => {
    setIsLoading(true);
    // Simulate API call for payment & stock update
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    checkout(); // Clears cart and logs "stock decremented"
    setIsLoading(false);
    
    alert("Order Placed Successfully! Stock has been updated.");
    router.push("/");
  };

  if (!mounted)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 font-black uppercase tracking-widest text-xs">Securing Connection...</p>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center space-y-6">
        <div className="bg-muted/30 p-12 rounded-full">
           <CreditCard size={80} className="text-muted-foreground/30" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter uppercase">Your Bag is Empty</h2>
        <Button asChild className="rounded-full px-8 h-12 font-black uppercase tracking-widest">
          <Link href="/">Go Back Shopping</Link>
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-background py-12 px-4 md:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-7 space-y-12">
           <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Continue Shopping</span>
              </Link>
              <h1 className="text-5xl font-black tracking-tighter uppercase">Checkout</h1>
              <div className="h-1.5 w-20 bg-primary rounded-full"></div>
           </div>

           <div className="space-y-8">
              <section className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/60">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest ml-1">Full Name</Label>
                    <Input className="h-14 rounded-2xl border-2 focus:border-primary/50 transition-all bg-muted/5 font-bold" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest ml-1">Email Address</Label>
                    <Input className="h-14 rounded-2xl border-2 focus:border-primary/50 transition-all bg-muted/5 font-bold" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-black text-[10px] uppercase tracking-widest ml-1">Delivery Address</Label>
                  <Input className="h-14 rounded-2xl border-2 focus:border-primary/50 transition-all bg-muted/5 font-bold" placeholder="123 Modern St, Fashion District" />
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/60">Gift Options</h3>
                <div className="space-y-2">
                  <Label className="font-black text-[10px] uppercase tracking-widest ml-1">Personal Message (Optional)</Label>
                  <Textarea className="rounded-2xl border-2 focus:border-primary/50 transition-all bg-muted/5 font-bold p-4" rows={4} placeholder="Write a personal note for your delivery..." />
                </div>
                <div className="flex items-center space-x-4 bg-primary/5 p-6 rounded-[2rem] border-2 border-primary/10 shadow-sm transition-all hover:shadow-md group">
                  <Checkbox 
                    id="gift-wrap" 
                    checked={isGiftWrap} 
                    onCheckedChange={(val) => setIsGiftWrap(!!val)}
                    className="size-6 rounded-lg border-2"
                  />
                  <div className="flex-1">
                    <Label htmlFor="gift-wrap" className="text-sm font-black uppercase tracking-tight cursor-pointer">Professional Gift Wrap</Label>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Premium packaging with hand-written card</p>
                  </div>
                  <span className="text-lg font-black text-primary">+$5.00</span>
                </div>
              </section>

              <div className="pt-8 border-t border-muted/50">
                 <div className="flex items-center gap-4 text-muted-foreground">
                    <ShieldCheck size={24} className="text-green-600" />
                    <p className="text-[10px] font-black uppercase tracking-[0.1em]">Secure SSL Encrypted Checkout. Your privacy is our priority.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="lg:col-span-5">
           <Card className="rounded-[2.5rem] border-2 shadow-2xl bg-muted/5 overflow-hidden sticky top-28">
              <CardHeader className="p-8 pb-4">
                <h2 className="text-2xl font-black tracking-tighter uppercase">Order Summary</h2>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{getTotalItems()} Items in Bag</p>
              </CardHeader>
              
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex items-center gap-4 group">
                      <div className="relative size-20 rounded-2xl overflow-hidden bg-muted flex-shrink-0 border shadow-sm">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-xs uppercase truncate">{item.product.name}</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-black text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-muted-foreground/10" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {isGiftWrap && (
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-primary">
                      <span>Gift Wrapping</span>
                      <span>+$5.00</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-green-600">
                    <span>Shipping</span>
                    <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">Complimentary</span>
                  </div>
                  <Separator className="bg-primary/20 h-0.5" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-black uppercase tracking-tighter">Total Due</span>
                    <span className="text-3xl font-black tracking-tighter text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <Button 
                  onClick={handlePayment} 
                  disabled={isLoading}
                  className="w-full h-16 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95"
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    `Place Order`
                  )}
                </Button>
              </CardFooter>
           </Card>
        </div>

      </div>
    </div>
  );
}
