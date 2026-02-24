"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
// import { products } from "@/lib/products";
import { useGetProductsQuery } from "@/features/products/productApi";
import ProductGrid from "@/components/product-grid";
import ShopFilters from "@/components/shop-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";




export default function BooksPage() {

    const { data: products = [], isLoading, error } = useGetProductsQuery();


    const searchParams = useSearchParams(); // ✅ client hook
    const [searchQuery, setSearchQuery] = useState("");

    // Get query params
    const categoryParam = searchParams.get("category") || "";
    const sortParam = searchParams.get("sort") || "";
    const minParam = searchParams.get("min") || "";
    const maxParam = searchParams.get("max") || "";

    const filteredProducts:any = useMemo(() => {
        let filtered = [...products];

        // 1. FIX: Check for p.category._id because category is an object
        if (categoryParam) {
            filtered = filtered.filter((p:any) => {
                const prodCategoryId:any = typeof p.category === 'object' ? p.category?._id : p.category;
                return prodCategoryId === categoryParam;
            });
        }

        // 2. Price Filtering
        if (minParam) {
            filtered = filtered.filter((p) => p.price >= parseFloat(minParam));
        }
        if (maxParam) {
            filtered = filtered.filter((p) => p.price <= parseFloat(maxParam));
        }

        // 3. Sorting
        if (sortParam) {
            if (sortParam === "price-asc") filtered.sort((a, b) => a.price - b.price);
            if (sortParam === "price-desc") filtered.sort((a, b) => b.price - a.price);
            if (sortParam === "newest") filtered.sort((a:any, b) =>
                new Date(b.createdAt).getTime() - new Date(a.getTime()).getTime()
            );
        }

        // 4. Search
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((p:any) =>
                p.title.toLowerCase().includes(query) ||
                p.brand?.name?.toLowerCase().includes(query) // Added search by Author/Brand too!
            );
        }

        return filtered;
    }, [products, categoryParam, sortParam, minParam, maxParam, searchQuery]);

    if (isLoading) return <ProductGridSkeleton />;

    return (
        <motion.div
            className="container px-4 py-8 md:py-12 max-w-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <h1 className="text-2xl font-bold mb-2">Books & Literature</h1>
                <p className="text-muted-foreground text-md">
                    Explore our extensive collection of quality books from Nigerian and
                    international authors
                </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <h3 className="text-sm font-medium mb-2">Search Books</h3>
                <Input
                    type="search"
                    placeholder="Search for books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-1 md:max-w-md"
                />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <ShopFilters products={products} />
                </motion.div>

                <div>
                    <motion.div
                        className="mb-6 text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Showing {filteredProducts.length} book
                        {filteredProducts.length !== 1 ? "s" : ""}
                    </motion.div>

                    {/* Suspense wrapper for the product grid */}
                    <Suspense fallback={<ProductGridSkeleton />}>
                        <motion.div
                            layout
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.1 } },
                            }}
                        >
                            <ProductGrid products={filteredProducts} />
                        </motion.div>
                    </Suspense>
                </div>
            </div>
        </motion.div>
    );
}

// Skeleton Loader
function ProductGridSkeleton() {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                >
                    <Skeleton className="h-60 w-full rounded-lg" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
