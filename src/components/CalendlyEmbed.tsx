import React from "react";

const CalendlyEmbed = () => (
  <section className="w-full p-10 md:px-35 py-12 text-gray-900 shadow-md">
    <h2 className="text-3xl text-center font-bold mb-4">Book a Call</h2>
    <div className="w-full max-w-2xl mx-auto text-center text-gray-700">
      <p className="mb-6 text-md">
        Want a free 30 minute consultation? Book a call below.
      </p>
    </div>
    <div className="w-full flex justify-center my-8">
      <iframe
        src="https://calendly.com/llockhartlifecoaching/30min"
        width="100%"
        height="600"
        title="Schedule with Calendly"
        style={{ minWidth: 320, maxWidth: 700, height: 600 }}
        allow="camera; microphone; fullscreen;"
      ></iframe>
    </div>
  </section>
);

export default CalendlyEmbed;
