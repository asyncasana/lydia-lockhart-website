import React from "react";

const services = [
  {
    title: "Personal Coaching",
    img: "/images/private.jpg", // Replace with your actual image path
    bullets: [
      "Empowering children and teens to thrive",
      "One-to-one tailored sessions",
      "Flexible online or in-person options",
    ],
    button: true,
  },
  {
    title: "Support for Parents",
    img: "/images/family.jpg", // Replace with your actual image path
    bullets: [
      "Guidance for family wellbeing",
      "Stress management strategies",
      "Balancing work, life, and parenting",
    ],
    button: true,
  },
  {
    title: "Education Advice",
    img: "/images/school.jpg", // Replace with your actual image path
    bullets: [
      "School transition support",
      "Parent-school partnership",
      "Neurodiversity advocacy",
    ],
    button: true,
  },
];

const Services = () => (
  <section className="py-12 w-full bg-powder-blue text-gray-700 shadow-md">
    <h2 className="text-3xl text-white font-bold mb-8 text-center">
      Here To Help
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-2 ">
      {services.map((service, idx) => (
        <div
          key={service.title}
          className="bg-white rounded-xl shadow flex flex-col items-center p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
          <h3 className="text-xl font-semibold mb-4 text-center">
            {service.title}
          </h3>
          <ul className="list-disc pl-4 mb-6 text-left w-full">
            {service.bullets.map((point) => (
              <li key={point} className="mb-2">
                {point}
              </li>
            ))}
          </ul>
          {service.button && (
            <button className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-2 px-6 rounded transition-all mx-auto">
              Get Started
            </button>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default Services;
