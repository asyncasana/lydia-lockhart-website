// This file contains helper functions and types for integrating with Sanity CMS
// These functions are currently placeholders and should be implemented once Sanity is properly connected

import { MenuItem } from "../components/Header";
import { SocialLink, AdditionalLink } from "../components/Footer";
import { PortableTextBlock } from "@portabletext/types";

// Sanity client setup
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "rb1epwnp",
  dataset: "production",
  useCdn: false, // Disable CDN for fresh data
  apiVersion: "2024-01-01",
});

// Hero Section Types and Queries
export interface HeroData {
  headline: string;
  subheadline: string;
  backgroundMedia: {
    mediaType: "video" | "image";
    videoUrl?: string;
    image?: {
      asset: {
        url: string;
      };
      alt?: string;
    };
  };
  ctaText: string;
  ctaUrl: string;
}

export async function getHeroData(): Promise<HeroData | null> {
  try {
    const query = `*[_type == "hero"][0] {
      headline,
      subheadline,
      backgroundMedia {
        mediaType,
        videoUrl,
        image {
          asset->{url},
          alt
        }
      },
      ctaText,
      ctaUrl
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
}

// Navigation Types and Queries
export interface NavigationData {
  logo?: {
    asset: {
      url: string;
    };
  };
  menuItems: MenuItem[];
  showBlogLink: boolean;
  showFaqLink: boolean;
  ctaButton?: {
    text: string;
    url: string;
    isVisible: boolean;
  };
}

export async function getNavigationData(): Promise<NavigationData | null> {
  try {
    const query = `*[_type == "navigation"][0] {
      logo {
        asset->{url}
      },
      menuItems[] {
        label,
        url,
        isActive,
        openInNewTab
      },
      showBlogLink,
      showFaqLink,
      ctaButton {
        text,
        url,
        isVisible
      }
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    return null;
  }
}

// Footer Types and Queries
export interface FooterData {
  footerText?: string;
  socialLinks?: SocialLink[];
  copyrightText?: string;
  additionalLinks?: AdditionalLink[];
}

// Settings Types and Queries
export interface Settings {
  contactEmail?: string;
  calendlyUrl?: string;
  pageVisibility?: {
    showBlogPage?: boolean;
    showFaqPage?: boolean;
  };
  seoSettings?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      asset: {
        url: string;
      };
    };
  };
  footer?: FooterData;
}

export async function getFooterData(): Promise<FooterData | null> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "settings"][0] {
        footer {
          footerText,
          socialLinks[] {
            platform,
            url,
            isVisible
          },
          additionalLinks[] {
            label,
            url,
            isVisible
          },
          copyrightText
        }
      }
    `);
    return result?.footer || null;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}

export async function getPageVisibility(): Promise<{
  showBlogPage: boolean;
  showFaqPage: boolean;
}> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "settings"][0] {
        pageVisibility {
          showBlogPage,
          showFaqPage
        }
      }
    `);

    // Return defaults if not set
    return {
      showBlogPage: result?.pageVisibility?.showBlogPage ?? false,
      showFaqPage: result?.pageVisibility?.showFaqPage ?? false,
    };
  } catch (error) {
    console.error("Error fetching page visibility settings:", error);
    // Return defaults on error
    return {
      showBlogPage: false,
      showFaqPage: false,
    };
  }
}

export async function getLegalPageLinks(): Promise<{
  termsSlug?: string;
  privacySlug?: string;
}> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "page" && (title match "*terms*" || title match "*privacy*")] {
        title,
        slug
      }
    `);

    const links: { termsSlug?: string; privacySlug?: string } = {};

    result.forEach((page: { title?: string; slug?: { current: string } }) => {
      const title = page.title?.toLowerCase() || "";
      if (title.includes("terms") || title.includes("conditions")) {
        links.termsSlug = page.slug?.current;
      }
      if (title.includes("privacy")) {
        links.privacySlug = page.slug?.current;
      }
    });

    return links;
  } catch (error) {
    console.error("Error fetching legal page links:", error);
    return {
      termsSlug: "terms-and-conditions",
      privacySlug: "privacy-policy",
    };
  }
}

export async function getTestimonialsBackgroundImage(): Promise<string | null> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "settings"][0] {
        "testimonialsBackgroundImage": testimonialsBackgroundImage.asset->url
      }
    `);
    return result?.testimonialsBackgroundImage || null;
  } catch (error) {
    console.error("Error fetching testimonials background image:", error);
    return null;
  }
}

