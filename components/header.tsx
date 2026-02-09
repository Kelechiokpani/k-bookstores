"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, X, User, Heart } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store"; // path to your Zustand store
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";

export default function Header() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems, wishlist } = useCart();
  const router = useRouter();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const totalWish = wishlist.reduce(
      (total, item) => total + item.length,
      0
  );

  // const cart = useStore((state) => state.cart);
  // const wishlist = useStore((state) => state.wishlist);

  let totalWishlist = 0;

  if (typeof window !== "undefined") {
    const savedWishlist = localStorage.getItem("wishlist");
    totalWishlist = savedWishlist ? JSON.parse(savedWishlist).length : 0;
  }

  // Trigger search

  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 ">
      <div className="container flex h-18 items-center">
        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
                <X className="h-8 w-8"/>
            ) : (
                <Menu className="h-8 w-8"/>
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
                src="/logo.png"
                alt="Kbook Stores Logo"
                width={100}
                height={100}
                className="h-30 w-30"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6">
          <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
              href="/books"
              className="text-sm font-medium hover:text-primary transition-colors"
          >
            Books
          </Link>
          <Link
              href="/books"
              className="text-sm font-medium hover:text-primary transition-colors"
          >
            Bestsellers
          </Link>
          <Link
              href="/books"
              className="text-sm font-medium hover:text-primary transition-colors"
          >
            Nigerian Authors
          </Link>
          <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">


          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5"/>
              {totalWish > 0 && (
                  <span
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {totalWish}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          <div className="hidden md:flex">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="mr-1">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="default" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Link href="/sign-in">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5"/>
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          </div>



          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5"/>
              {totalItems > 0 && (
                  <span
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-white/95 md:hidden">
            <nav className="container grid gap-6 p-6">
              <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                  href="/books"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
              >
                Books
              </Link>
              <Link
                  href="/books"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
              >
                Bestsellers
              </Link>
              <Link
                  href="/books"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
              >
                Nigerian Authors
              </Link>
              <Link
                  href="/about"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>

              <Link
                  href="/contact"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                  href="/sign-in"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
              >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center gap-2 text-lg font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
