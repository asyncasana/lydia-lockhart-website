import React from "react";

const Testimonials = () => (
  <section className="py-12 px-6 text-gray-800 w-full">
    <h2 className="text-3xl text-center text-blue-gray font-bold mb-4">Testimonials</h2>
    <div className="overflow-x-auto pb-2 w-full">
      <div className="flex gap-6 w-full justify-start md:justify-center">
        {/* Card 1 */}
        <div className="min-w-[250px] max-w-xs bg-white rounded-xl shadow p-4 flex-shrink-0 border border-gray-200 hover:shadow-md hover:shadow-gray-300 transition-shadow duration-300">
          <p className="text-lg mb-2">
            &quot;Lydia helped my child gain confidence and happiness!&quot;
          </p>
          <span className="text-sm text-gray-500">Parent</span>
        </div>
        {/* Card 2 */}
        <div className="min-w-[250px] max-w-xs bg-white rounded-xl shadow p-4 flex-shrink-0 border border-gray-200 hover:shadow-md hover:shadow-gray-300 transition-shadow duration-300">
          <p className="text-lg mb-2">
            &quot;Goose is the best assistant coach ever!&quot;
          </p>
          <span className="text-sm text-gray-500">Child</span>
        </div>
        {/* Card 3 */}
        <div className="min-w-[250px] max-w-xs bg-white rounded-xl shadow p-4 flex-shrink-0 border border-gray-200 hover:shadow-md hover:shadow-gray-300 transition-shadow duration-300">
          <p className="text-lg mb-2">
            &quot;Lydia&&apos;s coaching has made a huge difference in our family dynamic.&quot;
          </p>
          <span className="text-sm text-gray-500">Parent</span>
        </div>
      </div>
    </div>
    <div className="overflow-x-auto pb-2 w-full px-4"></div>
  </section>
);

export default Testimonials;
