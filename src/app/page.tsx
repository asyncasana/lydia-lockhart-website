// Force dynamic rendering for instant Sanity content updates
export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";
import {
  getHeroData,
  getNavigationData,
  getFooterData,
  getFooterPages,
  getServices,
  getResources,
  getAboutData,
  getTestimonials,
  getPageVisibility,
  getLegalPageLinks,
  getTestimonialsBackgroundImage,
  getContactBackgroundImage,
  getSettings,
  HeroData,
  NavigationData,
  FooterData,
  PageData,
  Service,
  Resource,
  AboutData,
  Testimonial,
  Settings,
} from "@/lib/sanity";
import "../app/globals.css";

export default async function Home() {
  // Fetch data from Sanity with error handling
  let heroData: HeroData | null;
  let navigationData: NavigationData | null;
  let footerData: FooterData | null;
  let footerPages: PageData[];
  let servicesData: Service[];
  let resourcesData: Resource[];
  let aboutData: AboutData | null;
  let testimonialsData: Testimonial[];
  let pageVisibility: { showBlogPage: boolean; showFaqPage: boolean };
  let legalLinks: { termsSlug?: string; privacySlug?: string };
  let testimonialsBackgroundImage: string | null;
  let contactBackgroundImage: string | null;
  let settings: Settings | null;

  try {
    [
      heroData,
      navigationData,
      footerData,
      footerPages,
      servicesData,
      resourcesData,
      aboutData,
      testimonialsData,
      pageVisibility,
      legalLinks,
      testimonialsBackgroundImage,
      contactBackgroundImage,
      settings,
    ] = await Promise.all([
      getHeroData(),
      getNavigationData(),
      getFooterData(),
      getFooterPages(),
      getServices(),
      getResources(),
      getAboutData(),
      getTestimonials(),
      getPageVisibility(),
      getLegalPageLinks(),
      getTestimonialsBackgroundImage(),
      getContactBackgroundImage(),
      getSettings(),
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
    console.error("Error fetching Sanity data:", error);
    // Set all to null/undefined so components handle gracefully
    heroData = null;
    navigationData = null;
    footerData = null;
    footerPages = [];
    servicesData = [];
    resourcesData = [];
    aboutData = null;
    testimonialsData = [];
    pageVisibility = { showBlogPage: false, showFaqPage: false };
    legalLinks = {
      termsSlug: "terms-and-conditions",
      privacySlug: "privacy-policy",
    };
    testimonialsBackgroundImage = null;
    contactBackgroundImage = null;
    settings = null;
  }
  return (
    <main className="flex flex-col min-h-screen bg-blueGray">
      <Header navigationData={navigationData || undefined} />
      <section id="home" className="w-full">
        <Hero heroData={heroData || undefined} />
      </section>
      <section id="about" className="w-full">
        <AboutMe aboutData={aboutData || undefined} />
      </section>
      <section id="testimonials" className="w-full">
        <Testimonials
          testimonialsData={testimonialsData || undefined}
          backgroundImage={testimonialsBackgroundImage || undefined}
        />
      </section>
      <section id="services" className="w-full">
        <Services servicesData={servicesData || undefined} />
      </section>
      <section id="booking" className="w-full">
        <CalendlyEmbed calendlyUrl={settings?.calendlyUrl} />
      </section>
      <section id="contact" className="w-full">
        <ContactForm
          termsSlug={legalLinks.termsSlug}
          backgroundImageUrl={contactBackgroundImage || undefined}
        />
      </section>
      <section id="resources" className="w-full">
        <Resources resourcesData={resourcesData || undefined} />
      </section>
      <Footer
        footerData={footerData || undefined}
        footerPages={footerPages || undefined}
      />
    </main>
  );
}
