"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  BookOpen,
  FolderGit2,
  Settings,
  Sparkles,
  LogOut,
  X,
  User,
  CheckCircle2,
  Trash2,
  Shield,
  Save,
} from "lucide-react";
import { Button } from "../ui/button";
import { Logo } from "../ui/logo";

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [userName, setUserName] = useState("User Account");
  const [userEmail, setUserEmail] = useState("user@repopilot.ai");
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) setUserName(parsed.name);
        if (parsed.email) setUserEmail(parsed.email);
      }
    } catch {}
  }, []);

  const handleSaveProfile = () => {
    try {
      localStorage.setItem(
        "user_profile",
        JSON.stringify({
          name: userName,
          email: userEmail,
        })
      );
      setNoticeMessage("Profile settings updated successfully!");
      setTimeout(() => {
        setNoticeMessage(null);
        window.location.reload();
      }, 800);
    } catch {}
  };

  const handleClearCache = () => {
    try {
      localStorage.removeItem("recent_analyses");
      setNoticeMessage("Local repository cache cleared.");
      setTimeout(() => {
        setNoticeMessage(null);
        window.location.reload();
      }, 800);
    } catch {}
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      try {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } catch {}
    }
  };

  interface NavItem {
    id: string;
    name: string;
    href?: string;
    icon: any;
    onClick?: () => void;
    isActive: boolean;
    badge?: string;
  }

  const navItems: NavItem[] = [
    {
      id: "overview",
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      onClick: scrollToTop,
      isActive: pathname === "/dashboard" && currentTab === "overview" && !showSettingsModal,
    },
    {
      id: "analyze",
      name: "Analyze Repo",
      href: "/analyze",
      icon: Search,
      onClick: scrollToTop,
      isActive: pathname === "/analyze" && !showSettingsModal,
    },
    {
      id: "saved",
      name: "Saved Reports",
      href: "/dashboard?tab=saved",
      icon: BookOpen,
      onClick: scrollToTop,
      isActive: pathname === "/dashboard" && currentTab === "saved" && !showSettingsModal,
    },
    {
      id: "my-repos",
      name: "My Repositories",
      href: "/dashboard?tab=my-repos",
      icon: FolderGit2,
      onClick: scrollToTop,
      isActive: pathname === "/dashboard" && currentTab === "my-repos" && !showSettingsModal,
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      onClick: () => setShowSettingsModal(true),
      isActive: showSettingsModal,
    },
  ];

  return (
    <>
      <aside className="w-64 border-r border-[#EAE2D6] dark:border-[#222C35] bg-[#F7F2EB] dark:bg-[#0B0F12] flex flex-col justify-between h-screen sticky top-0 shrink-0 transition-colors duration-200">
        <div className="p-4">
          {/* Brand */}
          <Link href="/" className="flex items-center px-3 py-3 mb-6 group hover:opacity-90 transition-opacity">
            <Logo size="md" />
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            <div className="px-3 text-[11px] font-bold text-[#5A6653] dark:text-slate-400 uppercase tracking-wider mb-2">
              Main Menu
            </div>
            {navItems.map((item) => {
              const isActive = item.isActive;
              const Icon = item.icon;

              if (item.href) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={item.onClick}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-[#8B9A6E]/15 text-[#4E5B47] dark:text-[#B4C49A] border border-[#8B9A6E]/30"
                        : "text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-slate-200 hover:bg-[#EAE2D6]/60 dark:hover:bg-[#141A1F]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#8B9A6E]" : "text-[#5A6653] dark:text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAE2D6] dark:bg-slate-800 text-[#1E241B] dark:text-slate-300 font-normal">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#8B9A6E]/15 text-[#4E5B47] dark:text-[#B4C49A] border border-[#8B9A6E]/30"
                      : "text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-slate-200 hover:bg-[#EAE2D6]/60 dark:hover:bg-[#141A1F]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#8B9A6E]" : "text-[#5A6653] dark:text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User / Pro Badge Section */}
        <div className="p-4 border-t border-[#EAE2D6] dark:border-[#222C35] space-y-3">
          <div className="p-3 rounded-xl bg-[#EAE2D6]/60 dark:bg-[#141A1F] border border-[#8B9A6E]/30">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#8B9A6E]" />
              <span className="text-xs font-bold text-[#1E241B] dark:text-white">Pro Plan Active</span>
            </div>
            <p className="text-[11px] text-[#5A6653] dark:text-slate-400">
              Unlimited AI repository roadmaps & full architecture analysis.
            </p>
          </div>

          <button
            onClick={async () => {
              document.cookie = "demo_session=; path=/; max-age=0";
              try {
                localStorage.removeItem("user_profile");
              } catch {}
              const { supabase } = await import("@/lib/supabase");
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white rounded-xl hover:bg-[#EAE2D6]/60 dark:hover:bg-[#141A1F] transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-[#1E241B]/40 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F7F2EB] dark:bg-[#141A1F] border border-[#EAE2D6] dark:border-[#222C35] rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EAE2D6] dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-[#1E241B] dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#8B9A6E]" />
                <span>Account & Engine Settings</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white hover:bg-[#EAE2D6] dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {noticeMessage && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{noticeMessage}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* User Profile Form */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#5A6653] dark:text-slate-400 uppercase tracking-wider">Profile Information</h4>
                <div>
                  <label className="block text-xs font-medium text-[#1E241B] dark:text-slate-300 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-[#FFFFFF] dark:bg-[#0B0F12] border border-[#EAE2D6] dark:border-[#222C35] rounded-xl px-3 py-2 text-sm text-[#1E241B] dark:text-slate-100 focus:outline-none focus:border-[#8B9A6E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1E241B] dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-[#FFFFFF] dark:bg-[#0B0F12] border border-[#EAE2D6] dark:border-[#222C35] rounded-xl px-3 py-2 text-sm text-[#1E241B] dark:text-slate-100 focus:outline-none focus:border-[#8B9A6E]"
                  />
                </div>
              </div>

              {/* System Engine Status */}
              <div className="space-y-2 pt-2 border-t border-[#EAE2D6] dark:border-slate-800">
                <h4 className="text-xs font-semibold text-[#5A6653] dark:text-slate-400 uppercase tracking-wider">Engine Connections</h4>
                <div className="p-3 bg-[#FFFFFF] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1E241B] dark:text-slate-300">Google Gemini AI Engine</span>
                    <span className="text-[#8B9A6E] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1E241B] dark:text-slate-300">Supabase SSR Auth</span>
                    <span className="text-[#8B9A6E] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Clear Cache Action */}
              <div className="pt-2 border-t border-[#EAE2D6] dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#1E241B] dark:text-slate-200">Local Analysis Cache</div>
                  <div className="text-[11px] text-[#5A6653] dark:text-slate-500">Reset saved local repository history</div>
                </div>
                <button
                  type="button"
                  onClick={handleClearCache}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Cache</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EAE2D6] dark:border-slate-800">
              <Button variant="ghost" size="sm" onClick={() => setShowSettingsModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveProfile} className="gap-1.5">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Sidebar() {
  return (
    <Suspense fallback={<aside className="w-64 border-r border-[#EAE2D6] dark:border-[#222C35] bg-[#F7F2EB] dark:bg-[#0B0F12] h-screen sticky top-0 shrink-0"></aside>}>
      <SidebarContent />
    </Suspense>
  );
}
