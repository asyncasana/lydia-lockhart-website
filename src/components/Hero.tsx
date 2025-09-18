import React from "react";
import { HeroData } from "@/lib/sanity";
import ScrollAnimation from "./ScrollAnimation";

interface HeroProps {
  heroData?: HeroData;
}

const Hero = ({ heroData }: HeroProps) => {
  // Only use Sanity data - no fallbacks
  if (!heroData) {
    return (
      <section className="relative w-full flex flex-col items-center justify-center text-blue-gray text-center shadow-lg overflow-hidden min-h-[80vh] bg-gray-100">
        <div className="text-center text-gray-500">
          <p>Hero section - Sanity data not available</p>
        </div>
      </section>
    );
  }

  const headline = heroData.headline;
  const subheadline = heroData.subheadline;
  const ctaText = heroData.ctaText;
  const ctaUrl = heroData.ctaUrl;

  // Determine background media
  const backgroundMedia = heroData?.backgroundMedia;
  const isVideo =
    backgroundMedia?.mediaType === "video" && backgroundMedia?.videoUrl;
  const isImage =
    backgroundMedia?.mediaType === "image" &&
    backgroundMedia?.image?.asset?.url;

  return (
    <section className="relative w-full flex flex-col items-center justify-center text-blue-gray text-center shadow-lg overflow-hidden min-h-[80vh]">
      {/* Background Media */}
      {isVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={backgroundMedia.videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : isImage ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${backgroundMedia?.image?.asset?.url})`,
          }}
        />
      ) : null}

      {/* Overlay for readability */}
      <div className="absolute inset-0 z-10 bg-black opacity-10"></div>

      {/* Content above background */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
        {headline && (
          <ScrollAnimation animation="fadeUp" delay={0}>
            <h1 className="text-2xl text-white md:text-6xl font-extrabold mb-4">
              {headline}
            </h1>
          </ScrollAnimation>
        )}
        {subheadline && (
          <ScrollAnimation animation="fadeUp" delay={200}>
            <p className="text-lg text-white md:text-2xl max-w-2xl mx-auto mb-6">
              {subheadline}
            </p>
          </ScrollAnimation>
        )}
        {ctaText && ctaUrl && (
          <ScrollAnimation animation="scale" delay={400}>
            <a
              href={ctaUrl}
              className="inline-block bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-500 transition"
            >
              {ctaText}
            </a>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
};

export default Hero;
