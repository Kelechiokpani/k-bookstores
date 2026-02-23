"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  HeadphonesIcon,
  Users,
  Sparkles,
} from "lucide-react";
import ProductCard from "@/components/product-card";
// import { products } from "@/lib/products";
import HeroSlider from "@/components/hero-slider";
import Image from "next/image";
import { motion } from "framer-motion";
import {useGetProductsQuery} from "@/features/products/productApi";

export default function Home() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();


  const featuredProducts = products;
  const nigerianAuthors = products
    .filter((p) => p.brand === "Chinua Achebe")
    .slice(0, 4);
  const bestsellerBooks = products
    .filter((p) => p.category === "fiction")
    .slice(0, 4);



  const productsByBrand = products?.reduce((acc: any, product: any) => {
    const brandName = product.brand || "Other Authors";
    if (!acc[brandName]) acc[brandName] = [];
    acc[brandName].push(product);
    return acc;
  }, {});

// 2. Group by Category (e.g., Fiction, Non-Fiction)
  const productsByCategory = products?.reduce((acc: any, product: any) => {
    const catName = product.category || "General";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(product);
    return acc;
  }, {});


  const brandCollections = products?.slice(0, 4) || [];
  const categoryCollections = products?.slice(4, 8) || [];


  // Motion Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <HeroSlider
        slides={[
          {
            image: "/banner/b1.webp",
            title: "Dive Into the World of Literature",
            description:
              "Discover timeless classics and modern masterpieces at Kbook Stores.",
            buttonText: "Start Reading",
            buttonLink: "/books",
          },
          {
            image: "/banner/b2.avif",
            title: "Celebrate African Storytelling",
            description:
              "Explore a curated collection of books from Nigeria and across Africa.",
            buttonText: "Shop African Authors",
            buttonLink: "/books",
          },
          {
            image: "/banner/b3.jpg",
            title: "Bestsellers & Must-Reads",
            description:
              "Find the most popular books, new releases, and hidden gems all in one place.",
            buttonText: "Browse Bestsellers",
            buttonLink: "/books",
          },
          {
            image: "/banner/b4.jpg",
            title: "Your Cozy Reading Corner",
            description:
              "Create moments of calm and adventure with our selection of books for every mood.",
            buttonText: "Discover Now",
            buttonLink: "/books",
          },
        ]}
      />

      {/* Features Section */}
      <section className="py-12  bg-muted">
        <div className="container px-4">
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                icon: Truck,
                title: "Fast Delivery Nationwide",
                desc: "2-5 business days delivery across Nigeria",
              },
              {
                icon: RotateCcw,
                title: "14-Day Returns",
                desc: "Easy returns on books in original condition",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payment",
                desc: "100% secure payment processing",
              },
              {
                icon: HeadphonesIcon,
                title: "Expert Support",
                desc: "Book recommendations from our team",
              },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Card className="bg-white border-none shadow-sm">
                  <CardContent className="flex flex-col items-center text-center p-8">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container px-4 max-w-7xl">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Books
              </h2>
              <p className="text-muted-foreground mt-2">
                Handpicked selections from our curated collection
              </p>
            </div>
            <Button
              asChild
              variant="link"
              className="text-primary mt-2 md:mt-0"
            >
              <Link href="/books">View All Books</Link>
            </Button>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {featuredProducts.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Nigerian Authors & Bestsellers */}
      <section className="py-16 bg-muted ">
        <div className="container px-4 max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Nigerian Authors */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-2xl font-bold">Nigerian Authors</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Celebrate African voices and support local talent
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brandCollections.map((item: any) => (
                    <motion.div key={item._id} variants={fadeInUp}>
                      <ProductCard product={item} />
                    </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link href="/books">Explore Authors</Link>
                </Button>
              </div>
            </motion.div>

            {/* Bestsellers */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center mb-6">
                <Sparkles className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-2xl font-bold">Bestsellers</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Most loved and highly rated books
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoryCollections.map((product) => (
                  <motion.div key={product._id} variants={fadeInUp}>
                    <ProductCard product={product} compact />
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link href="/books">View All Bestsellers</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <motion.div
          className="container px-4 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Kbook Stores Logo"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-white/90 mb-6">
            Subscribe to our newsletter for book recommendations, exclusive
            discounts, and updates on Nigerian and African authors.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md flex-1 text-black"
              required
            />
            <Button className="bg-white text-primary hover:bg-white/90">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
