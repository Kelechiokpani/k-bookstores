"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingBag, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  useClearWishlistMutation,
  useDeleteWishlistMutation,
  useGetWishlistQuery
} from "@/features/wishlist/wishlistApi";
import { useAddToCartMutation } from "@/features/cart/cartApi";

export default function WishlistPage() {
  const { toast } = useToast();

  // 1. Fetching Data (Note: items contain a .product object)
  const { data: wishlistItems = [], isLoading } = useGetWishlistQuery();

  // 2. Mutations
  const [deleteWishlist, { isLoading: isDeleting }] = useDeleteWishlistMutation();
  const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  // 3. Remove single item (Uses the Wishlist _id, not the Product ID)
  const removeFromWishlist = async (wishlistId: string) => {
    try {
      await deleteWishlist(wishlistId).unwrap();
      toast({
        title: "Removed",
        description: "Item removed from wishlist.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item.",
      });
    }
  };

  // 4. Clear all items
  const handleClear = async () => {
    try {
      await clearWishlist().unwrap();
      toast({
        title: "Wishlist Cleared",
        description: "All items have been removed.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear wishlist.",
      });
    }
  };

  // 5. Add to Cart Logic
  const handleAddToCart = async (productId: string, title: string) => {
    try {
      await addToCart({ product: productId, quantity: 1 }).unwrap();
      toast({
        title: "Added to Cart",
        description: `${title} is now in your shopping cart.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Could not add item to cart.",
      });
    }
  };

  if (isLoading) {
    return (
        <div className="container flex h-[60vh] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
        <div className="container px-4 py-16 text-center">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground opacity-20" />
          <h1 className="mt-6 text-3xl font-bold">Your wishlist is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Save items you love to your wishlist and revisit them anytime.
          </p>
          <Button asChild className="mt-8">
            <Link href="/books">Continue Shopping</Link>
          </Button>
        </div>
    );
  }

  return (
      <div className="container px-4 py-8 md:py-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">My Wishlist ({wishlistItems.length})</h1>

          <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/10"
              onClick={handleClear}
              disabled={isClearing}
          >
            {isClearing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
            Clear Wishlist
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlistItems.map((item) => (
              <Card key={item._id} className="overflow-hidden flex flex-col group border-primary/10 shadow-sm hover:shadow-md transition-shadow">

                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Link href={`/product/${item.product._id}`}>
                    <Image
                        src={item.product.images?.[0] || "/placeholder.png"}
                        alt={item.product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* 2. Better UX: Make the delete button visible on mobile, hover on desktop */}
                  <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity h-8 w-8"
                      onClick={() => removeFromWishlist(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* 3. Reduced Padding and Spacing */}
                <div className="p-3 flex flex-col flex-1">
                  <Link href={`/product/${item.product._id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-bold text-sm mb-0.5 line-clamp-1 leading-tight">{item.product.title}</h3>
                  </Link>

                  {/* Limit description to 1 line to save vertical space */}
                  <p className="text-muted-foreground text-[11px] mb-2 line-clamp-1 italic">
                    {item.product.description}
                  </p>

                  <div className="mt-auto pt-2 space-y-2">
                    <div className="flex justify-between items-baseline">
        <span className="font-bold text-base text-primary">
          ₦{item.product.price.toLocaleString()}
        </span>
                      {item.product.stockQuantity <= 0 && (
                          <span className="text-[9px] text-destructive font-bold uppercase">Sold Out</span>
                      )}
                    </div>

                    <Button
                        onClick={() => handleAddToCart(item.product._id, item.product.title)}
                        className="w-full h-8 text-xs" // Slightly shorter button
                        disabled={item.product.stockQuantity <= 0 || isAddingToCart}
                    >
                      <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                      {isAddingToCart ? "Adding..." : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </Card>          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="ghost">
            <Link href="/books">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Explore More Books
            </Link>
          </Button>
        </div>
      </div>
  );
}