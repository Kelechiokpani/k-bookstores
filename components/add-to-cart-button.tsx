"use client";

import { useAddToCartMutation } from "@/features/cart/cartApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  stock?: number;
  className?: string;
}

export default function AddToCartButton({ productId, stock, className }: AddToCartButtonProps) {
  const [addToCart, { isLoading }] = useAddToCartMutation();


  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      // Ensure we send only the ID string as expected by your cartApi
      await addToCart({ product: productId, quantity: 1 }).unwrap();
      toast.success("Added to cart");
    } catch (err: any) {
      // This will now show the actual error message from your Express server
      toast.error(err?.data?.message || "Failed to add to cart");
    }
  };

  return (
      <Button
          onClick={handleAdd}
          disabled={isLoading || stock === 0}
          className={cn("bg-primary hover:bg-primary/90", className)}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {stock === 0 ? "Out of Stock" : isLoading ? "Adding..." : "Add to Cart"}
      </Button>
  );
}