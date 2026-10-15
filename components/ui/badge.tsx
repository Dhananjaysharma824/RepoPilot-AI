import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "sage" | "indigo" | "violet" | "cyan" | "emerald" | "amber" | "slate";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "sage",
  className = "",
  icon,
}: BadgeProps) {
  const variantStyles = {
    sage: "bg-[#8B9A6E]/15 text-[#4E5B47] dark:text-[#B4C49A] border-[#8B9A6E]/30",
    indigo: "bg-[#8B9A6E]/15 text-[#4E5B47] dark:text-[#B4C49A] border-[#8B9A6E]/30",
    violet: "bg-[#EAE2D6] dark:bg-[#1E272E] text-[#5A6653] dark:text-[#CBD5E1] border-[#EAE2D6] dark:border-[#2D3844]",
    cyan: "bg-[#EEEEEE] dark:bg-[#1A232A] text-[#4E5B47] dark:text-[#A4B58A] border-[#8B9A6E]/20",
    emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20",
    slate: "bg-[#EEEEEE] dark:bg-[#1E272E] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-[#2D3844]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
