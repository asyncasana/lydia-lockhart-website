"use client";
import React, { useState } from "react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus("You must agree to the terms and conditions.");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("Thank you! Your message has been sent.");
        setName("");
        setEmail("");
        setMessage("");
        setConsent(false);
      } else {
        const data = await res.json();
        setStatus(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full p-10 md:px-35 py-12 text-gray-900 shadow-md">
      <ScrollAnimation animation="fadeUp" delay={0}>
        <h2 className="text-3xl text-center font-bold mb-4">Contact Form</h2>
      </ScrollAnimation>
      <ScrollAnimation animation="fadeUp" delay={200}>
        <div className="w-full max-w-2xl mx-auto text-center text-gray-700">
          <p className="mb-6 text-md">
            Please fill out the form below to get in touch. I&apos;ll get back to you
            as soon as possible.
          </p>
        </div>
      </ScrollAnimation>
      <ScrollAnimation animation="fadeUp" delay={400}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="block w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Message"
            className="block w-full p-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <label className="flex flex-row items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="accent-blueGray"
            />
            <span>
              By submitting, I agree to the{" "}
              <Link href="/terms" className="underline text-yellow-600">
                T&amp;Cs
              </Link>
            </span>
          </label>
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded w-full max-w-xs mx-auto block hover:bg-yellow-500 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
          {status && (
            <div className="text-center text-sm mt-2 text-yellow-700">
              {status}
            </div>
          )}
        </form>
      </ScrollAnimation>
    </section>
  );
};

export default ContactForm;
