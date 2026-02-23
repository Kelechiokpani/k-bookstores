"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    useAddToWishlistMutation,
    useDeleteWishlistMutation,
    useGetWishlistQuery
} from "@/features/wishlist/wishlistApi";

interface WishlistButtonProps {
    productId: string;
    size?: "sm" | "icon" | "default";
    variant?: "ghost" | "default" | "outline";
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
    const [addToWishlist] = useAddToWishlistMutation();
    const [deleteWishlist] = useDeleteWishlistMutation();
    const { data: wishlist } = useGetWishlistQuery();


    const wishlistItem = wishlist?.find(item => item.product._id === productId);
    const isWishlisted = !!wishlistItem;

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isWishlisted) {
            // We need the Wishlist Doc ID to delete, not the Product ID
            await deleteWishlist(wishlistItem._id).unwrap();
        } else {
            await addToWishlist({ product: productId }).unwrap();
        }
    };

    return (
        <Button
            size={size}
            variant={variant}
            className={cn("p-0 h-8 w-8 flex items-center justify-center", className)}
            onClick={handleClick}
        >
            <Heart
                className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                )}
            />
            <span className="sr-only">
        {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      </span>
        </Button>
    );
}