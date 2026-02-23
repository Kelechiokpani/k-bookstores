"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetCategoriesQuery } from "@/features/category/categoryApi";

export default function ShopFilters({ products = [] }: { products: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: categories = [], isLoading: loadingCats } = useGetCategoriesQuery();

  // 1. Correctly extract Category IDs from the nested product object
  const availableCategoryIds = useMemo(() => {
    // If category is an object, take ._id. If it's a string, take it directly.
    return new Set(
        products.map((p: any) =>
            typeof p?.category === 'object' ? p?.category?._id : p?.category
        )
    );
  }, [products]);

  // URL Values
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "";
  const currentMinPrice = Number(searchParams.get("min")) || 0;
  const currentMaxPrice = Number(searchParams.get("max")) || 50000;

  const [category, setCategory] = useState(currentCategory);
  const [sort, setSort] = useState(currentSort);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentMinPrice,
    currentMaxPrice,
  ]);

  // Sync state with URL changes (important for back button)
  useEffect(() => {
    setCategory(currentCategory);
    setSort(currentSort);
    // Only update price range if it actually changed to avoid slider jitter
    if (currentMinPrice !== priceRange[0] || currentMaxPrice !== priceRange[1]) {
      setPriceRange([currentMinPrice, currentMaxPrice]);
    }
  }, [currentCategory, currentSort, currentMinPrice, currentMaxPrice]);

  // Debounced URL Update
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (category) params.set("category", category);
      else params.delete("category");

      if (sort) params.set("sort", sort);
      else params.delete("sort");

      // Price logic
      if (priceRange[0] > 0) params.set("min", priceRange[0].toString());
      else params.delete("min");

      if (priceRange[1] < 50000) params.set("max", priceRange[1].toString());
      else params.delete("max");

      router.push(`/books?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(handler);
  }, [category, sort, priceRange, router, searchParams]);

  const resetFilters = () => {
    setCategory("");
    setSort("");
    setPriceRange([0, 50000]);
    router.push("/books");
  };

  const hasActiveFilters = category || sort || priceRange[0] > 0 || priceRange[1] < 50000;

  return (
      <div className="space-y-6 bg-card p-1 rounded-lg">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold tracking-tight">Filters</h3>
          {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10">
                Reset All
              </Button>
          )}
        </div>

        {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {category && (
                  <Badge variant="secondary" className="pl-2 pr-1 py-1 gap-1 text-[10px]">
                    {/* Ensure we match by ID but show the Name */}
                    {categories.find((c: any) => c._id === category)?.name || "Category"}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setCategory("")} />
                  </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 50000) && (
                  <Badge variant="secondary" className="py-1 text-[10px]">
                    ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                  </Badge>
              )}
            </div>
        )}

        <Accordion type="multiple" defaultValue={["category", "price", "sort"]} className="w-full">
          {/* Category Accordion */}
          <AccordionItem value="category" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 font-semibold text-sm">Category</AccordionTrigger>
            <AccordionContent className="pt-1">
              {loadingCats ? (
                  <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></div>
              ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map((cat: any) => (
                        <div key={cat._id} className="flex items-center space-x-3 group">
                          <Checkbox
                              id={`cat-${cat._id}`}
                              checked={category === cat._id}
                              onCheckedChange={() => setCategory(category === cat._id ? "" : cat._id)}
                          />
                          <Label
                              htmlFor={`cat-${cat._id}`}
                              className={`text-sm cursor-pointer transition-colors ${
                                  availableCategoryIds.has(cat._id)
                                      ? "font-medium text-foreground"
                                      : "text-muted-foreground/60"
                              }`}
                          >
                            {cat.name}
                            {availableCategoryIds.has(cat._id) && (
                                <span className="ml-2 inline-block w-1.5 h-1.5 bg-green-500 rounded-full" />
                            )}
                          </Label>
                        </div>
                    ))}
                  </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Price Slider Accordion */}
          <AccordionItem value="price" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 font-semibold text-sm">Price Range</AccordionTrigger>
            <AccordionContent className="pt-4 px-1">
              <Slider
                  min={0}
                  max={50000}
                  step={100}
                  value={priceRange}
                  onValueChange={(val) => setPriceRange([val[0], val[1]])}
                  className="mb-6"
              />
              <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md text-[11px] font-mono">
                <span className="font-bold">₦{priceRange[0].toLocaleString()}</span>
                <span className="text-muted-foreground">to</span>
                <span className="font-bold">₦{priceRange[1].toLocaleString()}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Sort Accordion */}
          <AccordionItem value="sort" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 font-semibold text-sm">Sort By</AccordionTrigger>
            <AccordionContent className="pt-1 space-y-3">
              {[
                { id: "price-asc", label: "Price: Low to High" },
                { id: "price-desc", label: "Price: High to Low" },
                { id: "newest", label: "Newest First" },
              ].map((option) => (
                  <div key={option.id} className="flex items-center space-x-3 group">
                    <Checkbox
                        id={option.id}
                        checked={sort === option.id}
                        onCheckedChange={() => setSort(sort === option.id ? "" : option.id)}
                    />
                    <Label htmlFor={option.id} className="text-sm cursor-pointer hover:text-primary transition-colors">
                      {option.label}
                    </Label>
                  </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
}