// Force dynamic rendering for instant Sanity content updates
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAboutSection,
  getNavigationData,
  getFooterData,
  getFooterPages,
  getPageVisibility,
  AboutCarouselSection,
  NavigationData,
  FooterData,
  PageData,
} from "@/lib/sanity";
import Header from "@/components/Header";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";
import Footer from "@/components/Footer";

interface AboutSectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AboutSectionPage({
  params,
}: AboutSectionPageProps) {
  const { slug } = await params;

  // Fetch section data, footer data, and footer pages with error handling
  let sectionData: AboutCarouselSection | null;
  let navigationData: NavigationData | null;
  let footerData: FooterData | null;
  let footerPages: PageData[];
  let pageVisibility: { showBlogPage: boolean; showFaqPage: boolean };

  try {
    [sectionData, navigationData, footerData, footerPages, pageVisibility] =
      await Promise.all([
        getAboutSection(slug),
        getNavigationData(),
        getFooterData(),
        getFooterPages(),
        getPageVisibility(),
      ]);

    // Merge page visibility settings into navigationData
    if (navigationData) {
      navigationData = {
        ...navigationData,
        showBlogLink: pageVisibility.showBlogPage,
        showFaqLink: pageVisibility.showFaqPage,
      };
    }
  } catch (error) {
    console.error("Error fetching about section data:", error);
    sectionData = null;
    navigationData = null;
    footerData = null;
    footerPages = [];
    pageVisibility = { showBlogPage: true, showFaqPage: true };
  }

  if (!sectionData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-blueGray">
      <Header navigationData={navigationData || undefined} />

      {/* Section Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-lg shadow-lg p-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-gray">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/#about" className="hover:text-blue-gray">
                  About
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-700">{sectionData.title}</li>
            </ol>
          </nav>

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {sectionData.title}
            </h1>

            {/* Section Image */}
            {sectionData.image?.asset?.url && (
              <div className="mb-6 flex justify-center">
                <div className="relative w-64 h-64 mx-auto">
                  <Image
                    src={sectionData.image.asset.url}
                    alt={sectionData.image.alt || sectionData.title}
                    width={256}
                    height={256}
                    className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white"
                  />
                </div>
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
          {sectionData.ctaButton?.isVisible &&
            sectionData.ctaButton.text &&
            sectionData.ctaButton.url && (
              <div className="mt-8 text-center">
                {/* Check if it's an external link (starts with http/https) or use isExternal flag */}
                {sectionData.ctaButton.isExternal ||
                sectionData.ctaButton.url.startsWith("http") ? (
                  <a
                    href={sectionData.ctaButton.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
                  >
                    {sectionData.ctaButton.text}
                  </a>
                ) : // Internal link - use Link component or regular anchor for hash links
                sectionData.ctaButton.url.startsWith("#") ? (
                  <a
                    href={sectionData.ctaButton.url}
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
        images: sectionData.image?.asset?.url
          ? [sectionData.image.asset.url]
          : [],
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
