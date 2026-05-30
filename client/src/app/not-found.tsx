"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost } from "lucide-react";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="relative inline-block">
          <div className="bg-muted/30 p-16 rounded-full ring-8 ring-muted/10 animate-pulse">
            <Ghost size={120} className="text-muted-foreground/30" />
          </div>
          <span className="absolute top-0 right-0 bg-primary text-white text-4xl font-black px-6 py-2 rounded-2xl shadow-2xl rotate-12">
            404
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Collection Not Found
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-sm max-w-md mx-auto leading-relaxed">
            The collection or product you are looking for has been moved or doesn&apos;t exist in our current studio.
          </p>
        </div>

        <Button asChild size="lg" className="rounded-full h-16 px-12 font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95 group">
          <Link href="/" className="flex items-center gap-3">
            <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
            Back To Gallery
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
