import React from "react";

const ConsentForm = () => (
  <section className="w-full p-10 md:px-35 py-12 text-gray-900 shadow-md">
    <h2 className="text-3xl text-center font-bold mb-4">Contact Form</h2>
    <div className="w-full max-w-2xl mx-auto text-center text-gray-700">
      <p className="mb-6 text-md">
        You can email me directly on{" "}
        <a
          href="mailto:lydialockhart@email.com"
          className="underline text-yellow-600"
        >
          lydialockhart@email.com
        </a>{" "}
        or WhatsApp{" "}
        <a href="tel:+441234567890" className="underline text-yellow-600">
          +44 1234 567 890
        </a>
        .<br />
        Otherwise, please fill out the form below and I’ll get back to you as
        soon as possible.
      </p>
    </div>
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="block w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="block w-full p-2 border rounded"
      />
      <textarea
        placeholder="Message or Consent"
        className="block w-full p-2 border rounded"
      />
      <label className="flex flex-col md:flex-row items-start md:items-center gap-2 text-sm">
        <input type="checkbox" required className="accent-blueGray" />
        By submitting, I agree to the{" "}
        <a href="/terms" className="underline text-yellow-600">
          terms and conditions
        </a>
      </label>
      <button
        type="submit"
        className="bg-yellow-600 text-white px-4 py-2 rounded w-full max-w-xs mx-auto block hover:bg-yellow-500 transition"
      >
        Submit
      </button>
    </form>
  </section>
);

export default ConsentForm;
