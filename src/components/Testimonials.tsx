"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Testimonial } from "@/lib/sanity";
import ScrollAnimation from "./ScrollAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Extend Window interface to include our custom function
declare global {
  interface Window {
    recalculateTestimonialHeights?: () => void;
  }
}

interface TestimonialsProps {
  testimonialsData?: Testimonial[];
  backgroundImage?: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get display text - prioritize short text for initial display
  const shortText = testimonial.shortText || "No testimonial available";
  const fullText = testimonial.fullText || testimonial.text || shortText;

  // Show short text initially, full text when expanded
  const displayText = isExpanded ? fullText : shortText;
  const hasExpandableContent =
    fullText !== shortText && fullText.length > shortText.length;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    // Recalculate heights after content change
    setTimeout(() => {
      if (window.recalculateTestimonialHeights) {
        window.recalculateTestimonialHeights();
      }
    }, 50);
  };

  // Trigger height recalculation when expansion state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.recalculateTestimonialHeights) {
        window.recalculateTestimonialHeights();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  return (
    <div className="testimonial-card-inner bg-white rounded-xl shadow-lg p-6 flex flex-col border border-gray-200 hover:shadow-xl transition-all duration-300 h-full w-full">
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
          <p>&ldquo;{displayText}&rdquo;</p>
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
  // Debug logging
  console.log("Testimonials data:", testimonialsData);

  // Function to calculate and set uniform height
  const calculateUniformHeight = useCallback(() => {
    const cards = document.querySelectorAll(".testimonial-card-inner");
    if (cards.length === 0) return;

    // Reset heights to auto to get natural heights
    cards.forEach((card) => {
      (card as HTMLElement).style.height = "auto";
    });

    // Calculate the tallest card height
    let maxHeight = 0;
    cards.forEach((card) => {
      const height = (card as HTMLElement).offsetHeight;
      maxHeight = Math.max(maxHeight, height);
    });

    // Set all cards to the tallest height
    if (maxHeight > 0) {
      cards.forEach((card) => {
        (card as HTMLElement).style.height = `${maxHeight}px`;
      });
    }
  }, []);

  // Recalculate heights when testimonials data changes or component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateUniformHeight();
    }, 100);
    return () => clearTimeout(timer);
  }, [testimonialsData, calculateUniformHeight]);

  // Make calculateUniformHeight available globally for card expansion
  useEffect(() => {
    window.recalculateTestimonialHeights = calculateUniformHeight;

    // Add window resize listener to recalculate heights
    const handleResize = () => {
      setTimeout(() => calculateUniformHeight(), 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      delete window.recalculateTestimonialHeights;
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateUniformHeight]);

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
          <div className="px-4 md:px-6 relative">
            {/* Navigation Arrows */}
            <div className="testimonials-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </div>
            <div className="testimonials-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </div>

            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: false,
                el: ".testimonials-pagination",
              }}
              navigation={{
                nextEl: ".testimonials-button-next",
                prevEl: ".testimonials-button-prev",
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
              className="testimonials-carousel px-12"
            >
              {testimonialsData.map((testimonial) => (
                <SwiperSlide key={testimonial._id} className="h-auto">
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Pagination Dots */}
            <div className="testimonials-pagination flex justify-center mt-6"></div>
          </div>
        </ScrollAnimation>
      </div>

      <style jsx global>{`
        .testimonials-pagination .swiper-pagination-bullet {
          background-color: #d97706 !important;
          opacity: 0.4 !important;
        }
        .testimonials-pagination .swiper-pagination-bullet-active {
          background-color: #d97706 !important;
          opacity: 1 !important;
        }
        .testimonials-carousel .swiper-pagination {
          bottom: -20px !important;
          margin-bottom: 0px;
          position: relative !important;
          display: block !important;
          text-align: center !important;
          width: 100% !important;
          z-index: 10 !important;
        }
        .testimonials-carousel .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          display: inline-block !important;
          border-radius: 50% !important;
          cursor: pointer !important;
        }
        .testimonials-carousel .swiper-slide {
          height: auto !important;
          display: flex !important;
          align-items: stretch;
        }
        .testimonials-carousel .swiper-wrapper {
          align-items: flex-start !important;
        }
        .testimonial-card-inner {
          transition: height 0.3s ease;
        }

        /* Navigation arrows */
        .testimonials-carousel .swiper-button-next,
        .testimonials-carousel .swiper-button-prev {
          color: #d97706 !important;
          background: rgba(255, 255, 255, 0.7) !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          margin-top: -20px !important;
          backdrop-filter: blur(4px) !important;
        }

        .testimonials-carousel .swiper-button-next:after,
        .testimonials-carousel .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
