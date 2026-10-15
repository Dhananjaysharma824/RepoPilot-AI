import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5 shadow-md",
  };

  const variantStyles = {
    primary:
      "bg-[#8B9A6E] hover:bg-[#77875C] text-white dark:text-[#0B0F12] font-semibold shadow-sm hover:shadow-[#8B9A6E]/20 border border-[#8B9A6E]/40",
    secondary:
      "bg-[#EAE2D6] dark:bg-[#1E272E] hover:bg-[#DCD4C7] dark:hover:bg-[#2A3642] text-[#1E241B] dark:text-slate-100 border border-[#8B9A6E]/20 dark:border-slate-700/80 shadow-sm",
    outline:
      "bg-transparent hover:bg-[#EAE2D6]/60 dark:hover:bg-slate-800/60 text-[#4E5B47] dark:text-slate-300 hover:text-[#1E241B] dark:hover:text-white border border-[#8B9A6E]/30 dark:border-slate-700",
    ghost:
      "bg-transparent hover:bg-[#EAE2D6]/50 dark:hover:bg-slate-800/50 text-[#5A6653] dark:text-slate-300 hover:text-[#1E241B] dark:hover:text-white",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white shadow-sm border border-rose-500/30",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
