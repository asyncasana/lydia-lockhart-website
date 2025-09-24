import React from "react";

export interface SocialLink {
  platform: string;
  url: string;
  isVisible: boolean;
}

export interface AdditionalLink {
  label: string;
  url: string;
  isVisible: boolean;
}

export interface FooterPage {
  _id: string;
  title: string;
  slug: { current: string };
  footerOrder?: number;
}

interface FooterData {
  footerText?: string;
  socialLinks?: SocialLink[];
  copyrightText?: string;
  additionalLinks?: AdditionalLink[];
}

interface FooterProps {
  footerData?: FooterData;
  footerPages?: FooterPage[];
}

const Footer = ({ footerData, footerPages = [] }: FooterProps) => {
  const socialLinks =
    footerData?.socialLinks?.filter((link) => link.isVisible) || [];
  const additionalLinks =
    footerData?.additionalLinks?.filter((link) => link.isVisible) || [];
  const copyrightText =
    footerData?.copyrightText || `© ${new Date().getFullYear()} Lydia Lockhart`;

  // Combine Sanity pages with additional links - all managed in Sanity
  const allFooterLinks = [
    ...footerPages.map((page) => ({
      label: page.title,
      url: `/${page.slug.current}`,
      isInternal: true,
    })),
    ...additionalLinks.map((link) => ({
      label: link.label,
      url: link.url,
      isInternal: link.url.startsWith("/") || link.url.startsWith("#"),
    })),
  ];

  return (
    <footer className="w-full bg-powder-blue text-white py-6 px-4 mt-8">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 text-center md:text-left">
        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-0 w-full md:w-auto md:justify-start md:order-1">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  social.platform.charAt(0).toUpperCase() +
                  social.platform.slice(1)
                }
                className="hover:opacity-80 transition-opacity text-sm px-3 py-1 bg-white/20 rounded-full"
              >
                {social.platform.charAt(0).toUpperCase() +
                  social.platform.slice(1)}
              </a>
            ))}
          </div>
        )}

        {/* Center copyright and footer text */}
        <div
          className={`flex flex-col md:flex-row items-center justify-center gap-2 text-sm w-full md:w-auto ${
            socialLinks.length === 0 && additionalLinks.length === 0
              ? "md:justify-center"
              : "md:justify-center md:order-2"
          }`}
        >
          <span>{copyrightText}</span>
          {footerData?.footerText && (
            <span className="hidden md:inline">|</span>
          )}
          {footerData?.footerText && <span>{footerData.footerText}</span>}
          <span className="hidden md:inline">|</span>
          <span>
            Created by{" "}
            <a
              href="https://pixelmyst.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
            >
              PixelMyst Studio
            </a>
          </span>
        </div>

        {/* Footer Links (Pages + Additional Links) */}
        {(allFooterLinks.length > 0 || socialLinks.length > 0) && (
          <div className="w-full md:w-auto flex flex-wrap justify-center md:justify-end gap-4 mt-4 md:mt-0 md:order-3">
            {allFooterLinks.length > 0 ? (
              allFooterLinks.map((link, index) => (
                <a
                  key={`${link.label}-${link.url}-${index}`}
                  href={link.url}
                  className="underline text-sm hover:opacity-80 transition-opacity"
                  {...(!link.isInternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {link.label}
                </a>
              ))
            ) : (
              <div className="text-sm text-gray-300">
                Add pages in Sanity to show footer links
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
