import React from "react";

const Footer = () => (
  <footer className="w-full bg-powder-blue text-white py-6 px-4 mt-8 flex flex-col md:flex-row items-center md:justify-between gap-6 text-center md:text-left">
    {/* Socials left */}
    <div className="flex items-center justify-center gap-4 mb-4 md:mb-0 w-full md:w-auto md:justify-start md:order-1">
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <svg
          className="w-7 h-7 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.212 15.647 2.2 15.267 2.2 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.553 2.567 5.821 2.296 7.187 2.234 8.453 2.176 8.833 2.163 12 2.2zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
        </svg>
      </a>
      <a
        href="https://linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <svg
          className="w-6 h-6 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.001 3.601 4.601v5.595z" />
        </svg>
      </a>
    </div>
    {/* Center copyright and made by */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm w-full md:w-auto md:justify-center md:order-2">
      <span>&copy; {new Date().getFullYear()} Lydia Lockhart</span>
      <span>
        Created by{" "}
        <a
          href="https://pixelmyst.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          PixelMyst Studio
        </a>
      </span>
    </div>
    {/* Terms right */}
    <div className="w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0 md:order-3">
      <a href="/terms" className="underline text-sm">
        Terms &amp; Conditions
      </a>
    </div>
  </footer>
);

export default Footer;
