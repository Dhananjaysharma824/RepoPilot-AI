"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasDemoCookie = document.cookie.includes("demo_session=true");
    const hasUserProfile = !!localStorage.getItem("user_profile");
    if (hasDemoCookie || hasUserProfile) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = async () => {
    document.cookie = "demo_session=; path=/; max-age=0";
    try {
      localStorage.removeItem("user_profile");
    } catch {}
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.auth.signOut();
    } catch {}
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EAE2D6] dark:border-[#222C35] bg-[#F7F2EB]/90 dark:bg-[#0B0F12]/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#8B9A6E] p-0.5 shadow-md shadow-[#8B9A6E]/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#1E241B] dark:bg-[#0B0F12] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#8B9A6E]" />
            </div>
          </div>
          <span className="font-bold text-lg text-[#1E241B] dark:text-white tracking-tight flex items-center gap-1.5">
            RepoPilot <span className="text-xs px-1.5 py-0.5 rounded bg-[#8B9A6E]/15 text-[#4E5B47] dark:text-[#A8B88C] font-semibold border border-[#8B9A6E]/30">AI</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#5A6653] dark:text-slate-300">
          <Link href="/" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/#features" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/analyze" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">
            Analyze URL
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <LayoutDashboard className="w-4 h-4 text-[#8B9A6E]" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5 text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/analyze">
                <Button variant="primary" size="sm">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
