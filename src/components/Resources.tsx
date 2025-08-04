import React from "react";
import Image from "next/image";
import resourcesData from "../data/resourcesData";

const Resources = () => (
  <section className="py-12 bg- w-full text-gray-700 ">
    <h2 className="text-3xl text-blue-gray text-center font-bold mb-4">Resources</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 py-4">
      {resourcesData.map((resource) => (
        <li
          key={resource.title}
          className="flex items-center gap-4 bg-white rounded-lg shadow p-4"
        >
          <Image
            src={resource.img}
            alt={resource.alt}
            width={100}
            height={100}
            className="rounded object-cover"
          />
          <a href={resource.link} className="underline font-medium">
            {resource.title}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default Resources;
