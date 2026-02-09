import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/lib/products";
import AddToCartButton from "@/components/add-to-cart-button";
import ProductQuantity from "@/components/product-quantity";
import RelatedProducts from "@/components/related-products";
import { cn } from "@/lib/utils";
import WishlistButton from "@/components/wishlist-button";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products by category only
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="sticky top-20">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <div className="mb-6">
            <Link href="/shop" className="text-sm text-primary hover:underline">
              Back to Shop
            </Link>
          </div>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Author */}
          <p className="mt-2 text-muted-foreground">
            by <span className="font-medium">{product.author}</span>
          </p>

          {/* Price */}
          <div className="mt-6">
            {product.originalPrice && product.originalPrice > product.price ? (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">
                  ₦{product.price.toLocaleString()}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Save ₦
                  {(product.originalPrice - product.price).toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary">
                ₦{product.price.toLocaleString()}
              </span>
            )}
          </div>

          <div className="mt-6 space-y-6">
            <p className="text-muted-foreground">{product.description}</p>

            {/* Stock indicator */}
            <div className="space-y-2">
              <div className="flex items-center">
                <div
                  className={cn(
                    "h-3 w-3 rounded-full mr-2",
                    product.stock > 20
                      ? "bg-green-500"
                      : product.stock > 0
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  )}
                />
                <span>
                  {product.stock > 20
                    ? "In Stock"
                    : product.stock > 0
                    ? `Low Stock (₦{product.stock} left)`
                    : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Truck className="mr-2 h-4 w-4" />
                <span>Delivery available nationwide</span>
              </div>
            </div>

            {/* Purchase */}
            <div className="pt-4 space-y-4">
              <ProductQuantity maxQuantity={product.stock} />

              <div className="flex flex-col sm:flex-row gap-3">
                <AddToCartButton product={product} className="flex-1" />
                <WishlistButton
                  productId={product.id}
                  variant="outline"
                  size="default"
                />
              </div>
            </div>

            {/* Trust badges */}
            <div className="border-t border-b py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    Nationwide shipping
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">
                    7-day return policy
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Secure Checkout</p>
                  <p className="text-xs text-muted-foreground">
                    Protected payments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <p>{product.description}</p>
          </TabsContent>

          <TabsContent value="details" className="pt-6">
            <div className="space-y-2">
              <p>
                <strong>Author:</strong> {product.author}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Availability:</strong> {product.stock} copies in stock
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Books</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
