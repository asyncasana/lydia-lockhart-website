import React from "react";

const Hero = () => (
  <section className="relative w-full flex flex-col items-center justify-center px-4 text-blue-gray text-center shadow-lg overflow-hidden min-h-[80vh]">
    {/* Video background */}
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      src="/hero-video.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
    {/* Overlay for readability */}
    <div className="absolute inset-0 z-10 bg-black opacity-10"></div>
    {/* Content above video */}
    <div className="relative z-20 flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl text-white md:text-6xl font-extrabold mb-4">
        Helping Little Minds Grow
      </h1>
      <p className="text-lg text-white md:text-2xl max-w-2xl mx-auto mb-6">
        Life coaching for kids and families. <br />
        Discover your strengths and thrive with Lydia and Goose!
      </p>
      <a
        href="#contact"
        className="inline-block bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-500 transition"
      >
        Get in Touch
      </a>
    </div>
  </section>
);

export default Hero;
