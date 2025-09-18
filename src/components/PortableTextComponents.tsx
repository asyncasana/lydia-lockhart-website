import React from "react";

// Types for Portable Text components
interface PortableTextProps {
  children: React.ReactNode;
}

interface LinkProps {
  children: React.ReactNode;
  value?: {
    href: string;
    blank?: boolean;
  };
}

interface ImageProps {
  value: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

// Portable Text components for rich content rendering
export const portableTextComponents = {
  types: {
    image: ({ value }: ImageProps) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={value.asset.url}
        alt={value.alt || "Image"}
        className="rounded-lg my-6 max-w-full h-auto"
      />
    ),
  },
  marks: {
    link: ({ children, value }: LinkProps) => {
      if (!value?.href) return <span>{children}</span>;

      const isExternal = value.href.startsWith("http");
      const shouldOpenInNewTab = value.blank || isExternal;

      return (
        <a
          href={value.href}
          className="text-blue-gray hover:text-powder-blue underline"
          target={shouldOpenInNewTab ? "_blank" : undefined}
          rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }: PortableTextProps) => (
      <p className="mb-4">{children}</p>
    ),
    h1: ({ children }: PortableTextProps) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: PortableTextProps) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: PortableTextProps) => (
      <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }: PortableTextProps) => (
      <h4 className="text-xl font-bold mt-3 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: PortableTextProps) => (
      <blockquote className="border-l-4 border-powder-blue pl-4 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },
};
