"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

// 1. Categories Column
const CATEGORIES = [
  { href: "/category/man-perfume", label: "Perfumes" },
  { href: "/category/watches", label: "Watches" },
  { href: "/category/jewelry", label: "Jewelry" },
  { href: "/category/glasses", label: "Accessories" },
  { href: "/category/bags", label: "Leather Bags" },
];

// 2. Customer Support Column
const SUPPORT = [
  { href: "#", label: "Order Tracking" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Return & Refund" },
  { href: "#", label: "Support Center" },
  { href: "#", label: "Store Locator" },
];

// 3. Legal Links (Bottom)
const LEGAL_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookie Settings" },
];

export default function Footer() {
  return (
    <footer
      className="bg-background border-t border-muted/50 pt-24 pb-12"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP SECTION: Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Column 1: Brand & Info */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-3xl font-black tracking-tighter text-primary">E-STORE</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Elevating your lifestyle with premium essentials. We believe in quality, craftsmanship, and exceptional design.
            </p>
            <div className="flex gap-4">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
                <div key={idx} className="bg-muted/50 p-3 rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer border border-muted/50 group">
                  <Icon className="size-5 transition-transform group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
    
          {/* Column 2: Shop Categories */}
          <div className="flex flex-col gap-8">
            <h3 className="font-black text-primary uppercase tracking-[0.2em] text-xs">
              Collections
            </h3>
            <nav className="flex flex-col gap-4">
              {CATEGORIES.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Customer Service */}
          <div className="flex flex-col gap-8">
            <h3 className="font-black text-primary uppercase tracking-[0.2em] text-xs">
              Company
            </h3>
            <nav className="flex flex-col gap-4">
              {SUPPORT.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-8">
            <h3 className="font-black text-primary uppercase tracking-[0.2em] text-xs">
              Our Studio
            </h3>
            <ul className="flex flex-col gap-6 text-muted-foreground font-medium">
              <li className="flex items-start gap-4">
                <div className="bg-primary/5 p-2 rounded-lg border border-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                <span className="text-sm">123 Modern Avenue, Fashion District, PK</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-primary/5 p-2 rounded-lg border border-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <span className="text-sm">+92 300 000 0000</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-primary/5 p-2 rounded-lg border border-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>
                <span className="text-sm tracking-tight font-bold">hello@estore.studio</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-muted/30" />

        {/* BOTTOM SECTION: Copyright & Payments */}
        <div className="mt-12 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} E-STORE STUDIO INC. 
            </p>
            <nav className="flex gap-8">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-8 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
            <div className="relative h-6 w-16">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-8 w-14">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-6 w-20">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="Paypal"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
