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
  HeroData,
  NavigationData,
  FooterData,
  PageData,
  Service,
  Resource,
  AboutData,
  Testimonial,
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
    ] = await Promise.all([
      getHeroData(),
      getNavigationData(),
      getFooterData(),
      getFooterPages(),
      getServices(),
      getResources(),
      getAboutData(),
      getTestimonials(),
    ]);
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
        <Testimonials testimonialsData={testimonialsData || undefined} />
      </section>
      <section id="services" className="w-full">
        <Services servicesData={servicesData || undefined} />
      </section>
      <section id="booking" className="w-full">
        <CalendlyEmbed />
      </section>
      <section id="contact" className="w-full">
        <ContactForm />
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
