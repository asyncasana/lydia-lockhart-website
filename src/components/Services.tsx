"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/sanity";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ServicesProps {
  servicesData?: Service[];
}

export default function Services({ servicesData }: ServicesProps) {
  if (!servicesData || servicesData.length === 0) {
    return (
      <section className="py-12 bg-baby-blue text-gray-700 w-full">
        <div className="text-center text-gray-500">
          <p>Services section - Sanity data not available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 w-full bg-powder-blue text-gray-700 shadow-md">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation animation="fadeUp">
          <h2 className="text-3xl text-white font-bold mb-8 text-center">
            Here To Help
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={200}>
          <div className="px-4 md:px-6 relative">
            {/* Navigation Arrows */}
            <div className="services-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
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
            <div className="services-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
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
                el: ".services-pagination",
              }}
              navigation={{
                nextEl: ".services-button-next",
                prevEl: ".services-button-prev",
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
              className="services-carousel px-12"
              style={
                {
                  "--swiper-pagination-bottom": "0px",
                } as React.CSSProperties
              }
            >
              {servicesData.map((service) => (
                <SwiperSlide key={service._id} className="h-auto">
                  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col border border-gray-200 hover:shadow-xl transition-all duration-300 h-full min-h-[500px] max-h-[500px] items-stretch">
                    {service.icon?.asset?.url && (
                      <div className="mb-4">
                        <Image
                          src={service.icon.asset.url}
                          alt={service.icon?.alt || service.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                          draggable={false}
                        />
                      </div>
                    )}

                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-xl mb-3 text-gray-800 text-center">
                        {service.title}
                      </h3>

                      <div className="mb-6 flex-grow text-center px-2">
                        {service.description ? (
                          <p className="text-gray-600 leading-relaxed min-h-[4.5rem]">
                            {service.description.length > 150
                              ? `${service.description.substring(0, 150)}...`
                              : service.description}
                          </p>
                        ) : (
                          <p className="text-gray-500 min-h-[4.5rem]">
                            No description available
                          </p>
                        )}
                      </div>

                      <div className="flex justify-center mt-auto pt-2">
                        {service.slug?.current && (
                          <Link
                            href={`/services/${service.slug.current}`}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg transition-all"
                          >
                            View More
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Pagination dots */}
            <div className="services-pagination mt-6 text-center"></div>
          </div>
        </ScrollAnimation>

        {/* Custom CSS for pagination styling */}
        <style jsx global>{`
          .services-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #ffffff;
            border-radius: 50%;
            margin: 0 6px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .services-pagination .swiper-pagination-bullet-active {
            background: #ffffff !important;
            transform: scale(1.2);
          }
        `}</style>
      </div>
    </section>
  );
}
