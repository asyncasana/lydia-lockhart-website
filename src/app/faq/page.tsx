// Force dynamic rendering for instant Sanity content updates
export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  getFAQs,
  getNavigationData,
  getFooterData,
  getFooterPages,
  PortableText,
  FAQ,
} from "@/lib/sanity";
import { portableTextComponents } from "@/components/PortableTextComponents";

export const metadata: Metadata = {
  title: "FAQ | Lydia Lockhart",
  description:
    "Frequently asked questions about child life coaching, family support, and our services.",
};

// FAQ Accordion Component
function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <details className="group border border-gray-200 rounded-lg mb-4">
      <summary className="flex items-center justify-between w-full px-6 py-4 font-medium text-left bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors group-open:bg-spearmint group-open:text-blue-gray">
        <span className="text-lg">{faq.question}</span>
        <svg
          className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="px-6 py-4 bg-white">
        <div className="prose prose-gray max-w-none">
          {faq.answer && faq.answer.length > 0 ? (
            <PortableText
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={faq.answer as any}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              components={portableTextComponents as any}
            />
          ) : (
            <p className="text-gray-600">
              This FAQ answer will be populated from your Sanity CMS once you
              add content.
            </p>
          )}
        </div>
      </div>
    </details>
  );
}

export default async function FAQPage() {
  // Fetch data from Sanity
  const [faqCategories, navigationData, footerData, footerPages] =
    await Promise.all([
      getFAQs(),
      getNavigationData(),
      getFooterData(),
      getFooterPages(),
    ]);

  return (
    <>
      <Header navigationData={navigationData || undefined} />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Find answers to common questions about our services and approach.
            </p>

            {faqCategories.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  No FAQs available yet
                </h2>
                <p className="text-gray-600">
                  Check back soon for helpful information, or create your first
                  FAQ in Sanity Studio.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {faqCategories.map((category) => (
                  <section key={category.name}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                      {category.name}
                    </h2>
                    <div className="space-y-4">
                      {category.faqs.map((faq) => (
                        <FAQItem key={faq._id} faq={faq} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-16 p-8 bg-spearmint rounded-lg text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;re here to help! Get in touch with us for personalized
                answers.
              </p>
              <Link
                href="/#contact"
                className="inline-block bg-blue-gray text-white font-semibold px-6 py-3 rounded-lg hover:bg-powder-blue transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer
        footerData={footerData || undefined}
        footerPages={footerPages || undefined}
      />
    </>
  );
}
