"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAddressesQuery,
  useAddAddressMutation
} from "@/features/address/addressApi";
import { useGetCartQuery } from "@/features/cart/cartApi";
import {
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MapPin,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { toast } = useToast();

  // 1. RTK Query hooks
  const { data: cartData, isLoading: isLoadingCart } = useGetCartQuery();
  const { data: savedAddresses = [], isLoading: loadingAddresses } = useGetAddressesQuery();
  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();

  // 2. Component State
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: ""
  });

  // 3. FIXED: Totals logic with safety checks
  // We use useMemo to prevent unnecessary recalculations and handle empty/loading states
  const { subtotal, shipping, total } = useMemo(() => {
    // If data isn't an array yet, return zeros
    if (!Array.isArray(cartData)) return { subtotal: 0, shipping: 0, total: 0 };
    //     ₦{item.product.price.toLocaleString()}
    const st = cartData.reduce((acc:any, item) => {
      const price = Number(item.product.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + (price * quantity);
    }, 0);

    const ship = st > 20000 || st === 0 ? 0 : 2000;
    return {
      subtotal: st,
      shipping: ship,
      total: st + ship
    };
  }, [cartData]);

  // 4. Effects
  useEffect(() => {
    if (savedAddresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(savedAddresses[0]._id);
    } else if (!loadingAddresses && savedAddresses.length === 0) {
      setShowNewAddressForm(true);
    }
  }, [savedAddresses, selectedAddressId, loadingAddresses]);

  // 5. Handlers
  const handleAddNewAddress = async () => {
    // Basic validation
    if (!newAddress.address || !newAddress.firstName || !newAddress.phone) {
      toast({ title: "Missing Fields", description: "Please fill in the required address fields.", variant: "destructive" });
      return;
    }

    try {
      const result = await addAddress(newAddress).unwrap();
      setSelectedAddressId(result._id);
      setShowNewAddressForm(false);
      toast({ title: "Success", description: "Address saved!" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to save address", variant: "destructive" });
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddressId) {
      toast({ title: "Address Required", description: "Please select a shipping address to continue.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    // Simulate Order API Call
    setTimeout(() => {
      setOrderPlaced(true);
      setIsSubmitting(false);
      toast({ title: "Order Success", description: "Your books are on the way!" });
    }, 2000);
  };

  // 6. Conditional Rendering for Loading/Empty States
  if (isLoadingCart) {
    return (
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin h-10 w-10 text-primary" />
        </div>
    );
  }

  // Check for empty cart after loading is done
  if (!cartData || cartData.length === 0 && !orderPlaced) {
    return (
        <div className="container py-20 text-center flex flex-col items-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">You need items in your cart to checkout.</p>
          <Button asChild><Link href="/books">Browse Books</Link></Button>
        </div>
    );
  }

  if (orderPlaced) {
    return (
        <div className="container min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-in zoom-in duration-300">
          <CheckCircle2 className="h-20 w-20 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold">Order Received!</h1>
          <p className="text-muted-foreground mt-2 max-w-sm">Thank you for your purchase. We've sent the details to your email.</p>
          <Button asChild className="mt-8 px-10"><Link href="/books">Continue Shopping</Link></Button>
        </div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link href="/cart" className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">

            {/* Shipping Address Section */}
            <section className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Shipping Address
                </h2>
                {savedAddresses.length > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    >
                      {showNewAddressForm ? "Select Saved" : "Add New Address"}
                    </Button>
                )}
              </div>

              {loadingAddresses ? (
                  <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" /></div>
              ) : showNewAddressForm ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input value={newAddress.firstName} onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })} placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input value={newAddress.lastName} onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })} placeholder="Doe" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Street Address</Label>
                      <Input value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} placeholder="123 Bookstore Lane" />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} placeholder="Lagos" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} placeholder="080..." />
                    </div>
                    <div className='justify-start flex'>
                        <Button
                            className="md:col-span-2 mt-2 text-sm"
                            disabled={isAddingAddress}
                            onClick={handleAddNewAddress}
                        >
                          {isAddingAddress ? <Loader2 className="animate-spin mr-2" /> : "Save and Use Address"}
                        </Button>
                    </div>
                  </div>
              ) : (
                  <RadioGroup
                      value={selectedAddressId}
                      onValueChange={setSelectedAddressId}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {savedAddresses.map((addr: any) => (
                        <div key={addr._id} className="relative group">
                          <RadioGroupItem value={addr._id} id={addr._id} className="peer sr-only" />
                          <Label
                              htmlFor={addr._id}
                              className="flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                          >
                            <span className="font-bold text-sm">{addr.firstName} {addr.lastName}</span>
                            <span className="text-xs text-muted-foreground mt-1 line-clamp-1">{addr.address}</span>
                            <span className="text-xs text-muted-foreground">{addr.city}, {addr.state}</span>
                          </Label>
                        </div>
                    ))}
                  </RadioGroup>
              )}
            </section>

            {/* Payment Section */}
            <section className="bg-card border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" /> Payment Method
              </h2>
              <RadioGroup defaultValue="paystack" className="space-y-4">
                <div className="flex items-center space-x-3 border p-4 rounded-lg bg-muted/20">
                  <RadioGroupItem value="paystack" id="paystack" />
                  <Label htmlFor="paystack" className="flex-1 cursor-pointer font-medium">
                    Pay with Card / Transfer (Paystack)
                  </Label>
                  <div className="hidden sm:flex gap-2">
                    <div className="h-6 w-10 bg-slate-200 rounded animate-pulse" />
                    <div className="h-6 w-10 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
              </RadioGroup>
            </section>

           <div className='justify-end flex'>
             <Button
                 size="lg"
                 className="w-3rem h-10 text-sm font-bold shadow-lg"
                 onClick={handlePlaceOrder}
                 disabled={isSubmitting || !selectedAddressId}
             >
               {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : `Complete Order (₦${total.toLocaleString()})`}
             </Button>
           </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <Card className="sticky top-6 border-t-4 border-t-primary">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartData.map((item: any) => (
                      <div key={item._id || item.id} className="flex gap-3 text-sm border-b border-muted pb-3 last:border-0">
                        <div className="relative h-16 w-12 flex-shrink-0">
                          <Image
                              src={item.product?.thumbnail || item.image || "/placeholder.svg"}
                              alt={item.product?.title || item.name}
                              fill
                              className="rounded object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold line-clamp-1 text-xs uppercase tracking-tight">{item.product?.title || item.name}</p>
                          <p className="text-muted-foreground text-xs mt-1 italic">Qty: {item.quantity}</p>
                          <p className="font-bold text-primary mt-1">₦{((Number(item.product.price) || 0) * (Number(item.quantity) || 0)).toLocaleString()}</p>
                        </div>
                      </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-bold" : "font-medium"}>
                    {shipping === 0 ? "FREE" : `₦${shipping.toLocaleString()}`}
                  </span>
                  </div>
                  <Separator />

                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-black text-primary">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 text-green-700 text-[10px] leading-tight border border-green-100">
                    <ShieldCheck className="h-6 w-6 flex-shrink-0" />
                    <p>Transactions are secure and encrypted. Your data is protected by industry-standard SSL.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}