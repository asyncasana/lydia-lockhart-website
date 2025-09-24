import "./globals.css";
import CookiesBannerWrapper from "@/components/CookiesBannerWrapper";

export const metadata = {
  title: "Lydia Lockhart | Helping Little Minds Grow",
  description:
    "Life coaching for kids and families. Discover your strengths and thrive with Lydia and Goose!",
  openGraph: {
    title: "Lydia Lockhart | Helping Little Minds Grow",
    description:
      "Life coaching for kids and families. Discover your strengths and thrive with Lydia and Goose!",
    url: "https://yourdomain.com",
    siteName: "Lydia Lockhart",
    images: [
      {
        url: "/og-image.jpg", // Place your OG image in public/
        width: 1200,
        height: 630,
        alt: "Lydia Lockhart Coaching",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lydia Lockhart | Helping Little Minds Grow",
    description:
      "Life coaching for kids and families. Discover your strengths and thrive with Lydia and Goose!",
    images: ["/og-image.jpg"],
  },
};

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
