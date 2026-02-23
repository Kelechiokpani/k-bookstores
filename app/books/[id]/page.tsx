"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Truck, RotateCcw, ShieldCheck, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddToCartButton from "@/components/add-to-cart-button";
import ProductQuantity from "@/components/product-quantity";
import RelatedProducts from "@/components/related-products";
import { cn } from "@/lib/utils";
import WishlistButton from "@/components/wishlist-button";
import { useGetProductQuery, useGetProductsQuery } from "@/features/products/productApi";



export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: product, isLoading: isProductLoading, error: productError } = useGetProductQuery(id);
  const { data: allProducts = [] } = useGetProductsQuery();

  if (isProductLoading) {
    return (
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );
  }

  if (productError || !product) return notFound();

  // Related products logic: Match by category name or ID

  // @ts-ignore
  const relatedProducts:any = allProducts.filter((p:any) => p._id !== product._id && p.category?._id === product?.category?._id)
      .slice(0, 4) as any;

  // Price Calculation logic
  const originalPrice:any = product.discountPercentage > 0
      ? Math.round(product.price / (1 - product.discountPercentage / 100))
      : product.price;


  return (
      <div className="container px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="md:w-1/2">
            <div className="sticky top-20">
              <div className="aspect-square overflow-hidden rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                <Image
                    src={product.images?.[0] || product.thumbnail}
                    alt={product.title}
                    width={800}
                    height={800}
                    className="h-full w-full object-contain p-4 transition-transform hover:scale-105"
                    priority
                />
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/2">
            <nav className="mb-4">
              <Link href="/books" className="text-xs font-medium uppercase tracking-wider text-primary hover:opacity-70">
                {/*// @ts-ignore*/}
                {product?.category?.name} Collection
              </Link>
            </nav>

            <h1 className="text-4xl font-serif font-bold text-slate-900 leading-tight">
              {product?.title}
            </h1>

            <p className="mt-3 text-lg text-muted-foreground italic">
              {/*// @ts-ignore*/}
              by <span className="font-semibold text-slate-800 not-italic">{product?.brand?.name}</span>
            </p>

            <div className="mt-8 flex items-baseline gap-4">
            <span className="text-3xl font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </span>
              {product.discountPercentage > 0 && (
                  <>
                <span className="text-xl text-slate-400 line-through">
                  ₦{originalPrice.toLocaleString()}
                </span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-sm font-bold">
                  -{product.discountPercentage}%
                </span>
                  </>
              )}
            </div>

            <div className="mt-8 space-y-6">
              <p className="text-slate-600 leading-relaxed text-md">
                {product.description}
              </p>

              <div className="flex items-center gap-2 py-2">
                <div className={cn(
                    "h-2.5 w-2.5 rounded-full animate-pulse",
                    product.stockQuantity > 10 ? "bg-emerald-500" : "bg-amber-500"
                )} />
                <span className="text-sm font-medium text-slate-700">
                {product.stockQuantity} copies available for immediate delivery
              </span>
              </div>

              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <ProductQuantity maxQuantity={product.stockQuantity} />
                  <AddToCartButton productId={product._id} className="flex-1 h-10 w-full text-sm" />
                  <WishlistButton productId={product._id} variant="outline" className=" h-10" />
                </div>

              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t">
                <Feature icon={<Truck size={20} />} label="Fast Delivery" />
                <Feature icon={<RotateCcw size={20} />} label="Easy Returns" />
                <Feature icon={<ShieldCheck size={20} />} label="Secure Pay" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
              <TabsTrigger value="details" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 py-4 bg-transparent shadow-none font-bold text-lg">
                Book Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">
                {/*// @ts-ignore*/}
                <DetailItem label="Author" value={product.brand?.name} />
                {/*// @ts-ignore*/}
                <DetailItem label="Category" value={product.category?.name} />
                <DetailItem label="Stock Quantity" value={product.stockQuantity.toString()} />
                <DetailItem label="Status" value={product.isDeleted ? "Discontinued" : "Active"} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-24">
          {/*// @ts-ignore*/}
          <h3 className="text-2xl font-bold mb-8">More from the {product.category?.name} category</h3>
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
      <div className="flex flex-col items-center gap-2 text-slate-500">
        <div className="p-3 bg-slate-50 rounded-full text-primary">{icon}</div>
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
      <div className="flex flex-col gap-1">
        <span className="text-sm text-slate-400 font-medium uppercase tracking-tighter">{label}</span>
        <span className="text-xs font-semibold text-slate-800">{value}</span>
      </div>
  );
}



