import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  // Height classes that give prominent, clean visibility while maintaining the 3:1 ratio
  const heightClasses = {
    sm: "h-8",         // 32px
    md: "h-10 sm:h-11", // 40px - 44px (prominent & crisp)
    lg: "h-12 sm:h-14", // 48px - 56px
    xl: "h-16",         // 64px
  };

  const selectedHeight = heightClasses[size];

  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* Light Mode Logo */}
      <img
        src="/repopilot-light.png"
        alt="RepoPilot"
        className={`${selectedHeight} w-auto object-contain block dark:hidden select-none transition-all duration-200`}
        loading="eager"
      />

      {/* Dark Mode Logo */}
      <img
        src="/repopilot-dark.png"
        alt="RepoPilot"
        className={`${selectedHeight} w-auto object-contain hidden dark:block select-none transition-all duration-200`}
        loading="eager"
      />
    </div>
  );
}
