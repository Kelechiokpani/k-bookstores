"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          {/* Decorative Elements */}
          <div className="mb-8 relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-10">
              <BookOpen className="w-48 h-48 text-primary" />
            </div>

            {/* 404 Display */}
            <div className="relative z-10">
              <div className="text-9xl font-bold text-primary mb-2 drop-shadow-lg">
                404
              </div>
              <div className="inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-lg rounded-full" />
                <p className="text-3xl md:text-4xl font-bold text-foreground relative z-10">
                  Oops! Page Not Found
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 mt-12">
            We couldn't find the page you were looking for. It might have been
            moved or no longer exists. But don't worry—there are plenty of great
            books waiting for you at Kbook Stores!
          </p>

          {/* Search Suggestion */}
          <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Search className="w-5 h-5" />
              <span className="font-semibold">What were you looking for?</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Nigerian Authors",
                "Bestsellers",
                "Fiction",
                "Non-Fiction",
                "Browse All",
              ].map((item) => (
                <Link key={item} href="/books">
                  <span className="inline-block px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm font-medium transition-colors cursor-pointer">
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Link href="/books">
              <Button size="lg" variant="outline" className="gap-2">
                <BookOpen className="w-5 h-5" />
                Browse Books
              </Button>
            </Link>
          </div>

          {/* Decorative Books */}
          <div className="mt-16 flex justify-center gap-8 opacity-20">
            <div className="w-16 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded transform -rotate-12" />
            <div className="w-16 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded transform rotate-12" />
            <div className="w-16 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded transform -rotate-6" />
          </div>
        </div>
      </main>
    </div>
  );
}
