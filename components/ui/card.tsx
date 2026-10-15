import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  id?: string;
}

export function Card({ children, className = "", hoverEffect = false, id }: CardProps) {
  return (
    <div
      id={id}
      className={`bg-[#FFFFFF]/90 dark:bg-[#141A1F]/90 backdrop-blur-md border border-[#EAE2D6] dark:border-[#222C35] rounded-2xl p-6 shadow-sm dark:shadow-xl transition-all duration-200 ${
        hoverEffect
          ? "hover:border-[#8B9A6E]/50 hover:shadow-[#8B9A6E]/10 hover:-translate-y-0.5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-bold text-[#1E241B] dark:text-white tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm text-[#5A6653] dark:text-slate-400 mt-1 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
