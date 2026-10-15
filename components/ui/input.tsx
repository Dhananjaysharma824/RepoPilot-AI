import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export function Input({ icon, error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-[#5A6653] dark:text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-[#F7F2EB] dark:bg-[#0B0F12] border ${
            error ? "border-rose-500 focus:ring-rose-500/30" : "border-[#EAE2D6] dark:border-[#222C35] focus:border-[#8B9A6E] focus:ring-[#8B9A6E]/30"
          } text-[#1E241B] dark:text-slate-100 placeholder-[#5A6653]/60 dark:placeholder-slate-500 text-sm rounded-xl ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 outline-none focus:ring-2 transition-all duration-200 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-semibold">{error}</p>}
    </div>
  );
}
