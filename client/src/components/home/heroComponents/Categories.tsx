"use client";

import { categoriesData } from "@/data/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const Categories = () => {
  return (
    <div className="flex flex-col h-full">
      <ul className="space-y-2">
        {categoriesData.map((cat, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="group flex justify-between items-center px-5 py-4 rounded-2xl bg-background border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="size-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.1em] text-foreground/70 group-hover:text-primary transition-colors">
                  {cat}
                </span>
              </div>
              <ArrowRight size={14} className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </motion.li>
        ))}
      </ul>
      
      <div className="mt-auto pt-8">
         <div className="bg-primary p-6 rounded-[2rem] text-white space-y-3 shadow-2xl shadow-primary/20">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 text-center">Member Exclusive</p>
            <h4 className="text-lg font-black tracking-tight leading-tight text-center">Get 20% Off Your First Bag</h4>
            <Button variant="outline" className="w-full rounded-full border-white/20 bg-white/10 hover:bg-white hover:text-primary transition-all border-2 text-[10px] font-black uppercase tracking-widest h-10">
              Join Studio
            </Button>
         </div>
      </div>
    </div>
  );
};

export default Categories;
