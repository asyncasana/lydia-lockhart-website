import React from "react";
import Image from "next/image";

const AboutMe = () => (
  <section className="py-10 px-12 bg-white text-gray-700 flex flex-col md:flex-row items-center gap-8">
    {/* Photo left */}
    <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
        <Image
            src="/about-me.jpg"
            alt="Lydia Lockhart and Goose the dog / assistant coach"
            width={300}
            height={300}
            className="rounded-full hover:shadow-lg transition-shadow duration-300 shadow-powder-blue"
            draggable={false}
        />
    </div>
    {/* Text right */}
    <div className="w-full md:w-2/3">
      <h2 className="text-3xl text-blue-gray font-bold mb-4 text-center">About Me</h2>
      <p className="mb-2 italic text-md">
        Hi, I'm Lydia Lockhart, a passionate life coach for kids and families.
        Goose, my assistant coach, helps me bring joy and support to every
        session!
      </p>
      <p className="italic text-md">
        My approach combines empathy, creativity, and fun to help children
        discover their strengths and overcome challenges. I believe every child
        has unique potential, and I'm here to guide them on their journey to
        confidence and happiness. I will work with you to create a
        personalized coaching plan that fits your child's needs and goals. Along with
        Goose, I provide a supportive and engaging environment for growth.
      </p>
    </div>
  </section>
);

export default AboutMe;
