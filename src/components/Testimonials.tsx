import React from "react";
import { Testimonial } from "@/lib/sanity";
import ScrollAnimation from "./ScrollAnimation";

interface TestimonialsProps {
  testimonialsData?: Testimonial[];
}

const Testimonials = ({ testimonialsData }: TestimonialsProps) => {
  if (!testimonialsData || testimonialsData.length === 0) {
    return (
      <section className="py-12 px-6 text-gray-800 w-full">
        <div className="text-center text-gray-500">
          <p>Testimonials section - Sanity data not available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 text-gray-800 w-full">
      <ScrollAnimation animation="fadeUp" delay={0}>
        <h2 className="text-3xl text-center text-blue-gray font-bold mb-4">
          Testimonials
        </h2>
      </ScrollAnimation>
      <div className="overflow-x-auto pb-2 w-full">
        <div className="flex gap-6 w-full justify-start md:justify-center">
          {testimonialsData.map((testimonial, index) => (
            <ScrollAnimation
              key={testimonial._id}
              animation="fadeUp"
              delay={200 + index * 150}
            >
              <div className="min-w-[250px] max-w-xs bg-white rounded-xl shadow p-4 flex-shrink-0 border border-gray-200 hover:shadow-md hover:shadow-gray-300 transition-shadow duration-300">
                <div className="text-lg mb-2">
                  {testimonial.text ? (
                    <p>&quot;{testimonial.text}&quot;</p>
                  ) : (
                    <p>&quot;No testimonial content available&quot;</p>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {testimonial.name || testimonial.role || "Anonymous"}
                </span>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto pb-2 w-full px-4"></div>
    </section>
  );
};

export default Testimonials;
