"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlist } from "@/components/wishlist-provider";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useCart } from "./cart-provider";

interface WishlistButtonProps {
  productId: string;
  size?: "sm" | "icon";
  variant?: "ghost" | "default";
  className?: string;
  onChange?: (added: boolean) => void;
}

export default function WishlistButton({
  productId,
  size = "sm",
  variant = "ghost",
  className,
  onChange,
}: WishlistButtonProps) {
  // const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const product = products.find((p) => p.id === productId) as Product;

  if (!product) {
    console.warn(`Product with id ${productId} not found!`);
    return null; // or fallback UI
  }

  const inWishlist = isInWishlist(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // toggleWishlist(productId);
    isInWishlist(product.id);
    toggleWishlist(product.id);

    if (onChange) onChange(!inWishlist);
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={`${className} p-0 h-8 w-8 flex items-center justify-center`}
      onClick={handleClick}
    >
      <Heart
        className={`h-5 w-5 transition-colors duration-200 ${
          inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
        }`}
      />
      <span className="sr-only">
        {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      </span>
    </Button>
  );
}
