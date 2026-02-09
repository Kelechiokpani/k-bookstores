import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Shield className="h-14 w-14 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: February 7, 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <p className="text-lg leading-relaxed text-muted-foreground">
              At Kbook Stores, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or make a book purchase.
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Information We Collect
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We collect information about you in various ways when you use our
              website. This information may include:
            </p>
            <ul className="space-y-4">
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Personal Information:
                </strong>{" "}
                Name, email address, postal address, phone number, and other
                information you provide when creating an account, making a
                purchase, or contacting customer service.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Transaction Information:
                </strong>{" "}
                Details about book purchases or orders you make through our
                website, including payment information and delivery address.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Log Data:</strong>{" "}
                Information that your browser automatically sends whenever you
                visit our website, including your IP address, browser type,
                referring/exit pages, and timestamps.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Device Information:</strong>{" "}
                Information about the device you use to access our website,
                including hardware model, operating system, and unique device
                identifiers.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Cookies and Similar Technologies:
                </strong>{" "}
                We use cookies and similar tracking technologies to track
                activity on our website and hold certain information.
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We may use the information we collect about you to:
            </p>
            <ul className="space-y-3">
              <li className="text-muted-foreground leading-relaxed">
                • Process and fulfill your book orders
              </li>
              <li className="text-muted-foreground leading-relaxed">
                • Communicate with you about your orders, books, services, and
                promotional offers
              </li>
              <li className="text-muted-foreground leading-relaxed">
                • Maintain and improve our website and services
              </li>
              <li className="text-muted-foreground leading-relaxed">
                • Detect, investigate, and prevent fraudulent transactions and
                other illegal activities
              </li>
              <li className="text-muted-foreground leading-relaxed">
                • Comply with our legal obligations
              </li>
              <li className="text-muted-foreground leading-relaxed">
                • Respond to your inquiries and provide customer support
              </li>
              <li className="text-muted-foreground leading-relaxed">
                • Personalize your experience and deliver book recommendations
                relevant to your reading interests
              </li>
            </ul>
          </section>

          {/* Disclosure of Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Disclosure of Your Information
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We may share information we have collected about you in certain
              situations. Your information may be disclosed as follows:
            </p>
            <ul className="space-y-4">
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  By Law or to Protect Rights:
                </strong>{" "}
                If we believe the release of information about you is necessary
                to respond to legal process, to investigate or remedy potential
                violations of our policies, or to protect the rights, property,
                and safety of others, we may share your information as permitted
                or required by any applicable law, rule, or regulation.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Third-Party Service Providers:
                </strong>{" "}
                We may share your information with third parties that perform
                services for us or on our behalf, including payment processing,
                data analysis, email delivery, hosting services, customer
                service, and marketing assistance.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Marketing Communications:
                </strong>{" "}
                With your consent, or with an opportunity for you to withdraw
                consent, we may share your information with third parties for
                marketing purposes.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Business Transfers:</strong>{" "}
                If we or our assets are acquired, or in the unlikely event that
                we go out of business or enter bankruptcy, user information
                would be one of the assets that is transferred or acquired by a
                third party.
              </li>
            </ul>
          </section>

          {/* Security of Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Security of Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
          </section>

          {/* Your Choices About Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Your Choices About Your Information
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              You have certain choices regarding the information we collect and
              how it is used:
            </p>
            <ul className="space-y-4">
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Tracking Technologies:
                </strong>{" "}
                You can set your browser to refuse all or some browser cookies,
                or to alert you when cookies are being sent.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Marketing Communications:
                </strong>{" "}
                You can opt out of receiving marketing emails from us by
                following the unsubscribe instructions provided in the emails.
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Account Information:
                </strong>{" "}
                You can review and change your personal information by logging
                into your account settings.
              </li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you are under 13, do not use or provide any information on
              this website.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our privacy policy from time to time. We will notify
              you of any changes by posting the new privacy policy on this page
              and updating the "Last Updated" date at the top of this page. You
              are advised to review this privacy policy periodically for any
              changes.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-muted/50 p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              If you have questions or concerns about this privacy policy,
              please contact us at:
            </p>
            <address className="not-italic space-y-2 text-muted-foreground">
              <p className="font-semibold text-foreground">Kbook Stores</p>
              <p> Ahmadu Bello Way</p>
              <p>Central Business District, Abuja</p>
              <p>Nigeria</p>
              <p className="pt-2">
                Email:{" "}
                <a
                  href="mailto:k.books@gmail.com"
                  className="text-primary hover:underline"
                >
                  k.books@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+234 810 764 3469"
                  className="text-primary hover:underline"
                >
                  +234 810 764 3469
                </a>
              </p>
            </address>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <Link
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact Us
          </Link>
          <span className="text-muted-foreground mx-3">|</span>
          <Link
            href="/terms"
            className="text-primary hover:underline font-medium"
          >
            Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
