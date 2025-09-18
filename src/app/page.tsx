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
} from "@/lib/sanity";
import "../app/globals.css";

export default async function Home() {
  // Fetch data from Sanity
  const [
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
