"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {ShoppingCart, Search, Menu, X, User, Heart, LogOut} from "lucide-react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useGetMeQuery, useLogoutMutation} from "@/features/auth/authApi";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useGetWishlistQuery} from "@/features/wishlist/wishlistApi";
import {useGetCartQuery} from "@/features/cart/cartApi";
import {useToast} from "@/components/ui/use-toast";
import {clearAuth} from "@/features/auth/authSlice";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data: user, isLoading, isError } = useGetMeQuery();
  const { data: wish, } = useGetWishlistQuery();
  const { data: cart, } = useGetCartQuery();




// Calculate total quantity of all items in the cart
  const totalCart = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalWish = wish?.length || 0;


// Calculate total price (optional, but useful)
  const totalPrice = cart?.reduce((acc, item) => {
    const price = item.product.price;
    const discount = item.product.discountPercentage || 0;
    const effectivePrice = price * (1 - discount / 100);
    return acc + (effectivePrice * item.quantity);
  }, 0) || 0;


  const handleLogout = async () => {
    try {
      // 1. Hit the backend logout endpoint (clears cookies/sessions)
      await logout().unwrap();
      // 2. Clear local Redux state (token/user info)
      dispatch(clearAuth());
      // 3. Feedback and Redirect
      toast({
        title: "Logged out",
        description: "See you next time!",
      });
      router.push("/login");
    } catch (err: any) {
      toast({
        title: "Logout Failed",
        description: err?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      dispatch(clearAuth());
      router.push("/login");
    }
  };


  console.log(user, "...user")
  console.log(wish, "...wish")
  console.log(cart, "...cart")



  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header
          className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 md:h-18 items-center justify-between">

          {/* 1. LEFT SECTION: Mobile Menu + Logo */}
          <div className="flex flex-1 items-center justify-start gap-4">
            <div className="md:hidden">
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>

            <Link href="/" className="flex items-center shrink-0">
              <Image
                  src="/logo.png"
                  alt="Kbook Stores Logo"
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* 2. CENTER SECTION: Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 text-sm">
            <Link href="/" className="text-sm font-semibold hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/books" className="text-sm font-semibold hover:text-primary transition-colors">
              Books Store
            </Link>

            <Link href="/about" className="text-sm font-semibold hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-semibold hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* 3. RIGHT SECTION: Wishlist, Cart, Auth */}
          <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative group">
                <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors"/>
                {totalWish > 0 && (
                    <span
                        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              {totalWish}
            </span>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5"/>
                {totalCart > 0 && (
                    <span
                        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              {totalCart}
            </span>
                )}
              </Button>
            </Link>

            {/* AUTH SECTION */}
            {isLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse"/>
            ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full border border-gray-100">
                      <User className="h-5 w-5"/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold capitalize">{user.name}</span>
                        <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 cursor-pointer font-bold">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex items-center gap-2">
                  <Link href="/sign-in" className="hidden md:block">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link href="/sign-up" className="hidden md:block">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                  <Link href="/sign-in" className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5"/>
                    </Button>
                  </Link>
                </div>
            )}
          </div>
        </div>

        {/* Mobile menu (Remains the same) */}
        {isMenuOpen && (
            <div className="fixed inset-0 top-16 z-50 bg-white md:hidden animate-in fade-in slide-in-from-top-4">
              <nav className="container grid gap-6 p-8">
                {/* Your mobile links... */}
              </nav>
            </div>
        )}
      </header>
  );
}
