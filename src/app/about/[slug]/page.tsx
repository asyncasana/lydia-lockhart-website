// Force dynamic rendering for instant Sanity content updates
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAboutSection, getFooterData, getFooterPages, AboutCarouselSection, FooterData, PageData } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";
import Footer from "@/components/Footer";

interface AboutSectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AboutSectionPage({ params }: AboutSectionPageProps) {
  const { slug } = await params;

  // Fetch section data, footer data, and footer pages with error handling
  let sectionData: AboutCarouselSection | null;
  let footerData: FooterData | null;
  let footerPages: PageData[];
  
  try {
    [sectionData, footerData, footerPages] = await Promise.all([
      getAboutSection(slug),
      getFooterData(),
      getFooterPages(),
    ]);
  } catch (error) {
    console.error("Error fetching about section data:", error);
    sectionData = null;
    footerData = null;
    footerPages = [];
  }

  if (!sectionData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-blueGray">
      {/* Header Navigation */}
      <nav className="w-full bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/#about"
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            ← Back to About
          </Link>
        </div>
      </nav>

      {/* Section Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {sectionData.title}
            </h1>
            
            {/* Section Image */}
            {sectionData.image?.asset?.url && (
              <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={sectionData.image.asset.url}
                  alt={sectionData.image.alt || sectionData.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Short Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {sectionData.shortDescription}
            </p>
          </header>

          {/* Long Description */}
          {sectionData.longDescription && (
            <div className="prose prose-lg max-w-none mb-8">
              <PortableText
                value={sectionData.longDescription as never}
                components={portableTextComponents as never}
              />
            </div>
          )}

          {/* CTA Button */}
          {sectionData.ctaButton?.isVisible && sectionData.ctaButton.text && sectionData.ctaButton.url && (
            <div className="mt-8 text-center">
              {sectionData.ctaButton.isExternal ? (
                <a
                  href={sectionData.ctaButton.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
                >
                  {sectionData.ctaButton.text}
                </a>
              ) : (
                <Link
                  href={sectionData.ctaButton.url}
                  className="inline-block bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
                >
                  {sectionData.ctaButton.text}
                </Link>
              )}
            </div>
          )}
        </article>
      </main>

      <Footer
        footerData={footerData || undefined}
        footerPages={footerPages || undefined}
      />
    </div>
  );
}

// Generate metadata for each section
export async function generateMetadata({ params }: AboutSectionPageProps) {
  const { slug } = await params;
  
  try {
    const sectionData = await getAboutSection(slug);

    if (!sectionData) {
      return {
        title: "Section Not Found",
      };
    }

    return {
      title: `${sectionData.title} | Lydia Lockhart`,
      description: sectionData.shortDescription || sectionData.title,
      openGraph: {
        title: `${sectionData.title} | Lydia Lockhart`,
        description: sectionData.shortDescription || sectionData.title,
        type: "article",
        images: sectionData.image?.asset?.url ? [sectionData.image.asset.url] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "About | Lydia Lockhart",
      description: "Learn more about Lydia Lockhart",
    };
  }
}