"use client";

import { Logo } from "@/components/pro-blocks/logo";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

// 1. Categories Column
const CATEGORIES = [
  { href: "#", label: "Electronics" },
  { href: "#", label: "Fashion & Apparel" },
  { href: "#", label: "Home & Kitchen" },
  { href: "#", label: "Beauty & Health" },
  { href: "#", label: "Sports & Outdoors" },
];

// 2. Customer Support Column
const SUPPORT = [
  { href: "#", label: "Track Your Order" },
  { href: "#", label: "Shipping Policy" },
  { href: "#", label: "Return & Refund" },
  { href: "#", label: "FAQs" },
  { href: "#", label: "Contact Us" },
];

// 3. Legal Links (Bottom)
const LEGAL_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookies Settings" },
];

export default function Footer() {
  return (
    <footer
      className="bg-background border-t pt-16 pb-8 text-sm"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* TOP SECTION: Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="size-8" />
              <span className="text-xl font-bold tracking-tight">MY-STORE</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Your one-stop destination for premium products. High quality, fast
              delivery, and 24/7 support.
            </p>
            <div className="flex gap-4 mt-2">
              <FaFacebook className="size-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <FaInstagram className="size-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <FaTwitter className="size-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <FaYoutube className="size-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Column 2: Shop Categories */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground uppercase tracking-wider">
              Shop Categories
            </h3>
            <nav className="flex flex-col gap-2">
              {CATEGORIES.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Customer Service */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground uppercase tracking-wider">
              Customer Support
            </h3>
            <nav className="flex flex-col gap-2">
              {SUPPORT.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground uppercase tracking-wider">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin className="size-5 text-primary" />
                <span>123 Market St, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-primary" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-primary" />
                <span>support@mystore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* BOTTOM SECTION: Copyright & Payments */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center lg:items-start gap-2">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} MyStore Inc. All rights reserved.
            </p>
            <nav className="flex gap-4 md:gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Payment Icons Placeholder */}
          <div className="flex items-center gap-4 grayscale opacity-70">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-4"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="Paypal"
              className="h-5"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
