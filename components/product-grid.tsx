import {Product} from "@/features/products/productSlice";

import ProductCard from "@/components/product-card"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }:any) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product:any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
