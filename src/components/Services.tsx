import React from "react";
import Image from "next/image";
import { Service } from "@/lib/sanity";
import ScrollAnimation from "@/components/ScrollAnimation";

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
      <ScrollAnimation animation="fadeUp">
        <h2 className="text-3xl text-white font-bold mb-8 text-center">
          Here To Help
        </h2>
      </ScrollAnimation>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-2 ">
        {servicesData.map((service, index) => (
          <ScrollAnimation
            key={service._id}
            animation="fadeUp"
            delay={index * 200}
          >
            <div className="bg-white rounded-xl shadow flex flex-col items-center p-6 hover:shadow-lg transition-shadow duration-300">
              {service.icon?.asset?.url && (
                <Image
                  src={service.icon.asset.url}
                  alt={service.icon?.alt || service.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                  width={300}
                  height={200}
                  draggable={false}
                />
              )}
              {service.title && (
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {service.title}
                </h3>
              )}
              <div className="mb-6 text-left w-full">
                {service.description ? (
                  <div className="whitespace-pre-line">
                    {service.description}
                  </div>
                ) : (
                  <p>No description available</p>
                )}
              </div>
              <button className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-2 px-6 rounded transition-all mx-auto">
                Get Started
              </button>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
}
