"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Code2, GitFork, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-[#F7F2EB] dark:bg-[#0B0F12] transition-colors duration-200">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#8B9A6E]/15 dark:bg-[#8B9A6E]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center">
            <Badge variant="sage" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Next-Gen AI Repository Intelligence
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1E241B] dark:text-white tracking-tight leading-[1.15]">
            Understand Any GitHub Repository{" "}
            <span className="text-[#8B9A6E]">
              in Minutes
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-[#5A6653] dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            RepoPilot AI analyzes codebase architecture, detects full tech stacks, maps folder structures, and creates instant onboarding roadmaps for developers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/analyze" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto">
                <span>Analyze Repository</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <a href="#features" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <span>Learn More</span>
              </Button>
            </a>
          </div>

          {/* Social Proof */}
          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-[#5A6653] dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
              <span>Instant Deep Analysis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
              <span>No API Key Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
              <span>Zero Setup Needed</span>
            </div>
          </div>
        </div>

        {/* Visual Product Mockup Card */}
        <div className="mt-16 relative max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[#EAE2D6] dark:border-[#222C35] bg-[#FFFFFF]/90 dark:bg-[#141A1F]/90 shadow-lg dark:shadow-2xl backdrop-blur-xl overflow-hidden p-4 sm:p-6">
            {/* Mock Header Bar */}
            <div className="flex items-center justify-between border-b border-[#EAE2D6] dark:border-[#222C35] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#8B9A6E]"></div>
                <span className="ml-2 text-xs font-mono text-[#5A6653] dark:text-slate-400">github.com/vercel/next.js</span>
              </div>
              <Badge variant="emerald" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Analysis Ready
              </Badge>
            </div>

            {/* Mock Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#F7F2EB] dark:bg-[#0B0F12] p-4 rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                <div className="flex items-center gap-2 text-[#8B9A6E] text-xs font-bold">
                  <Code2 className="w-4 h-4" /> Tech Stack Detected
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded text-[11px] bg-[#8B9A6E]/15 text-[#4E5B47] dark:text-[#A8B88C] font-mono font-semibold">React 19</span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-[#EAE2D6] dark:bg-[#1E272E] text-[#1E241B] dark:text-slate-300 font-mono">TypeScript</span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-[#8B9A6E]/15 text-[#4E5B47] dark:text-[#A8B88C] font-mono">Tailwind v4</span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-[#EEEEEE] dark:bg-[#1E272E] text-[#5A6653] dark:text-slate-300 font-mono">Rust Core</span>
                </div>
              </div>

              <div className="bg-[#F7F2EB] dark:bg-[#0B0F12] p-4 rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                <div className="flex items-center gap-2 text-[#8B9A6E] text-xs font-bold">
                  <GitFork className="w-4 h-4" /> Codebase Structure
                </div>
                <p className="text-xs text-[#1E241B] dark:text-slate-300 font-mono">
                  packages/next → Server & Client App Router core runtime architecture.
                </p>
              </div>

              <div className="bg-[#F7F2EB] dark:bg-[#0B0F12] p-4 rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                <div className="flex items-center gap-2 text-[#8B9A6E] text-xs font-bold">
                  <Cpu className="w-4 h-4" /> AI Summary & Roadmap
                </div>
                <p className="text-xs text-[#1E241B] dark:text-slate-300">
                  3-step onboarding guide generated. Estimated ramp-up time: 15 mins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
