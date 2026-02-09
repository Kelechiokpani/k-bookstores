import { Suspense } from "react";

export default function BooksPage() {
  return (
      <Suspense fallback={<div>Loading books...</div>}>
        <BooksPage />
      </Suspense>
  );
}
