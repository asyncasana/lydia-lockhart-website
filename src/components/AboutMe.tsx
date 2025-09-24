"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AboutData } from "@/lib/sanity";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const carouselSections = aboutData.carouselSections || [];

  return (
    <section className="py-10 px-12 bg-white text-gray-700">
      <div className="max-w-6xl mx-auto">
        {/* Main About Section (existing functionality) */}
        {(title || aboutData.bio || imageUrl) && (
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
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
        )}

        {/* Carousel Sections */}
        {carouselSections.length > 0 && (
          <div className="mt-16">
            <ScrollAnimation animation="fadeUp" delay={600}>
              <h3 className="text-2xl font-bold text-center mb-8 text-blue-gray">
                More About Me
              </h3>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={800}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="about-carousel"
              >
                {carouselSections.map((section, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-gray-50 rounded-lg p-6 h-full flex flex-col">
                      {/* Section Image */}
                      {section.image?.asset?.url && (
                        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={section.image.asset.url}
                            alt={section.image.alt || section.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Section Content */}
                      <div className="flex-grow">
                        <h4 className="text-xl font-semibold mb-3 text-blue-gray">
                          {section.title}
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {section.shortDescription}
                        </p>
                      </div>

                      {/* View More Button */}
                      <Link
                        href={`/about/${section.slug?.current}`}
                        className="inline-block bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition text-center"
                      >
                        View More
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ScrollAnimation>
          </div>
        )}
      </div>

      <style jsx global>{`
        .about-carousel .swiper-button-next,
        .about-carousel .swiper-button-prev {
          color: #d97706;
        }
        
        .about-carousel .swiper-pagination-bullet-active {
          background-color: #d97706;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default AboutMe;
