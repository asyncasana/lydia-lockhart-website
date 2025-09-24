import { getLegalPageLinks } from "@/lib/sanity";
import CookiesBanner from "./CookiesBanner";

export default async function CookiesBannerWrapper() {
  try {
    const legalLinks = await getLegalPageLinks();
    return <CookiesBanner privacySlug={legalLinks.privacySlug} />;
  } catch (error) {
    console.error("Error fetching legal links for cookies banner:", error);
    // Fallback to default privacy policy slug
    return <CookiesBanner privacySlug="privacy-policy" />;
  }
}
