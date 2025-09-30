import "./globals.css";
import CookiesBannerWrapper from "@/components/CookiesBannerWrapper";
import { getSettings } from "@/lib/sanity";
import type { Metadata } from "next";

// Default metadata fallbacks
const defaultMetadata = {
  title: "Lydia Lockhart Lifecoaching",
  description:
    "Life coaching for kids and families. Discover your strengths and thrive with Lydia and Goose!",
  ogImageUrl: "/og-image.jpg",
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();

    const title = settings?.seoSettings?.metaTitle || defaultMetadata.title;
    const description =
      settings?.seoSettings?.metaDescription || defaultMetadata.description;
    const ogImageUrl =
      settings?.seoSettings?.ogImage?.asset?.url || defaultMetadata.ogImageUrl;
    const ogImageAlt =
      settings?.seoSettings?.ogImage?.alt || "Lydia Lockhart Coaching";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: "https://www.lydialockhartlifecoaching.co.uk/",
        siteName: "Lydia Lockhart",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: ogImageAlt,
          },
        ],
        locale: "en_GB",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageUrl],
      },
      metadataBase: new URL("https://www.lydialockhartlifecoaching.co.uk/"),
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Return fallback metadata if Sanity fetch fails
    return {
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      openGraph: {
        title: defaultMetadata.title,
        description: defaultMetadata.description,
        url: "https://www.lydialockhartlifecoaching.co.uk/",
        siteName: "Lydia Lockhart Lifecoaching",
        images: [
          {
            url: defaultMetadata.ogImageUrl,
            width: 1200,
            height: 630,
            alt: "Lydia Lockhart Lifecoaching",
          },
        ],
        locale: "en_GB",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMetadata.title,
        description: defaultMetadata.description,
        images: [defaultMetadata.ogImageUrl],
      },
      metadataBase: new URL("https://www.lydialockhartlifecoaching.co.uk/"),
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookiesBannerWrapper />
      </body>
    </html>
  );
}