export async function getContactBackgroundImage(): Promise<string | null> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "settings"][0] {
        "contactBackgroundImage": contactBackgroundImage.asset->url
      }
    `);
    return result?.contactBackgroundImage || null;
  } catch (error) {
    console.error("Error fetching contact background image:", error);
    return null;
  }
}

// Blog Types and Queries
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  content: unknown[]; // Portable Text content
  publishedAt: string;
  isPublished: boolean;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "blog" && isPublished == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{url},
        alt
      },
      content,
      publishedAt,
      isPublished
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "blog" && slug.current == $slug && isPublished == true][0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{url},
        alt
      },
      content,
      publishedAt,
      isPublished
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// FAQ Types and Queries
export interface FAQ {
  _id: string;
  question: string;
  answer: unknown[]; // Portable Text content
  category: string;
  order?: number;
  isActive: boolean;
}

export interface FAQCategory {
  name: string;
  faqs: FAQ[];
}

export async function getFAQs(): Promise<FAQCategory[]> {
  try {
    const query = `*[_type == "faq" && isActive == true] | order(category asc, order asc) {
      _id,
      question,
      answer,
      category,
      order,
      isActive
    }`;
    const faqs = await sanityClient.fetch(query);

    // Group FAQs by category
    const categoriesMap = new Map<string, FAQ[]>();
    faqs.forEach((faq: FAQ) => {
      const category = faq.category || "general";
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, []);
      }
      categoriesMap.get(category)!.push(faq);
    });

    return Array.from(categoriesMap.entries()).map(([name, faqs]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      faqs,
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

// Service Types and Queries
export interface Service {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  fullContent?: PortableTextBlock[];
  icon?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  ctaButton?: {
    text?: string;
    link?: string;
  };
  order?: number;
}

export async function getServices(): Promise<Service[]> {
  try {
    const query = `*[_type == "service"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      fullContent,
      icon {
        asset->{url},
        alt
      },
      ctaButton,
      order
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const query = `*[_type == "service" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      fullContent,
      icon {
        asset->{url},
        alt
      },
      ctaButton
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}

// Resource Types and Queries
export interface Resource {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  fullContent?: PortableTextBlock[];
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  url?: string;
  category?: string;
  order?: number;
}

export async function getResources(): Promise<Resource[]> {
  try {
    const query = `*[_type == "resource"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      fullContent,
      image {
        asset->{url},
        alt
      },
      url,
      category,
      order
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

export async function getResourceBySlug(
  slug: string
): Promise<Resource | null> {
  try {
    const query = `*[_type == "resource" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      fullContent,
      image {
        asset->{url},
        alt
      },
      url,
      category
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching resource by slug:", error);
    return null;
  }
}

// About Types and Queries
export interface AboutCarouselSection {
  title: string;
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  shortDescription: string;
  slug: {
    current: string;
  };
  longDescription?: unknown[]; // Portable Text content
  ctaButton?: {
    isVisible: boolean;
    text?: string;
    url?: string;
    isExternal?: boolean;
  };
}

export interface AboutData {
  _id: string;
  highlight?: string; // This is your "title" field
  bio?: string; // This is your content field (plain text, not Portable Text)
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  carouselSections?: AboutCarouselSection[];
}

export async function getAboutData(): Promise<AboutData | null> {
  try {
    const query = `*[_type == "about"][0] {
      _id,
      highlight,
      bio,
      image {
        asset->{url},
        alt
      },
      carouselSections[] {
        title,
        image {
          asset->{url},
          alt
        },
        shortDescription,
        slug,
        longDescription,
        ctaButton {
          isVisible,
          text,
          url,
          isExternal
        }
      }
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

// Get individual carousel section for detail page
export async function getAboutSection(
  slug: string
): Promise<AboutCarouselSection | null> {
  try {
    const query = `*[_type == "about"][0].carouselSections[slug.current == $slug][0] {
      title,
      image {
        asset->{url},
        alt
      },
      shortDescription,
      slug,
      longDescription,
      ctaButton {
        isVisible,
        text,
        url,
        isExternal
      }
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching about section:", error);
    return null;
  }
}

// Testimonial Types and Queries
export interface Testimonial {
  _id: string;
  name?: string;
  role?: string;
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  shortText?: string; // Brief version for carousel
  fullText?: string; // Complete testimonial
  text?: string; // Legacy field for backward compatibility
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const query = `*[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      name,
      role,
      image {
        asset->{url},
        alt
      },
      shortText,
      fullText,
      text,
      "allFields": *
    }`;
    return await sanityClient.fetch(
      query,
      {},
      {
        cache: "no-cache",
      }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// Static Page Types and Queries
export interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  content: unknown[]; // Portable Text content
  metaDescription?: string;
  isPublished: boolean;
  showInFooter: boolean;
  footerOrder?: number;
}

export async function getPage(slug: string): Promise<PageData | null> {
  try {
    const query = `*[_type == "page" && slug.current == $slug && isPublished == true][0] {
      _id,
      title,
      slug,
      content,
      metaDescription,
      isPublished,
      showInFooter,
      footerOrder
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getFooterPages(): Promise<PageData[]> {
  try {
    const query = `*[_type == "page" && isPublished == true && showInFooter == true] | order(footerOrder asc) {
      _id,
      title,
      slug,
      footerOrder
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching footer pages:", error);
    return [];
  }
}

export async function getSettings(): Promise<Settings | null> {
  try {
    const query = `*[_type == "settings"][0] {
      contactEmail,
      calendlyUrl,
      seoSettings {
        metaTitle,
        metaDescription,
        ogImage {
          asset->{url}
        }
      },
      pageVisibility {
        showBlogPage,
        showFaqPage
      }
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

// Export PortableText for use in components
export { PortableText } from "@portabletext/react";
