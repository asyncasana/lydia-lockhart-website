"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Testimonial } from "@/lib/sanity";
import ScrollAnimation from "./ScrollAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface TestimonialsProps {
  testimonialsData?: Testimonial[];
  backgroundImage?: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get display text - prioritize new fields, fall back to legacy
  const fullText =
    testimonial.fullText ||
    testimonial.text ||
    testimonial.shortText ||
    "No testimonial available";

  // Create truncated version (approximately 3 lines worth of characters)
  const truncatedText =
    fullText.length > 150 ? fullText.substring(0, 150) + "..." : fullText;
  const hasExpandableContent = fullText.length > 150;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    // Force height recalculation after state change
    setTimeout(() => {
      const swiperSlides = document.querySelectorAll(
        ".testimonials-carousel .swiper-slide"
      );
      swiperSlides.forEach((slide) => {
        const slideElement = slide as HTMLElement;
        slideElement.style.height = "auto";
      });
    }, 50);
  };

  // Reset heights on mount and state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const swiperSlides = document.querySelectorAll(
        ".testimonials-carousel .swiper-slide"
      );
      swiperSlides.forEach((slide) => {
        const slideElement = slide as HTMLElement;
        slideElement.style.height = "auto";
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col border border-gray-200 hover:shadow-xl transition-all duration-300 h-full w-full">
      {/* Author Info */}
      <div className="flex items-center mb-4">
        {testimonial.image?.asset?.url && (
          <div className="relative w-12 h-12 mr-4 flex-shrink-0">
            <Image
              src={testimonial.image.asset.url}
              alt={
                testimonial.image.alt ||
                testimonial.name ||
                "Testimonial author"
              }
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900">
            {testimonial.name || "Anonymous"}
          </h4>
          {testimonial.role && (
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          )}
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="flex-grow">
        <div className="text-gray-700 leading-relaxed">
          <p>&ldquo;{isExpanded ? fullText : truncatedText}&rdquo;</p>
        </div>

        {/* Expand/Collapse Button */}
        {hasExpandableContent && (
          <button
            onClick={toggleExpanded}
            className="mt-3 text-yellow-600 hover:text-yellow-500 font-medium text-sm transition-colors"
          >
            {isExpanded ? "View Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

const Testimonials = ({
  testimonialsData,
  backgroundImage,
}: TestimonialsProps) => {
  if (!testimonialsData || testimonialsData.length === 0) {
    return (
      <section className="py-12 px-6 text-gray-800 w-full bg-gray-50">
        <div className="text-center text-gray-500">
          <p>Testimonials section - Sanity data not available</p>
        </div>
      </section>
    );
  }

  // Create dynamic styles for background image
  const sectionStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(249, 250, 251, 0.85), rgba(249, 250, 251, 0.85)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <section
      className="py-12 px-6 text-gray-800 w-full bg-gray-50 relative"
      style={sectionStyle}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollAnimation animation="fadeUp" delay={0}>
          <h2 className="text-3xl text-center text-blue-gray font-bold mb-8">
            What People Say
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={200}>
          <div className="px-4 md:px-6">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 25,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="testimonials-carousel pb-16"
              style={
                {
                  ["--swiper-pagination-bottom" as any]: "0px",
                } as React.CSSProperties
              }
              onSlideChange={() => {
                // Force height recalculation on slide change
                setTimeout(() => {
                  const swiperSlides = document.querySelectorAll(
                    ".testimonials-carousel .swiper-slide"
                  );
                  swiperSlides.forEach((slide) => {
                    const slideElement = slide as HTMLElement;
                    slideElement.style.height = "auto";
                  });
                }, 100);
              }}
            >
              {testimonialsData.map((testimonial) => (
                <SwiperSlide key={testimonial._id} className="h-auto">
                  <div className="h-full min-h-[300px] flex">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </ScrollAnimation>
      </div>

      <style jsx global>{`
        .testimonials-carousel .swiper-pagination-bullet {
          background-color: #d1d5db;
          opacity: 0.5;
        }

        .testimonials-carousel .swiper-pagination-bullet-active {
          background-color: #d97706;
          opacity: 1;
        }

        .testimonials-carousel .swiper-slide {
          height: auto !important;
          display: flex !important;
          align-items: stretch;
        }

        .testimonials-carousel .swiper-slide > div {
          height: auto !important;
          min-height: auto !important;
          flex: 1;
        }

        .testimonials-carousel .swiper-wrapper {
          align-items: flex-start !important;
        }

        /* Force recalculation on all testimonial cards */
        .testimonials-carousel .swiper-slide .bg-white {
          height: auto !important;
          min-height: auto !important;
          max-height: none !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
