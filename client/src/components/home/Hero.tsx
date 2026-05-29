"use client";

import Categories from "@/components/home/heroComponents/Categories";
import RightSideBar from "./heroComponents/RightSideBar";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[500px]">
          {/* LEFT SIDE: Category Menu (Visible on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block md:col-span-3"
          >
            <div className="bg-muted/30 rounded-3xl p-6 h-full border border-muted/50 shadow-inner">
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-primary/70">Shop By Dept</h3>
              <Categories />
            </div>
          </motion.div>

          {/* RIGHT SIDE: Carousel (Featured Content) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-9 h-full rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-muted/30"
          >
            <RightSideBar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
