import Link from "next/link";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
          <p className="text-muted-foreground text-sm">
            Last updated: February 7, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          <p className="mb-4">
            Welcome to Kbook Stores. These Terms and Conditions outline the
            rules and regulations for using our website. By accessing this
            website, you agree to comply with these terms. If you do not accept
            all the terms and conditions, please do not use our website.
          </p>

          <h2 className="mt-6 mb-3">1. Definitions</h2>
          <p className="mb-4">
            The following terminology applies to these Terms and Conditions,
            Privacy Policy, and any other agreements: "Client", "You" and "Your"
            refers to you, the person accessing this website and agreeing to
            Kbook Stores' terms. "The Company", "We", "Our" and "Us" refer to
            Kbook Stores. "Party" or "Parties" refers to both the Client and
            ourselves, or either of them individually.
          </p>

          <h2 className="mt-6 mb-3">2. Intellectual Property</h2>
          <p className="mb-4">
            All content, including text, images, logos, and designs, is the
            property of Kbook Stores or its licensors. You may browse, view, and
            print pages for personal use only. You may not:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Republish material from the website without permission</li>
            <li>Sell, rent, or sublicense material from the website</li>
            <li>Reproduce, duplicate, or copy content without authorization</li>
            <li>
              Redistribute content from Kbook Stores unless specifically allowed
            </li>
          </ul>

          <h2 className="mt-6 mb-3">3. User Comments and Reviews</h2>
          <p className="mb-4">
            Users may post reviews and comments on books and content. Kbook
            Stores does not pre-screen comments, and they reflect only the
            opinion of the user.
          </p>
          <p className="mb-2">
            You are responsible for ensuring that your comments:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Do not violate these Terms and Conditions</li>
            <li>
              Do not infringe on third-party rights (copyright, trademark,
              privacy, etc.)
            </li>
            <li>Are not illegal, offensive, defamatory, or harmful</li>
            <li>
              Do not solicit personal information from minors or exploit minors
              in any way
            </li>
          </ul>

          <h2 className="mt-6 mb-3">4. Product Information</h2>
          <p className="mb-4">
            Kbook Stores strives to provide accurate book descriptions, pricing,
            and images. However, we do not guarantee that all information is
            accurate, complete, or up-to-date. If a book is not as described,
            your sole remedy is to return it in unused condition.
          </p>

          <h2 className="mt-6 mb-3">5. Pricing and Payment</h2>
          <p className="mb-4">
            All prices are in Nigerian Naira (₦) unless otherwise stated. Prices
            are subject to change without notice. Kbook Stores reserves the
            right to correct errors in pricing.
          </p>
          <p className="mb-4">
            Payments can be made using available methods, such as Visa,
            MasterCard, PayPal, or other secure online payment systems.
          </p>

          <h2 className="mt-6 mb-3">6. Shipping and Delivery</h2>
          <p className="mb-4">
            Kbook Stores ships to addresses within Nigeria. Delivery dates are
            estimates and depend on stock availability and shipping options. We
            are not responsible for delays caused by the shipping provider.
          </p>

          <h2 className="mt-6 mb-3">7. Returns and Refunds</h2>
          <p className="mb-4">
            We offer a 14-day return policy for most books. Returned items must
            be unused, in their original condition, and in original packaging.
            Certain items, such as eBooks or promotional items, are
            non-returnable.
          </p>

          <h2 className="mt-6 mb-3">8. Disclaimer</h2>
          <p className="mb-4">
            All content on Kbook Stores' website is provided "as is". Kbook
            Stores makes no warranties, expressed or implied, regarding the
            accuracy or reliability of information or products.
          </p>

          <h2 className="mt-6 mb-3">9. Limitation of Liability</h2>
          <p className="mb-4">
            Kbook Stores shall not be liable for any damages, including loss of
            data, profit, or business interruption, arising from the use of our
            website or products, even if advised of the possibility.
          </p>

          <h2 className="mt-6 mb-3">10. Governing Law</h2>
          <p className="mb-4">
            These Terms are governed by Nigerian law, and any disputes are
            subject to the exclusive jurisdiction of Nigerian courts.
          </p>

          <h2 className="mt-6 mb-3">11. Changes to Terms</h2>
          <p className="mb-4">
            Kbook Stores reserves the right to modify these Terms at any time.
            It is your responsibility to review this page periodically for
            updates.
          </p>

          <h2 className="mt-6 mb-3">12. Contact Information</h2>
          <p className="mb-2">
            For questions about these Terms of Service, contact us at:
          </p>

          <address className="not-italic text-sm">
            Ahmadu Bello Way
            <br />
            Central Business District, Abuja
            <br />
            Nigeria
            <br />
            Email:{" "}
            <a
              href="mailto:k.books@gmail.com"
              className="text-primary hover:underline"
            >
              k.books@gmail.com
            </a>
            <br />
            Phone: +234 810 764 3469
          </address>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center space-x-4">
          <Link href="/contact" className="text-primary hover:underline">
            Contact Us
          </Link>
          <span>|</span>
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
