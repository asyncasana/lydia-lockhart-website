import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getServiceBySlug } from "@/lib/sanity";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
      return {
        title: "Service Not Found",
        description: "The requested service could not be found.",
      };
    }

    return {
      title: `${service.title} - Lydia Lockheart Counselling`,
      description:
        service.description ||
        `Learn more about ${service.title} services offered by Lydia Lockheart.`,
      openGraph: {
        title: `${service.title} - Lydia Lockheart Counselling`,
        description:
          service.description ||
          `Learn more about ${service.title} services offered by Lydia Lockheart.`,
        images: service.icon?.asset?.url ? [service.icon.asset.url] : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for service page:", error);
    return {
      title: "Service - Lydia Lockheart Counselling",
      description: "Professional counselling services by Lydia Lockheart.",
    };
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  try {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">
                  {service.title}
                </span>
              </div>
            </nav>

            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                {service.title}
              </h1>

              {service.icon?.asset?.url && (
                <div className="flex justify-center mb-8">
                  <Image
                    src={service.icon.asset.url}
                    alt={service.icon?.alt || service.title}
                    width={400}
                    height={300}
                    className="rounded-xl shadow-lg object-cover"
                    priority
                  />
                </div>
              )}

              {service.description && (
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  {service.description}
                </p>
              )}
            </div>

            {/* Full Content Section */}
            {service.fullContent && service.fullContent.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
                <div className="prose prose-lg max-w-none">
                  <PortableText
                    value={service.fullContent}
                    components={{
                      block: {
                        h1: ({ children }) => (
                          <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-bold text-gray-800 mb-3 mt-5">
                            {children}
                          </h3>
                        ),
                        normal: ({ children }) => (
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {children}
                          </p>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 my-6">
                            {children}
                          </blockquote>
                        ),
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => (
                          <li className="text-gray-700">{children}</li>
                        ),
                        number: ({ children }) => (
                          <li className="text-gray-700">{children}</li>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-bold text-gray-800">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        underline: ({ children }) => (
                          <u className="underline">{children}</u>
                        ),
                      },
                      types: {
                        image: ({ value }) => (
                          <div className="my-8">
                            <Image
                              src={value.asset.url}
                              alt={value.alt || ""}
                              width={800}
                              height={600}
                              className="rounded-lg shadow-md w-full object-cover"
                            />
                          </div>
                        ),
                      },
                    }}
                  />
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Ready to Get Started?
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {service.ctaButton?.link ? (
                  // Check if it's an external link (starts with http/https)
                  service.ctaButton.link.startsWith("http") ? (
                    <a
                      href={service.ctaButton.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 inline-block"
                    >
                      {service.ctaButton.text || "Get Started"}
                    </a>
                  ) : // Internal link - use Link component or regular anchor for hash links
                  service.ctaButton.link.startsWith("#") ? (
                    <a
                      href={service.ctaButton.link}
                      className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 inline-block"
                    >
                      {service.ctaButton.text || "Get Started"}
                    </a>
                  ) : (
                    <Link
                      href={service.ctaButton.link}
                      className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 inline-block"
                    >
                      {service.ctaButton.text || "Get Started"}
                    </Link>
                  )
                ) : (
                  <a
                    href="/#contact"
                    className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 inline-block"
                  >
                    {service.ctaButton?.text || "Contact Us"}
                  </a>
                )}
                <Link
                  href="/"
                  className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 inline-block"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading service page:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  // This will be called at build time to pre-generate static paths
  return [];
}
