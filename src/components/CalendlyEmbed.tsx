"use client";
import React, { useState } from "react";

interface CalendlyEmbedProps {
  calendlyUrl?: string;
}

const CalendlyEmbed = ({ calendlyUrl }: CalendlyEmbedProps) => {
  const defaultCalendlyUrl = "https://calendly.com/llockhartlifecoaching/30min";
  const finalCalendlyUrl = calendlyUrl || defaultCalendlyUrl;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full p-10 md:px-35 py-12 text-gray-900 shadow-md">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Book a Call</h2>
        <div className="w-full max-w-2xl mx-auto text-center text-gray-700">
          <p className="mb-6 text-md">
            Want a free 30 minute consultation? Book a call below.
          </p>
        </div>

        {/* Compact View - Always Visible */}
        <div className="text-center mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {isExpanded ? "Hide Booking Calendar" : "Show Booking Calendar"}
          </button>
        </div>

        {/* Expandable Calendly Iframe */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[650px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full flex justify-center">
            <iframe
              src={finalCalendlyUrl}
              width="100%"
              height="600"
              title="Schedule with Calendly"
              style={{ minWidth: 320, maxWidth: 700, height: 600 }}
              allow="camera; microphone; fullscreen;"
            ></iframe>
          </div>
        </div>

        {/* Alternative: Direct Calendly Link for Mobile/Small Screens */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Prefer to open in a new tab?
          </p>
          <a
            href={finalCalendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-600 hover:text-yellow-500 underline font-medium"
          >
            Open Calendly in New Window
          </a>
        </div>
      </div>
    </section>
  );
};

export default CalendlyEmbed;
