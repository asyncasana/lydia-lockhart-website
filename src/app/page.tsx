import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Testimonials from "../components/Testimonials";
import Services from "../components/Services";
import ConsentForm from "../components/ConsentForm";
import Resources from "../components/Resources";
import "../app/globals.css";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-screen bg-blueGray">
      <Header />
      <Hero />
      <AboutMe />
      <Testimonials />
      <Services />
      <ConsentForm />
      <Resources />
      <Footer />
    </main>
  );
}
