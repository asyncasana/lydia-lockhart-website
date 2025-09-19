// Force dynamic rendering for instant Sanity content updates
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getPage, getFooterData, getFooterPages } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch page data, footer data, and footer pages
  const [pageData, footerData, footerPages] = await Promise.all([
    getPage(slug),
    getFooterData(),
    getFooterPages(),
  ]);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-blueGray">
      {/* Header Navigation */}
      <nav className="w-full bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {pageData.title}
            </h1>
            {pageData.metaDescription && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {pageData.metaDescription}
              </p>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            <PortableText
              value={pageData.content as never}
              components={portableTextComponents as never}
            />
          </div>
        </article>
      </main>

      <Footer
        footerData={footerData || undefined}
        footerPages={footerPages || undefined}
      />
    </div>
  );
}

// Generate static params for all published pages
export async function generateStaticParams() {
  const pages = await fetch(
    `https://rb1epwnp.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(
      '*[_type == "page" && isPublished == true] { slug }'
    )}`
  ).then((res) => res.json());

  return pages.result.map((page: { slug: { current: string } }) => ({
    slug: page.slug.current,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await getPage(slug);

  if (!pageData) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${pageData.title} | Lydia Lockhart`,
    description: pageData.metaDescription || pageData.title,
    openGraph: {
      title: `${pageData.title} | Lydia Lockhart`,
      description: pageData.metaDescription || pageData.title,
      type: "article",
    },
  };
}
