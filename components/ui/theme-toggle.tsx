"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 border cursor-pointer ${
        theme === "dark"
          ? "bg-slate-900/90 text-amber-400 border-slate-800 hover:bg-slate-800 hover:border-slate-700"
          : "bg-[#EAE2D6] text-[#606C59] border-[#8B9A6E]/30 hover:bg-[#8B9A6E]/20 hover:text-[#1E241B]"
      } ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12 text-[#4E5B47]" />
      )}
    </button>
  );
}
