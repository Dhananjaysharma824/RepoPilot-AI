"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, Plus, LogOut, LayoutDashboard, Sparkles, CheckCircle2, User } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";

export function Topbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("user@repopilot.ai");
  const [userName, setUserName] = useState<string>("User Account");
  const [userInitials, setUserInitials] = useState<string>("UA");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const stored = localStorage.getItem("user_profile");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.email) setUserEmail(parsed.email);
          if (parsed.name) {
            setUserName(parsed.name);
            setUserInitials(parsed.name.slice(0, 2).toUpperCase());
          }
        }

        const { supabase } = await import("@/lib/supabase");
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          if (user.email) setUserEmail(user.email);
          const full =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "User";
          const formatted = full.charAt(0).toUpperCase() + full.slice(1);
          setUserName(formatted);
          setUserInitials(formatted.slice(0, 2).toUpperCase());
        }
      } catch (err) {
        console.warn("User session load notice:", err);
      }
    }
    loadUser();

    function handleClickOutside(e: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim();
    if (query.startsWith("http://") || query.startsWith("https://") || query.includes("/")) {
      router.push(`/analyze?url=${encodeURIComponent(query)}`);
    } else {
      router.push(`/analyze?url=${encodeURIComponent(`https://github.com/${query}`)}`);
    }
  };

  const handleSignOut = async () => {
    document.cookie = "demo_session=; path=/; max-age=0";
    try {
      localStorage.removeItem("user_profile");
    } catch {}
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.auth.signOut();
    } catch {}
    window.location.href = "/login";
  };

  return (
    <header className="h-16 border-b border-[#EAE2D6] dark:border-[#222C35] bg-[#F7F2EB]/90 dark:bg-[#0B0F12]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 transition-colors duration-200">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="w-full max-w-md relative">
        <Search className="w-4 h-4 text-[#5A6653] dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search repository URL (e.g. facebook/react) & press Enter..."
          className="w-full bg-[#FFFFFF] dark:bg-[#141A1F] border border-[#EAE2D6] dark:border-[#222C35] rounded-xl pl-10 pr-4 py-1.5 text-sm text-[#1E241B] dark:text-slate-200 placeholder-[#5A6653]/60 dark:placeholder-slate-500 focus:outline-none focus:border-[#8B9A6E] focus:ring-1 focus:ring-[#8B9A6E]/30 transition-all shadow-sm"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <Link href="/analyze">
          <Button size="sm" variant="primary">
            <Plus className="w-4 h-4" />
            <span>New Analysis</span>
          </Button>
        </Link>

        {/* Notifications Popover */}
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setHasUnread(false);
            }}
            className="p-2 rounded-xl text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white bg-[#FFFFFF] dark:bg-[#141A1F] hover:bg-[#EAE2D6]/50 dark:hover:bg-slate-800 border border-[#EAE2D6] dark:border-[#222C35] relative transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B9A6E] animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#FFFFFF] dark:bg-[#141A1F] border border-[#EAE2D6] dark:border-[#222C35] rounded-2xl shadow-xl dark:shadow-2xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-[#EAE2D6] dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-[#1E241B] dark:text-white flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-[#8B9A6E]" /> Notifications
                </span>
                <span className="text-[10px] text-[#5A6653] dark:text-slate-500 font-mono">System Status</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-slate-800 flex items-start gap-2 text-[#1E241B] dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1E241B] dark:text-white">Google Gemini AI Engine</span>
                    <p className="text-[11px] text-[#5A6653] dark:text-slate-400">Gemini 2.5 Flash model operational & ready.</p>
                  </div>
                </div>

                <div className="p-2.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-slate-800 flex items-start gap-2 text-[#1E241B] dark:text-slate-300">
                  <Sparkles className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1E241B] dark:text-white">Session Active</span>
                    <p className="text-[11px] text-[#5A6653] dark:text-slate-400">Your profile metrics are synced with Supabase.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-[#EAE2D6] dark:bg-slate-800"></div>

        {/* User Profile Menu Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#8B9A6E] flex items-center justify-center text-white dark:text-[#0B0F12] font-bold text-xs border border-[#8B9A6E]/50 shadow-sm group-hover:scale-105 transition-transform">
              {userInitials}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-[#1E241B] dark:text-slate-200 group-hover:text-[#8B9A6E] transition-colors">
                {userName}
              </div>
              <div className="text-[10px] text-[#5A6653] dark:text-slate-400">{userEmail}</div>
            </div>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#FFFFFF] dark:bg-[#141A1F] border border-[#EAE2D6] dark:border-[#222C35] rounded-2xl shadow-xl dark:shadow-2xl p-2 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-[#EAE2D6] dark:border-slate-800">
                <div className="text-xs font-bold text-[#1E241B] dark:text-white truncate">{userName}</div>
                <div className="text-[10px] text-[#5A6653] dark:text-slate-400 truncate">{userEmail}</div>
              </div>

              <Link
                href="/dashboard"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#4E5B47] dark:text-slate-300 hover:text-[#1E241B] dark:hover:text-white hover:bg-[#EAE2D6]/60 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#8B9A6E]" />
                <span>Dashboard Overview</span>
              </Link>

              <Link
                href="/analyze"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#4E5B47] dark:text-slate-300 hover:text-[#1E241B] dark:hover:text-white hover:bg-[#EAE2D6]/60 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-[#8B9A6E]" />
                <span>Analyze New Repository</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors w-full cursor-pointer border-t border-[#EAE2D6] dark:border-slate-800/80 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
