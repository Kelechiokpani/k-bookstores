"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="container px-8 py-8 mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-8">
              <Link href="/" className="inline-block transition-opacity hover:opacity-80">
                <Image
                    src="/logo.png"
                    alt="Kbook Stores Logo"
                    width={150}
                    height={50}
                    className="h-20 w-auto" // Fixed large logo issue
                />
              </Link>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                Nigeria's premier online bookstore. Empowering readers through
                diverse literature and supporting the growth of African voices
                worldwide.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+234 800 KBOOKS</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>hello@kbookstores.com</span>
                </div>
              </div>

              <div className="flex space-x-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <Link key={i} href="#" className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                      <Icon className="h-4 w-4" />
                    </Link>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-6 lg:col-span-4 sm:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Shop</h3>
                <ul className="space-y-2">
                  {['Bestsellers', 'Nigerian Authors', 'Fiction', 'Children'].map((item) => (
                      <li key={item} className="py-2">
                        <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {item}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Support</h3>
                <ul className="space-y-2">
                  {['Help Center', 'Shipping', 'Returns', 'Privacy'].map((item) => (
                      <li key={item} className="py-2">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {item}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Join the Community</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to get book reviews, author interviews, and exclusive discounts.
              </p>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white border-slate-200 focus-visible:ring-primary"
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-6 mt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-medium text-slate-500">
              &copy; {year ?? "—"} Kbook Stores. Built for the love of reading.
            </p>
            <div className="flex items-center gap-6">
              <Image src="/paystack-badge.png" alt="Protected by Paystack" width={100} height={30} className="opacity-60 grayscale hover:grayscale-0 transition-all cursor-not-allowed" />
              <div className="flex gap-4 text-[10px] font-bold uppercase text-slate-400">
                <Link href="#" className="hover:text-primary">Terms</Link>
                <Link href="#" className="hover:text-primary">Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}