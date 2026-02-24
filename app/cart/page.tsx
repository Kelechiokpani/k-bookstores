"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import ProductQuantity from "@/components/product-quantity";
import {
    useGetCartQuery,
    useUpdateCartQuantityMutation,
    useRemoveFromCartMutation,
    useClearCartMutation
} from "@/features/cart/cartApi";
import {useToast} from "@/components/ui/use-toast";


export default function CartPage() {
    const { toast } = useToast()
    const { data: cartItems = [], isLoading } = useGetCartQuery();
    const [updateQuantity] = useUpdateCartQuantityMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [clearCart, { isLoading: isClearing }] = useClearCartMutation();


    const subtotal = cartItems.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
    );

    const shippingThreshold = 20000;
    const shippingFee = subtotal > shippingThreshold || subtotal === 0 ? 0 : 2500;
    const total = subtotal + shippingFee;

    if (isLoading) {
        return (
            <div className="container flex h-[60vh] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container px-4 py-20 text-center">
                <div className="bg-muted/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="mt-6 text-2xl md:text-3xl font-bold">Your cart is empty</h1>
                <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                    Looks like you haven't added anything to your cart yet. Let's find some great books!
                </p>
                <Button asChild className="mt-8 px-8">
                    <Link href="/books">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    const handleQuantityChange = async (cartId: string, newQuantity: number) => {
        try {
            await updateQuantity({ cartId, quantity: newQuantity }).unwrap();
        } catch (err) {
            toast({
                title: "Failed!",
                description: "Failed to update quantity!.",
            })
        }
    };

    const handleRemove = async (cartId: string) => {
        try {
            await removeFromCart(cartId).unwrap();
            toast({
                title: "Success!",
                description: "item  removed Successfully!.",
            })
        } catch (err) {
            toast({
                title: "Failed!",
                description: "Failed to remove item!.",
            })
        }
    };

    const handleClear = async () => {
        try {
            await clearCart().unwrap();
            toast({
                title: "Success!",
                description: "Cart Cleared Successfully!.",
            })
        } catch (err) {
            toast({
                title: "Failed!",
                description: "Failed to remove item!.",
            })
        }
    };

    return (
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center md:text-left">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Cart List - Takes up 8 columns on desktop */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-row justify-between items-center mb-6">
                                <h2 className="text-base sm:text-lg font-semibold">
                                    Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                                </h2>
                                {/*<Button*/}
                                {/*    variant="ghost"*/}
                                {/*    size="sm"*/}
                                {/*    onClick={() => clearCart()}*/}
                                {/*    className="text-muted-foreground hover:text-destructive h-8 px-2 text-xs sm:text-sm"*/}
                                {/*>*/}
                                {/*    <Trash2 className="h-3.5 w-3.5 mr-1.5" />*/}
                                {/*    Clear Cart*/}
                                {/*</Button>*/}

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClear}
                                    disabled={isClearing} // 2. Disable button while loading
                                    className="text-muted-foreground hover:text-destructive h-8 px-2 text-xs sm:text-sm flex items-center"
                                >
                                    {isClearing ? (
                                        // 3. Show Spinner while processing
                                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                                    ) : (
                                        // 4. Show Trash icon normally
                                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                    )}
                                    {isClearing ? "Clearing..." : "Clear Cart"}
                                </Button>
                            </div>

                            <Separator className="mb-6" />

                            <div className="divide-y divide-border">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="py-6 first:pt-0 last:pb-0">
                                        <div className="flex flex-row gap-3 sm:gap-6">
                                            {/* Image Container */}
                                            <div className="relative h-24 w-20 sm:h-32 sm:w-24 flex-shrink-0 bg-muted rounded-md overflow-hidden border">
                                                <Image
                                                    src={item.product.images?.[0] || "/placeholder.png"}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Details Container */}
                                            <div className="flex flex-1 flex-col justify-between py-0.5">
                                                <div className="flex flex-col sm:flex-row justify-between gap-2">
                                                    <div className="max-w-[180px] sm:max-w-md">
                                                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 leading-snug">
                                                            {item.product.title}
                                                        </h3>
                                                        <p className="text-xs sm:text-sm font-medium text-primary mt-1">
                                                            ₦{item.product.price.toLocaleString()}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-1 sm:gap-3 self-start sm:self-center">
                                                        <ProductQuantity
                                                            initialQuantity={item.quantity}
                                                            maxQuantity={item.product.stockQuantity}
                                                            onQuantityChange={(q) => handleQuantityChange(item._id, q)}
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemove(item._id)}
                                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="mt-4 sm:mt-0 flex justify-between items-end border-t border-dashed pt-3 sm:pt-0 sm:border-0">
                                                    <span className="text-[10px] sm:hidden uppercase tracking-wider text-muted-foreground font-bold">Subtotal</span>
                                                    <span className="font-bold text-sm sm:text-base">
                                                        ₦{(item.product.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button asChild variant="ghost" className="hidden lg:flex mt-4 group">
                        <Link href="/books">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Continue Shopping
                        </Link>
                    </Button>
                </div>

                {/* Summary Sidebar - Takes up 4 columns - Sticky on desktop */}
                <div className="lg:col-span-4 lg:sticky lg:top-24">
                    <Card className="shadow-md border-primary/10 overflow-hidden">
                        <div className="p-6 bg-primary/5 border-b border-primary/10">
                            <h2 className="text-lg font-bold">Order Summary</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className={shippingFee === 0 ? "text-green-600 font-bold" : "font-medium"}>
                                    {shippingFee === 0 ? "FREE" : `₦${shippingFee.toLocaleString()}`}
                                </span>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center py-2">
                                <span className="font-bold text-base">Order Total</span>
                                <span className="font-black text-lg text-primary">₦{total.toLocaleString()}</span>
                            </div>

                            {subtotal < shippingThreshold && (
                                <div className="bg-orange-50 text-orange-800 p-3 rounded-lg border border-orange-100 flex flex-col items-center">
                                    <p className="text-[11px] font-medium text-center">
                                        Spend ₦{(shippingThreshold - subtotal).toLocaleString()} more for <span className="font-bold underline italic">Free Shipping</span>
                                    </p>
                                    <div className="w-full bg-orange-200 h-1 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="bg-orange-600 h-full transition-all duration-500"
                                            style={{ width: `${(subtotal / shippingThreshold) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            <Button asChild className="w-full h-14 text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all">
                                <Link href="/checkout">
                                    Checkout Now
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>

                            <div className="flex items-center justify-center gap-2 mt-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                    Secure SSL Encrypted Checkout
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Button asChild variant="outline" className="w-full mt-4 lg:hidden">
                        <Link href="/books">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}