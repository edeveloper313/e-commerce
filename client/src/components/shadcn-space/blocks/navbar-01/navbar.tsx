"use client";

import MyButton from "@/components/myReuseComponents/MyButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { TextAlignJustify } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CartSidebar } from "@/components/CartSidebar";

export type NavigationSection = {
  title: string;
  href: string;
};

const navigationData: NavigationSection[] = [
  {
    title: "Shop All",
    href: "/",
  },
  {
    title: "Perfumes",
    href: "/category/man-perfume",
  },
  {
    title: "Watches",
    href: "/category/watches",
  },
  {
    title: "Accessories",
    href: "/category/glasses",
  },
];

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className={cn(
        "max-w-7xl mx-auto w-full px-4 py-4 sm:px-6 transition-all duration-500",
        sticky ? "py-2" : "py-6"
      )}>
        <nav
          className={cn(
            "w-full flex items-center justify-between gap-6 px-6 py-3 transition-all duration-500 rounded-[2rem]",
            sticky
              ? "bg-background/80 backdrop-blur-xl border border-muted/50 shadow-2xl shadow-primary/10"
              : "bg-muted/10 backdrop-blur-sm border border-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <h3 className="text-2xl font-black text-primary tracking-tighter uppercase group-hover:scale-105 transition-transform">
              E-Store
            </h3>
          </Link>
          
          <div className="hidden lg:flex items-center">
            <NavigationMenu className="bg-background/50 p-1 rounded-full border border-muted/30">
              <NavigationMenuList className="flex gap-1">
                {navigationData.map((navItem) => (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink
                      href={navItem.href}
                      className="px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full text-muted-foreground hover:text-primary hover:bg-background transition-all"
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MyButton content="Contact Studio" />
            </div>
            
            <CartSidebar />

            <div className="lg:hidden">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="rounded-full bg-background border-2 border-muted p-3 outline-none flex items-center justify-center cursor-pointer transition-all hover:bg-primary hover:text-white">
                  <TextAlignJustify size={20} />
                  <span className="sr-only">Menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64 mt-4 p-2 rounded-2xl border-2 shadow-2xl">
                  {navigationData.map((item) => (
                    <DropdownMenuItem key={item.title} asChild className="rounded-xl">
                      <Link
                        href={item.href}
                        className="w-full cursor-pointer px-4 py-3 text-xs font-black uppercase tracking-widest"
                      >
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem asChild className="rounded-xl mt-2 bg-primary text-white focus:bg-primary/90 focus:text-white">
                    <Link href="#" className="w-full text-center py-3 text-xs font-black uppercase tracking-widest">
                      Contact Us
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
