import React from "react";
import Image from "next/image";
import { Resource } from "@/lib/sanity";
import ScrollAnimation from "./ScrollAnimation";

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
    <section className="py-12 bg- w-full text-gray-700 ">
      <ScrollAnimation animation="fadeUp" delay={0}>
        <h2 className="text-3xl text-blue-gray text-center font-bold mb-4">
          Resources
        </h2>
      </ScrollAnimation>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 py-4">
        {resourcesData.map((resource, index) => (
          <ScrollAnimation
            key={resource._id}
            animation="fadeLeft"
            delay={200 + index * 200}
          >
            <li className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
              {resource.image?.asset?.url && (
                <Image
                  src={resource.image.asset.url}
                  alt={resource.image?.alt || resource.title}
                  width={100}
                  height={100}
                  className="rounded object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <a
                  href={resource.url}
                  className="underline font-medium text-lg block mb-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.title}
                </a>
                {resource.description && (
                  <p className="text-sm text-gray-600">
                    {resource.description}
                  </p>
                )}
              </div>
            </li>
          </ScrollAnimation>
        ))}
      </ul>
    </section>
  );
};

export default Resources;
