"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Default navigation links - these will be replaced by Sanity data when connected
const defaultNavLinks = [
  { label: "About", url: "#about", isActive: true, openInNewTab: false },
  {
    label: "Testimonials",
    url: "#testimonials",
    isActive: true,
    openInNewTab: false,
  },
  { label: "Services", url: "#services", isActive: true, openInNewTab: false },
  {
    label: "Book a Call",
    url: "#calendly",
    isActive: true,
    openInNewTab: false,
  },
  { label: "Contact", url: "#contact", isActive: true, openInNewTab: false },
  {
    label: "Resources",
    url: "#resources",
    isActive: true,
    openInNewTab: false,
  },
];

export interface MenuItem {
  label: string;
  url: string;
  isActive: boolean;
  openInNewTab: boolean;
}

interface NavigationData {
  logo?: {
    asset: {
      url: string;
    };
  };
  menuItems: MenuItem[];
  showBlogLink: boolean;
  showFaqLink: boolean;
  ctaButton?: {
    text: string;
    url: string;
    isVisible: boolean;
  };
}

interface HeaderProps {
  navigationData?: NavigationData;
}

const Header = ({ navigationData }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Use Sanity data if available, otherwise fall back to defaults
  const menuItems =
    navigationData?.menuItems?.filter((item) => item.isActive) ||
    defaultNavLinks.filter((item) => item.isActive);
  const ctaButton = navigationData?.ctaButton;
  const logoUrl = navigationData?.logo?.asset?.url;

  // Create dynamic navigation items including conditional Blog/FAQ links
  const blogLink = navigationData?.showBlogLink === true ? [{
    label: "Blog",
    url: "/blog",
    isActive: true,
    openInNewTab: false,
  }] : [];

  const faqLink = navigationData?.showFaqLink === true ? [{
    label: "FAQ",
    url: "/faq",
    isActive: true,
    openInNewTab: false,
  }] : [];

  const allNavItems = [...menuItems, ...blogLink, ...faqLink];

  return (
    <header className="w-full bg-white flex items-center justify-between mt-4 px-4 py-4 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <Image
          src={logoUrl || "/wide-logo.svg"}
          alt="Lydia Lockhart Logo, line art of a dog and a child"
          width={300}
          height={100}
          draggable={false}
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 items-center">
        {allNavItems.map((item) => {
          const isInternal =
            item.url.startsWith("/") || item.url.startsWith("#");
          const LinkComponent = isInternal ? Link : "a";
          const linkProps = isInternal
            ? { href: item.url }
            : {
                href: item.url,
                target: item.openInNewTab ? "_blank" : undefined,
                rel: item.openInNewTab ? "noopener noreferrer" : undefined,
              };

          return (
            <LinkComponent
              key={`${item.label}-${item.url}`}
              {...linkProps}
              className="text-blue-gray hover:text-baby-blue font-medium"
            >
              {item.label}
            </LinkComponent>
          );
        })}

        {/* CTA Button */}
        {ctaButton?.isVisible && ctaButton.text && ctaButton.url && (
          <a
            href={ctaButton.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-500 transition-colors"
          >
            {ctaButton.text}
          </a>
        )}
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
          {allNavItems.map((item) => {
            const isInternal =
              item.url.startsWith("/") || item.url.startsWith("#");
            const LinkComponent = isInternal ? Link : "a";
            const linkProps = isInternal
              ? { href: item.url }
              : {
                  href: item.url,
                  target: item.openInNewTab ? "_blank" : undefined,
                  rel: item.openInNewTab ? "noopener noreferrer" : undefined,
                };

            return (
              <LinkComponent
                key={`mobile-${item.label}-${item.url}`}
                {...linkProps}
                className="text-blue-gray hover:text-baby-blue font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </LinkComponent>
            );
          })}

          {/* Mobile CTA Button */}
          {ctaButton?.isVisible && ctaButton.text && ctaButton.url && (
            <a
              href={ctaButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {ctaButton.text}
            </a>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
