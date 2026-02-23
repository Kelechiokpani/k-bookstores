import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import {Providers} from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "K-Book Stores - Discover Your Next Great Read",
  description:
    "Nigeria's premier online bookstore offering quality literature from African and international authors",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
      {/*<CartProvider>*/}
      {/*  <div className="flex min-h-screen flex-col">*/}
      {/*    <Header />*/}
      {/*    <main className="flex-1">{children}</main>*/}
      {/*    <Footer />*/}
      {/*  </div>*/}
      {/*  <Toaster />*/}
      {/*</CartProvider>*/}

      <Providers>
        <div className="flex min-h-screen flex-col">
          <Header/>
          <main className="flex-1">{children}</main>
          <Footer/>
        </div>
        <Toaster/>
          <Toaster />
      </Providers>


      </body>
    </html>
  );
}
