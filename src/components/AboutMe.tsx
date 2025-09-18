import React from "react";
import Image from "next/image";
import { AboutData } from "@/lib/sanity";
import ScrollAnimation from "@/components/ScrollAnimation";

interface AboutMeProps {
  aboutData?: AboutData;
}

const AboutMe = ({ aboutData }: AboutMeProps) => {
  // Only use Sanity data - no fallbacks to make issues visible
  if (!aboutData) {
    return (
      <section className="py-10 px-12 bg-white text-gray-700">
        <div className="text-center text-gray-500">
          <p>About Me section - Sanity data not available</p>
        </div>
      </section>
    );
  }

  const title = aboutData.highlight;
  const imageUrl = aboutData.image?.asset?.url;
  const imageAlt = aboutData.image?.alt;

  return (
    <section className="py-10 px-12 bg-white text-gray-700">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
        {/* Photo left - only show if image exists */}
        {imageUrl && (
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <ScrollAnimation animation="fadeRight" delay={200}>
              <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={imageAlt || "About image"}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="rounded-full hover:shadow-lg transition-shadow duration-300 shadow-powder-blue object-cover"
                  draggable={false}
                />
              </div>
            </ScrollAnimation>
          </div>
        )}

        {/* Text right - only show if title or bio exists */}
        {(title || aboutData.bio) && (
          <div className={`w-full ${imageUrl ? "md:w-1/2" : "md:w-full"}`}>
            <ScrollAnimation animation="fadeLeft" delay={400}>
              {title && (
                <h2 className="text-3xl text-blue-gray font-bold mb-4 text-center md:text-left">
                  {title}
                </h2>
              )}
              {aboutData.bio && (
                <div className="italic text-md whitespace-pre-line">
                  {aboutData.bio}
                </div>
              )}
            </ScrollAnimation>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutMe;
