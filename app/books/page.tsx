"use client";
import { Suspense } from "react";
import BooksPage from "@/components/Books/Books";

export default function Books_Home() {
  return (
      <Suspense fallback={<div>Loading books...</div>}>
        <BooksPage />
      </Suspense>
  );
}
