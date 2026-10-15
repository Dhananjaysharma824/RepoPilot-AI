import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
}

export function Logo({ className = "", size = "md", showBadge = true }: LogoProps) {
  // Height classes that maintain the 3:1 aspect ratio cleanly
  const heightClasses = {
    sm: "h-7",
    md: "h-8",
    lg: "h-9",
  };

  const selectedHeight = heightClasses[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Light Mode Logo */}
      <img
        src="/repopilot-light.png"
        alt="RepoPilot"
        className={`${selectedHeight} w-auto object-contain block dark:hidden select-none`}
        loading="eager"
      />

      {/* Dark Mode Logo */}
      <img
        src="/repopilot-dark.png"
        alt="RepoPilot"
        className={`${selectedHeight} w-auto object-contain hidden dark:block select-none`}
        loading="eager"
      />

      {/* AI Badge */}
      {showBadge && (
        <span className="text-[11px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#4E5B47] dark:text-[#A8B88C] font-bold border border-[#8B9A6E]/30 shrink-0 select-none">
          AI
        </span>
      )}
    </div>
  );
}
