import "./globals.css";
import CookiesBannerWrapper from "@/components/CookiesBannerWrapper";
import { getSettings } from "@/lib/sanity";
import type { Metadata } from "next";

// Default metadata fallbacks
const defaultMetadata = {
  title: "Lydia Lockhart Lifecoaching",
  description:
    "Life coaching for kids and families. Discover your strengths and thrive with Lydia and Goose!",
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();

    // Use settings data with fallbacks
    const title =
      settings?.seoSettings?.metaTitle ||
      settings?.siteTitle ||
      defaultMetadata.title;
    const description =
      settings?.seoSettings?.metaDescription || defaultMetadata.description;
    const siteUrl =
      settings?.siteUrl || "https://www.lydialockhartlifecoaching.co.uk/";
    const siteName = settings?.siteTitle || "Lydia Lockhart Lifecoaching";

    // Social sharing image
    const ogImageUrl = settings?.socialSharing?.ogImage?.asset?.url;
    const ogImageAlt =
      settings?.socialSharing?.ogImage?.alt || "Lydia Lockhart Coaching";

    // Favicon
    const faviconUrl = settings?.seoSettings?.favicon?.asset?.url;

    // Twitter handle
    const twitterHandle = settings?.socialSharing?.twitterHandle
      ? `@${settings.socialSharing.twitterHandle}`
      : undefined;

    const metadata: Metadata = {
      title,
      description,
      keywords: settings?.seoSettings?.keywords?.join(", ") || undefined,
      authors: [{ name: "Lydia Lockhart" }],
      creator: "Lydia Lockhart",
      publisher: "Lydia Lockhart",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      ...(ogImageUrl && {
        openGraph: {
          title,
          description,
          url: siteUrl,
          siteName,
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
      }),
      ...(ogImageUrl && {
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [ogImageUrl],
          ...(twitterHandle && { creator: twitterHandle, site: twitterHandle }),
        },
      }),
      ...(faviconUrl && {
        icons: {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        },
      }),
      metadataBase: new URL(siteUrl),
    };

    // Add Facebook App ID if available
    if (settings?.socialSharing?.facebookAppId) {
      metadata.other = {
        "fb:app_id": settings.socialSharing.facebookAppId,
      };
    }

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Return basic fallback metadata if Sanity fetch fails
    return {
      title: defaultMetadata.title,
      description: defaultMetadata.description,
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
