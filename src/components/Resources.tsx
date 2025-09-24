"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Resource } from "@/lib/sanity";
import ScrollAnimation from "./ScrollAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface ResourcesProps {
  resourcesData?: Resource[];
}

const Resources = ({ resourcesData }: ResourcesProps) => {
  if (!resourcesData || resourcesData.length === 0) {
    return (
      <section className="py-12 bg- w-full text-gray-700">
        <div className="text-center text-gray-500">
          <p>Resources section - Sanity data not available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 w-full bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation animation="fadeUp" delay={0}>
          <h2 className="text-3xl text-center text-blue-gray font-bold mb-8">
            Helpful Resources
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={200}>
          <div className="px-4 md:px-6">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              className="resources-carousel pb-20"
              style={
                {
                  "--swiper-pagination-bottom": "-40px",
                } as React.CSSProperties
              }
            >
              {resourcesData.map((resource) => (
                <SwiperSlide key={resource._id} className="h-auto">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full min-h-[400px]">
                    <div className="flex flex-col h-full">
                      {resource.image?.asset?.url && (
                        <div className="w-full h-48 flex-shrink-0">
                          <Image
                            src={resource.image.asset.url}
                            alt={resource.image?.alt || resource.title}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover rounded-t-xl"
                          />
                        </div>
                      )}

                      <div className="p-6 flex flex-col justify-between flex-grow w-full">
                        <div>
                          <h3 className="font-bold text-2xl mb-4 text-gray-800">
                            {resource.title}
                          </h3>

                          {resource.category && (
                            <span className="text-sm text-teal-700 bg-teal-100 px-3 py-1 rounded-full mb-4 inline-block">
                              {resource.category}
                            </span>
                          )}

                          <div className="mb-6">
                            {resource.description ? (
                              <p className="text-gray-600 leading-relaxed text-lg">
                                {resource.description.length > 300
                                  ? `${resource.description.substring(
                                      0,
                                      300
                                    )}...`
                                  : resource.description}
                              </p>
                            ) : (
                              <p className="text-gray-500">
                                No description available
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-row gap-4 mt-auto">
                          <Link
                            href={`/resources/${
                              resource.slug?.current || resource._id
                            }`}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-6 rounded-lg transition-all text-center flex-1"
                          >
                            View More
                          </Link>
                          {resource.url && (
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-gray hover:bg-blue-gray/80 text-white font-medium py-3 px-6 rounded-lg transition-all text-center flex-1"
                            >
                              Visit Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </ScrollAnimation>
      </div>

      <style jsx global>{`
        .resources-carousel .swiper-pagination-bullet {
          background-color: #fbe29c;
          opacity: 0.7;
        }
        .resources-carousel .swiper-pagination-bullet-active {
          background-color: #d97706;
          opacity: 1;
        }
        .resources-carousel .swiper-pagination {
          bottom: -40px !important;
          margin-bottom: 0px;
        }
      `}</style>
    </section>
  );
};

export default Resources;
