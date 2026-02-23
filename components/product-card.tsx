"use client";
import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import WishlistButton from "@/components/wishlist-button";
import { useAppDispatch } from "@/app/hooks";
import { useAddToCartMutation } from "@/features/cart/cartApi";
import { toast } from "sonner";
import {addToCart, CartItem} from "@/features/cart/cartSlice";
import {Product} from "@/features/products/productSlice";
import {useGetMeQuery} from "@/features/auth/authApi";



interface ProductCardProps {
  product: Product;
  compact?: boolean;
}


export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const { data: user, isError } = useGetMeQuery();


  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    // 2. Stock Check
    if (product.stockQuantity <= 0) {
      toast.error("Item is out of stock");
      return;
    }

    try {
      await addToCartApi({
        product: product._id,
        quantity: 1
      }).unwrap();

      toast.success(`${product.title} added to cart!`);
    } catch (err: any) {
      // Handle the specific error if the item is already in cart or unauthorized
      const errMsg = err?.data?.message || "Failed to add to cart";
      toast.error(errMsg);
    }
  };

  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = hasDiscount
      ? product.price / (1 - product.discountPercentage / 100)
      : product.price;


  return (
      <Link href={`/books/${product._id}`}>
        <div className="overflow-hidden h-full rounded-lg bg-white border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="relative">
            {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center" />
            )}

            <Image
                src={product.images?.[0] || "/placeholder.png"}
                alt={product?.title}     // Matches schema
                width={300}
                height={300}
                className={cn(
                    "w-full object-cover transition-transform duration-300 group-hover:scale-105",
                    compact ? "h-40" : "h-60",
                    !imageLoaded && "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
            />

            {hasDiscount && (
                <Badge className="absolute top-2 right-2 bg-green-600">
                  {product.discountPercentage}% OFF
                </Badge>
            )}

            {!compact && product.stockQuantity > 0 && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                      size="icon"
                      className="bg-white text-primary hover:bg-primary hover:text-white"
                      onClick={handleAddToCart}
                      disabled={isLoading}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
            )}
          </div>

          <CardContent className={cn("p-4", compact && "p-3")}>
            <h3 className={cn("font-semibold line-clamp-2 text-sm", compact ? "text-sm" : "text-sm")}>
              {product.title}
            </h3>

            {!compact && (
                <p className="text-muted-foreground text-xs mt-2 line-clamp-2">
                  {product.description}
                </p>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between px-4 py-3 border-t bg-slate-50/50">
            <div>
              {hasDiscount ? (
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">₦{product.price.toLocaleString()}</span>
                    <span className="text-muted-foreground text-[10px] line-through">₦{originalPrice.toLocaleString()}</span>
                  </div>
              ) : (
                  <span className="font-bold text-primary">₦{product.price.toLocaleString()}</span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <WishlistButton productId={product._id} size="sm" variant="ghost" className="p-0 h-8 w-8" />

              {compact && (
                  <Button size="sm" variant="ghost" className="p-0 h-8 w-8" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
              )}
            </div>
          </CardFooter>
        </div>
      </Link>
  );
}