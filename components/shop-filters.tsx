"use client";

import { useState, useEffect } from "react";
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
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL values
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "";
  const currentMinPrice = searchParams.get("min")
    ? Number(searchParams.get("min"))
    : 2000;
  const currentMaxPrice = searchParams.get("max")
    ? Number(searchParams.get("max"))
    : 5000;

  // State
  const [category, setCategory] = useState(currentCategory);
  const [sort, setSort] = useState(currentSort);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentMinPrice,
    currentMaxPrice,
  ]);

  // Update URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    category ? params.set("category", category) : params.delete("category");
    sort ? params.set("sort", sort) : params.delete("sort");

    if (priceRange[0] > 2000) params.set("min", priceRange[0].toString());
    else params.delete("min");

    if (priceRange[1] < 5000) params.set("max", priceRange[1].toString());
    else params.delete("max");

    router.push(`/books?${params.toString()}`);
  }, [category, sort, priceRange, router, searchParams]);

  // Reset
  const resetFilters = () => {
    setCategory("");
    setSort("");
    setPriceRange([2000, 5000]);
    router.push("/books");
  };

  const hasActiveFilters =
    category || sort || priceRange[0] > 2000 || priceRange[1] < 5000;

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Active Filters</h3>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </div>
      )}

      {/* Active badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-2">
          {category && <Badge variant="secondary">Category: {category}</Badge>}
          {(priceRange[0] > 2000 || priceRange[1] < 5000) && (
            <Badge variant="secondary" className="mt-4">
              ₦{priceRange[0]} - ₦{priceRange[1]}
            </Badge>
          )}
        </div>
      )}

      <Accordion type="multiple" defaultValue={["category", "price", "sort"]}>
        {/* Category */}
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            {[
              "fiction",
              "history",
              "romance",
              "science",
              "classic",
              "self-help",
              "psychology",
            ].map((cat) => (
              <div key={cat} className="flex items-center space-x-2 mt-6">
                <Checkbox
                  checked={category === cat}
                  onCheckedChange={() =>
                    setCategory(category === cat ? "" : cat)
                  }
                />
                <Label className="capitalize">{cat}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider
              min={2000}
              max={5000}
              step={100}
              value={priceRange}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="my-6"
            />
            <div className="flex justify-between text-sm">
              <span>₦{priceRange[0]}</span>
              <span>₦{priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sort */}
        <AccordionItem value="sort">
          <AccordionTrigger>Sort By</AccordionTrigger>
          <AccordionContent>
            {[
              { id: "price-asc", label: "Price: Low to High" },
              { id: "price-desc", label: "Price: High to Low" },
              { id: "newest", label: "Newest First" },
            ].map((option) => (
              <div key={option.id} className="flex items-center space-x-2 mt-4">
                <Checkbox
                  checked={sort === option.id}
                  onCheckedChange={() =>
                    setSort(sort === option.id ? "" : option.id)
                  }
                />
                <Label>{option.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
