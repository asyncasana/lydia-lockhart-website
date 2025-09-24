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
  const [swiperRef, setSwiperRef] = React.useState<any>(null);

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
        {/* Main Title */}
        <ScrollAnimation animation="fadeUp" delay={0}>
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-gray">
            About Me
          </h2>
        </ScrollAnimation>

        {/* Carousel Sections - Primary Content */}
        {carouselSections.length > 0 ? (
          <div className="mt-8 relative">
            <ScrollAnimation animation="fadeUp" delay={400}>
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
                onSwiper={setSwiperRef}
                className="about-carousel"
              >
                {carouselSections.map((section, index) => (
                  <SwiperSlide key={section.slug?.current || index}>
                    <div className="flex flex-col md:flex-row items-center gap-0 md:gap-8 min-h-[500px] py-4 md:py-8 w-full overflow-hidden">
                      {/* Photo left - only show if image exists */}
                      {section.image?.asset?.url && (
                        <div className="w-full md:w-1/2 flex justify-center mb-0 md:mb-0 relative">
                          <ScrollAnimation animation="fadeRight" delay={200}>
                            <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0">
                              <Image
                                src={section.image.asset.url}
                                alt={section.image.alt || section.title}
                                fill
                                sizes="(max-width: 768px) 256px, 320px"
                                className="rounded-full hover:shadow-lg transition-shadow duration-300 shadow-powder-blue object-cover"
                                draggable={false}
                              />
                            </div>
                          </ScrollAnimation>

                          {/* Mobile Navigation Arrows */}
                          <div className="md:hidden absolute inset-0 flex items-center justify-between pointer-events-none">
                            <button
                              className="about-mobile-prev pointer-events-auto w-10 h-10 flex items-center justify-center text-yellow-600 hover:text-yellow-500 transition-colors -ml-12"
                              aria-label="Previous slide"
                              onClick={() => swiperRef?.slidePrev()}
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M15 19l-7-7 7-7"
                                />
                              </svg>
                            </button>
                            <button
                              className="about-mobile-next pointer-events-auto w-10 h-10 flex items-center justify-center text-yellow-600 hover:text-yellow-500 transition-colors -mr-12"
                              aria-label="Next slide"
                              onClick={() => swiperRef?.slideNext()}
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Text right */}
                      <div
                        className={`w-full ${
                          section.image?.asset?.url ? "md:w-1/2" : "md:w-full"
                        } flex flex-col justify-center min-h-[400px]`}
                      >
                        <ScrollAnimation animation="fadeLeft" delay={400}>
                          <div className="flex flex-col h-full justify-center">
                            {section.title && (
                              <h3 className="text-3xl text-blue-gray font-bold mb-4 text-center md:text-left">
                                {section.title}
                              </h3>
                            )}
                            {section.shortDescription && (
                              <div className="italic text-md whitespace-pre-line mb-8 text-center md:text-left overflow-hidden">
                                {section.shortDescription}
                              </div>
                            )}

                            {/* View More Button */}
                            {section.slug?.current ? (
                              <div className="text-center md:text-left mt-auto">
                                <Link
                                  href={`/about/${section.slug.current}`}
                                  className="inline-block bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
                                >
                                  View More
                                </Link>
                              </div>
                            ) : (
                              <div className="text-sm text-red-500 text-center md:text-left mt-auto">
                                Slug missing - please generate slug in Sanity
                              </div>
                            )}
                          </div>
                        </ScrollAnimation>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ScrollAnimation>
          </div>
        ) : (
          /* Fallback to legacy layout if no carousel sections */
          <>
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
                  <div
                    className={`w-full ${imageUrl ? "md:w-1/2" : "md:w-full"}`}
                  >
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
          </>
        )}
      </div>

      <style jsx global>{`
        .about-carousel {
          position: relative;
          padding: 0 60px;
          overflow: hidden;
        }

        .about-carousel .swiper-slide {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .about-carousel .swiper-slide-active {
          opacity: 1;
        }

        .about-carousel .swiper-button-next,
        .about-carousel .swiper-button-prev {
          color: #d97706;
          background: transparent;
          width: 44px;
          height: 44px;
          transition: all 0.3s ease;
        }

        .about-carousel .swiper-button-next:hover,
        .about-carousel .swiper-button-prev:hover {
          color: #b45309;
          transform: scale(1.1);
        }

        .about-carousel .swiper-button-next {
          right: 10px;
        }

        .about-carousel .swiper-button-prev {
          left: 10px;
        }

        .about-carousel .swiper-button-next:after,
        .about-carousel .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .about-carousel .swiper-pagination-bullet-active {
          background-color: #d97706;
        }

        /* Hide arrows on mobile to prevent layout issues */
        @media (max-width: 768px) {
          .about-carousel {
            padding: 0;
          }

          .about-carousel .swiper-button-next,
          .about-carousel .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutMe;
