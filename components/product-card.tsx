"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/types";
import WishlistButton from "@/components/wishlist-button";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({
  product,
  compact = false,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  function setWishlistItems(arg0: (prev: any) => any) {
    throw new Error("Function not implemented.");
  }

  return (
    <Link href={`/product/${product.slug}`}>
      {/* Card Animation */}
      <motion.div
        whileHover={{
          y: -5,
          scale: 1.03,
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="overflow-hidden h-full rounded-lg bg-white"
      >
        {/* Image */}
        <motion.div
          className="relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className={cn(
              "w-full object-cover transition-transform duration-300",
              compact ? "h-40" : "h-60",
              !imageLoaded && "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {(product.discount ?? 0) > 0 && (
            <Badge className="absolute top-2 right-2 bg-green-600">
              {product.discount}% OFF
            </Badge>
          )}

          {!compact && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <div className="absolute bottom-2 right-2">
                <Button
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Card Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CardContent className={cn("p-4", compact && "p-3")}>
            <h3
              className={cn(
                "font-semibold line-clamp-2",
                compact ? "text-sm" : "text-base"
              )}
            >
              {product.name}
            </h3>

            <p className="text-xs text-muted-foreground mt-1 text-blue-400">
              by {product.author}
            </p>

            {!compact && (
              <p className="text-muted-foreground text-xs mt-2 line-clamp-2 italic">
                {product.description}
              </p>
            )}
          </CardContent>
        </motion.div>

        {/* Card Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CardFooter className="flex items-center justify-between px-4 py-3 border-t">
            <div>
              {product.originalPrice &&
              product.originalPrice > product.price ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-xs line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-primary">
                  ₦{product.price.toLocaleString()}
                </span>
              )}
            </div>

            {compact ? (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-0 h-8 w-8"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <WishlistButton
                  productId={product.id}
                  size="sm"
                  variant="ghost"
                  className="p-0 h-8 w-8"
                />
              </motion.div>
            )}
          </CardFooter>
        </motion.div>
      </motion.div>
    </Link>
  );
}