// "use client";
//
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams, notFound } from "next/navigation";
// import { Truck, RotateCcw, ShieldCheck, Loader2 } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import AddToCartButton from "@/components/add-to-cart-button";
// import ProductQuantity from "@/components/product-quantity";
// import RelatedProducts from "@/components/related-products";
// import { cn } from "@/lib/utils";
// import WishlistButton from "@/components/wishlist-button";
// import {useGetProductQuery, useGetProductsQuery} from "@/features/products/productApi";
//
// export default function ProductPage() {
//   const params = useParams();
//   const id = params?.id as string;
//
//   // 1. Fetch single product directly from DB using the ID
//   const { data: product, isLoading: isProductLoading, error: productError } = useGetProductQuery(id);
//
//   // 2. Fetch all products (for the related products section)
//   const { data: allProducts = [], isLoading: isListLoading } = useGetProductsQuery();
//
//
//   if (isProductLoading) {
//     return (
//         <div className="flex h-[70vh] items-center justify-center">
//           <Loader2 className="h-10 w-10 animate-spin text-primary" />
//         </div>
//     );
//   }
//
//   if (productError || !product) {
//     notFound();
//   }
//
//   // Related products logic
//   const relatedProducts = allProducts
//       .filter((p) => p._id !== product._id && p.category === product.category)
//       .slice(0, 4);
//
//   return (
//       <div className="container px-4 py-8 md:py-12">
//         <div className="flex flex-col md:flex-row justify-end gap-8 lg:gap-16">
//           {/* Product Image */}
//           <div className="">
//             <div className="sticky top-20">
//               <div className="aspect-square overflow-hidden rounded-lg bg-muted border">
//                 <Image
//                     src={product.images?.[0] || "/placeholder.png"}
//                     alt={product.title || "Product Image"}
//                     width={500}
//                     height={500}
//                     className="h-full object-cover"
//                     priority
//                 />
//               </div>
//             </div>
//           </div>
//
//           {/* Product Details */}
//           <div className="md:w-1/2">
//             <div className="mb-6">
//               <Link href="/books" className="text-sm text-primary hover:underline">
//                 ← Back to Books
//               </Link>
//             </div>
//
//             <h1 className="text-2xl font-bold">{product.title}</h1>
//
//             <p className="mt-2 text-muted-foreground text-md">
//               {/* If brand is populated, it shows the author's name */}
//               {typeof product.brand === 'object' ? product.brand.name : "Unknown Author"}
//             </p>
//
//             <div className="mt-6">
//               <div className="flex items-center gap-3">
//               <span className="text-2xl font-bold text-primary">
//                 ₦{product.price.toLocaleString()}
//               </span>
//                 {product.discountPercentage > 0 && (
//                     <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
//                   {product.discountPercentage}% OFF
//                 </span>
//                 )}
//               </div>
//             </div>
//
//             <div className="mt-6 space-y-6">
//               <p className="text-muted-foreground leading-relaxed">
//                 {product.description}
//               </p>
//
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <div className={cn(
//                       "h-3 w-3 rounded-full mr-2",
//                       product.stockQuantity > 0 ? "bg-green-500" : "bg-red-500"
//                   )} />
//                   <span className="font-medium">
//                   {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
//                     ({product.stockQuantity} available)
//                 </span>
//                 </div>
//               </div>
//
//               <div className="pt-4 space-y-4">
//                 <ProductQuantity maxQuantity={product.stockQuantity} />
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <AddToCartButton  productId={product._id} className="flex-1"  />
//                   <WishlistButton productId={product._id} variant="outline" size="default" />
//                 </div>
//               </div>
//
//               {/* Badges */}
//               <div className="border-t border-b py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
//                   <Truck className="h-5 w-5 text-primary mb-1" />
//                   <span className="text-xs font-bold">Fast Delivery</span>
//                 </div>
//                 <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
//                   <RotateCcw className="h-5 w-5 text-primary mb-1" />
//                   <span className="text-xs font-bold">7-Day Return</span>
//                 </div>
//                 <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
//                   <ShieldCheck className="h-5 w-5 text-primary mb-1" />
//                   <span className="text-xs font-bold">Secure Payment</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         {/* Tabs */}
//         <div className="mt-16">
//           <Tabs defaultValue="description">
//             <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
//               <TabsTrigger value="description" className="px-8 py-3 data-[state=active]:border-b-2 border-primary">Description</TabsTrigger>
//               <TabsTrigger value="details" className="px-8 py-3 data-[state=active]:border-b-2 border-primary">Product Details</TabsTrigger>
//             </TabsList>
//             <TabsContent value="description" className="pt-6">
//               {product.description}
//             </TabsContent>
//             <TabsContent value="details" className="pt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
//                 <DetailRow label="Category" value={typeof product.category === 'object' ? product.category.name : "N/A"} />
//                 <DetailRow label="Stock Status" value={`${product.stockQuantity} units`} />
//                 <DetailRow label="Product ID" value={product._id} />
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold mb-6">Related Books</h2>
//           <RelatedProducts products={relatedProducts} />
//         </div>
//       </div>
//   );
// }
//
// function DetailRow({ label, value }: { label: string; value: string }) {
//   return (
//       <div className="flex justify-between border-b py-3">
//         <span className="text-muted-foreground">{label}</span>
//         <span className="font-medium">{value}</span>
//       </div>
//   );
// }