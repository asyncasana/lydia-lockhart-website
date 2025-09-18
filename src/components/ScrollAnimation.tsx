"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scale";
  delay?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animation = "fadeUp",
  delay = 0,
  className = "",
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClasses = {
    fadeUp: `transform transition-all duration-700 ease-out ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`,
    fadeLeft: `transform transition-all duration-700 ease-out ${
      isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
    }`,
    fadeRight: `transform transition-all duration-700 ease-out ${
      isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
    }`,
    scale: `transform transition-all duration-700 ease-out ${
      isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
    }`,
  };

  return (
    <div
      ref={elementRef}
      className={`${animationClasses[animation]} ${className}`}
    >
      {children}
    </div>
  );
}
