"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Shield, X, Lock, FileText, CheckCircle2 } from "lucide-react";
import { GithubIcon, TwitterIcon } from "../ui/icons";
import { Logo } from "../ui/logo";

export function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "security" | null>(null);

  return (
    <footer className="border-t border-[#EAE2D6] dark:border-[#222C35] bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#5A6653] dark:text-slate-400 text-sm py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center group hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>
            <p className="text-xs text-[#5A6653] dark:text-slate-400 leading-relaxed">
              Understand any GitHub repository in minutes. Automated tech stack detection, folder visualization, and AI developer onboarding.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-[#1E241B] dark:text-slate-200 text-xs uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/analyze" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">Analyze Repository</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="#features" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-[#1E241B] dark:text-slate-200 text-xs uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://docs.github.com/en/rest" target="_blank" rel="noreferrer" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">GitHub REST API Docs</a></li>
              <li><Link href="/login" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">Developer Portal</Link></li>
              <li><span className="text-[#8B9A6E] font-semibold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#8B9A6E] animate-pulse"></span> API Status: Operational</span></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-bold text-[#1E241B] dark:text-slate-200 text-xs uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-[#1E241B] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("terms")}
                  className="hover:text-[#1E241B] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("security")}
                  className="hover:text-[#1E241B] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EAE2D6] dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p suppressHydrationWarning>© 2026 RepoPilot AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#1E241B] dark:hover:text-white transition-colors">
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#1E241B]/40 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F7F2EB] dark:bg-[#141A1F] border border-[#EAE2D6] dark:border-[#222C35] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EAE2D6] dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-[#1E241B] dark:text-white flex items-center gap-2">
                {activeModal === "privacy" && <Lock className="w-4 h-4 text-[#8B9A6E]" />}
                {activeModal === "terms" && <FileText className="w-4 h-4 text-[#8B9A6E]" />}
                {activeModal === "security" && <Shield className="w-4 h-4 text-[#8B9A6E]" />}
                <span>
                  {activeModal === "privacy" && "Privacy Policy"}
                  {activeModal === "terms" && "Terms of Service"}
                  {activeModal === "security" && "Security Notice"}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white hover:bg-[#EAE2D6] dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#1E241B] dark:text-slate-300 leading-relaxed max-h-80 overflow-y-auto pr-1">
              {activeModal === "privacy" && (
                <>
                  <p>
                    RepoPilot AI respects your privacy. We process repository metadata and configuration files solely to provide repository architecture insights, technology detection, and developer onboarding roadmaps.
                  </p>
                  <p>
                    Your authentication credentials are encrypted using Supabase OAuth 2.0 and standard cookie headers. We do not sell or store private code repositories.
                  </p>
                </>
              )}

              {activeModal === "terms" && (
                <>
                  <p>
                    By using RepoPilot AI, you agree to inspect public and authorized private GitHub repositories responsibly in accordance with GitHub&apos;s API rate limit policies.
                  </p>
                  <p>
                    Our Gemini AI analysis engine generates recommendations and code structure summaries for informational and developer onboarding purposes.
                  </p>
                </>
              )}

              {activeModal === "security" && (
                <>
                  <div className="p-3 bg-[#FFFFFF] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#8B9A6E] font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> OAuth 2.0 & Cookie Encrypted
                    </div>
                    <p className="text-[11px] text-[#5A6653] dark:text-slate-400">
                      All auth sessions are protected by Supabase SSR auth cookies and client-side encryption.
                    </p>
                  </div>
                  <p>
                    We regularly audit our dependencies, GitHub API integrations, and AI pipelines to ensure secure data handling.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-[#8B9A6E] hover:bg-[#77875C] text-white dark:text-[#0B0F12] text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
