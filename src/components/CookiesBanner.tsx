"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface CookiesBannerProps {
  privacySlug?: string;
}

const CookiesBanner = ({ privacySlug }: CookiesBannerProps) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    // Enable analytics, tracking, etc.
    console.log("Cookies accepted - analytics enabled");
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
    // Disable non-essential cookies
    console.log("Cookies declined - only essential cookies enabled");
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 border-t-4 border-yellow-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm md:text-base">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By clicking
            &ldquo;Accept All&rdquo;, you consent to our use of cookies.{" "}
            <Link
              href={`/${privacySlug || "privacy-policy"}`}
              className="underline hover:text-yellow-400 transition-colors"
            >
              Learn more in our Privacy Policy
            </Link>
          </p>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;
