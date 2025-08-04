"use client";

import React, { useState } from "react";
import Image from "next/image";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
  { name: "Consent Form", href: "#consent" },
  { name: "Resources", href: "#resources" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full bg-white flex items-center justify-between mt-4 px-4 py-4 sticky top-0 z-50">
      {/* Logo */}
      <a href="/">
        <Image
          src="/wide-logo.svg"
          alt="Lydia Lockhart Logo, line art of a dog and a child"
          width={300}
          height={100}
          draggable={false}
        />
      </a>
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-blue-gray hover:text-baby-blue font-medium"
          >
            {link.name}
          </a>
        ))}
      </nav>
      {/* Mobile Burger */}
      <button
        className="md:hidden flex flex-col items-center justify-center w-10 h-10 mr-2"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-blue-gray mb-1"></span>
        <span className="block w-6 h-0.5 bg-blue-gray mb-1"></span>
        <span className="block w-6 h-0.5 bg-blue-gray"></span>
      </button>
      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-blue-gray hover:text-baby-blue font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
