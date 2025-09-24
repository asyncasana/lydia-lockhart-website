import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getResourceBySlug } from "@/lib/sanity";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface ResourcePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const resource = await getResourceBySlug(slug);

    if (!resource) {
      return {
        title: "Resource Not Found",
        description: "The requested resource could not be found.",
      };
    }

    return {
      title: `${resource.title} - Lydia Lockheart Counselling`,
      description:
        resource.description || `Learn more about ${resource.title} resource.`,
      openGraph: {
        title: `${resource.title} - Lydia Lockheart Counselling`,
        description:
          resource.description ||
          `Learn more about ${resource.title} resource.`,
        images: resource.image?.asset?.url
          ? [resource.image.asset.url]
          : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for resource page:", error);
    return {
      title: "Resource - Lydia Lockheart Counselling",
      description: "Helpful resources for parents and families.",
    };
  }
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  try {
    const { slug } = await params;
    const resource = await getResourceBySlug(slug);

    if (!resource) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link
                  href="/"
                  className="hover:text-teal-600 transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">
                  {resource.title}
                </span>
              </div>
            </nav>

            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                {resource.title}
              </h1>

              {resource.category && (
                <span className="inline-block text-lg text-teal-700 bg-teal-200 px-4 py-2 rounded-full mb-6">
                  {resource.category}
                </span>
              )}

              {resource.image?.asset?.url && (
                <div className="flex justify-center mb-8">
                  <Image
                    src={resource.image.asset.url}
                    alt={resource.image?.alt || resource.title}
                    width={600}
                    height={400}
                    className="rounded-xl shadow-lg object-cover"
                    priority
                  />
                </div>
              )}

              {resource.description && (
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  {resource.description}
                </p>
              )}
            </div>

            {/* Full Content Section */}
            {resource.fullContent && resource.fullContent.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
                <div className="prose prose-lg max-w-none">
                  <PortableText
                    value={resource.fullContent}
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
                          <blockquote className="border-l-4 border-teal-500 pl-6 italic text-gray-600 my-6">
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
                Explore This Resource
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 inline-block"
                  >
                    Visit Website
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
    console.error("Error loading resource page:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  // This will be called at build time to pre-generate static paths
  return [];
}
