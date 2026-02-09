import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, ShieldCheck, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <Image
          src="/about.jpg"
          width={1600}
          height={500}
          alt="African library and bookstore"
          className="w-full h-[400px] object-cover"
          priority
        />
        <div className="container absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center h-[400px]  text-center">
          <BookOpen className="h-12 w-12 text-white mb-4" />
        

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Kbook Stores
          </h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Nigeria's premier online bookstore bringing quality literature and
            knowledge to readers across the nation.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4">
                <p>
                  Kbook Stores was founded in 2020 by a passionate team of
                  Nigerian entrepreneurs and bibliophiles who recognized the
                  need for an accessible, reliable online bookstore in Nigeria.
                </p>
                <p>
                  Based in Lagos with operations across Nigeria, we've grown to
                  become the go-to destination for Nigerians seeking quality
                  books—from local African authors to international bestsellers.
                </p>
                <p>
                  Our team includes Nigerian literature enthusiasts, book
                  lovers, and professionals who handpick every title, ensuring
                  we offer books that resonate with Nigerian culture and global
                  readership standards.
                </p>
                <p>
                  We're committed to promoting African literature, supporting
                  local authors, and making reading accessible and affordable
                  for every Nigerian. Books have the power to transform
                  minds—we're here to ensure every reader in Nigeria has access
                  to that power.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full z-0" />
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500&auto=format&fit=crop"
                width={500}
                height={500}
                alt="Kbook Stores founders with their book collection"
                className="rounded-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-lg mb-12">
            To be Nigeria's most trusted online bookstore, providing convenient
            access to quality literature while supporting African authors and
            promoting a reading culture across the nation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="p-3 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated for Nigerians</h3>
              <p className="text-muted-foreground">
                Every book is carefully selected to reflect Nigerian interests
                and global reading trends, including local and international
                titles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="p-3 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">African Authors First</h3>
              <p className="text-muted-foreground">
                We champion Nigerian and African authors, featuring their works
                prominently and providing a platform to discover incredible
                African voices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="p-3 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliable Delivery</h3>
              <p className="text-muted-foreground">
                Serving Lagos, Abuja, and major cities nationwide with secure,
                timely delivery and excellent customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Choose Kbook Stores?
          </h2>
          <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-12">
            We're not just another bookstore. Here's what sets us apart and
            makes us Nigeria's preferred choice for book lovers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Extensive Collection",
                description:
                  "From bestselling international titles to rare Nigerian literary works, we offer thousands of books across all genres.",
                icon: "📚",
              },
              {
                title: "Support Local Authors",
                description:
                  "We actively promote and showcase Nigerian and African authors, giving readers access to authentic local voices.",
                icon: "✍️",
              },
              {
                title: "Competitive Prices",
                description:
                  "We believe quality books should be affordable. Enjoy competitive pricing and regular discounts on your favorites.",
                icon: "💰",
              },
              {
                title: "Fast Nationwide Delivery",
                description:
                  "Whether you're in Lagos, Abuja, or anywhere in Nigeria, we deliver quickly and safely to your doorstep.",
                icon: "🚚",
              },
              {
                title: "Expert Recommendations",
                description:
                  "Our team of book experts provides personalized recommendations to help you discover your next great read.",
                icon: "⭐",
              },
              {
                title: "Customer-Centric Service",
                description:
                  "We're here to help. Enjoy hassle-free returns, responsive customer support, and a seamless shopping experience.",
                icon: "🤝",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Our Readers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Finally, a bookstore that understands Nigerian readers! Their selection of African authors is outstanding, and I've discovered so many amazing writers through Kbook Stores.",
                author: "Ngozi O.",
                location: "Lagos",
              },
              {
                quote:
                  "The delivery to Abuja was quick and reliable. It's so convenient to order books online and have them delivered right to my door. Highly recommended!",
                author: "Seun A.",
                location: "Abuja",
              },
              {
                quote:
                  "What I love most is their support for Nigerian authors. I found my favorite local author through them, and the customer service is exceptional.",
                author: "Ade C.",
                location: "Port Harcourt",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
              >
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-white/80">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Subscribe to our newsletter for personalized book recommendations,
            exclusive discounts, and updates on Nigerian and African authors.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md border flex-1"
              required
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
