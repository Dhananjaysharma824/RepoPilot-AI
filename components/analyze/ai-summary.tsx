"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Brain,
  Clock,
  ShieldCheck,
  Compass,
  Folder,
  Cpu,
  Lightbulb,
  CheckCircle2,
  Code2,
  ArrowRight,
  BookOpen,
  Layers,
  Zap,
  AlertTriangle,
  TrendingUp,
  Target,
  GraduationCap,
  Award,
  FileText,
  GitPullRequest,
  Flame,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { GeminiAnalysisResult, SeniorMentorAnalysis } from "@/types";

interface AISummaryProps {
  summary?: GeminiAnalysisResult;
}

export function AISummarySection({ summary }: AISummaryProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "onboarding" | "roadmap" | "contributing">("overview");

  if (!summary) return null;

  const { insights, mentorAnalysis } = summary;

  const getComplexityVariant = (level: string) => {
    switch (level) {
      case "Beginner":
        return "emerald";
      case "Intermediate":
        return "amber";
      case "Advanced":
        return "sage";
      default:
        return "sage";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner - Senior Mentor AI Assistant Header */}
      <div className="bg-[#EAE2D6] dark:bg-[#141A1F] p-6 rounded-2xl border border-[#8B9A6E]/40 shadow-sm dark:shadow-2xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#8B9A6E]/20 border border-[#8B9A6E]/30 text-[#8B9A6E] shadow-inner">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-[#1E241B] dark:text-white tracking-tight">
                  Senior Architect & Mentor Assistant
                </h3>
                {summary.isAIContent ? (
                  <Badge variant="sage" icon={<Sparkles className="w-3.5 h-3.5" />}>
                    Gemini 2.5 Flash Engine
                  </Badge>
                ) : (
                  <Badge variant="slate">Heuristic AI Engine</Badge>
                )}
              </div>
              <p className="text-xs text-[#5A6653] dark:text-slate-400 mt-0.5 font-medium">
                Staff Engineer codebase walkthrough, architectural rationale, and onboarding masterclass.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={getComplexityVariant(insights.complexityLevel)} className="py-1 px-3 text-xs font-bold">
              Complexity: {insights.complexityLevel}
            </Badge>

            <Badge variant="cyan" icon={<Clock className="w-3.5 h-3.5" />} className="py-1 px-3 text-xs font-semibold">
              Onboarding: {insights.estimatedLearningTime}
            </Badge>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#8B9A6E]/20 dark:border-slate-800/80 no-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#8B9A6E] text-white dark:text-[#0B0F12] shadow-sm font-bold"
                : "bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" /> 1 & 2. Purpose & Overview
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "architecture"
                ? "bg-[#8B9A6E] text-white dark:text-[#0B0F12] shadow-sm font-bold"
                : "bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" /> 3, 4 & 5. Architecture & Code
          </button>

          <button
            onClick={() => setActiveTab("onboarding")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "onboarding"
                ? "bg-[#8B9A6E] text-white dark:text-[#0B0F12] shadow-sm font-bold"
                : "bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white"
            }`}
          >
            <Compass className="w-4 h-4" /> 6, 7 & 11. Onboarding & Reading Strategy
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "roadmap"
                ? "bg-[#8B9A6E] text-white dark:text-[#0B0F12] shadow-sm font-bold"
                : "bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4" /> 8, 9 & 10. Roadmap & Assessment
          </button>

          <button
            onClick={() => setActiveTab("contributing")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "contributing"
                ? "bg-[#8B9A6E] text-white dark:text-[#0B0F12] shadow-sm font-bold"
                : "bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white"
            }`}
          >
            <GitPullRequest className="w-4 h-4" /> 12 & 13. Contributor Guide & Insights
          </button>
        </div>
      </div>

      {/* TAB 1: PURPOSE & EXECUTIVE OVERVIEW (Sections 1 & 2) */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 1: Project Purpose */}
          {mentorAnalysis?.purpose && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-5 h-5 text-[#8B9A6E]" />
                  <CardTitle className="text-xl font-bold">Section 1 — Project Purpose & Value</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Why this repository exists, what real-world problems it addresses, and who it empowers.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider">What It Is</span>
                    <p className="text-sm text-[#1E241B] dark:text-slate-200 leading-relaxed font-medium">{mentorAnalysis.purpose.whatItIs}</p>
                  </div>

                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Why It Exists</span>
                    <p className="text-sm text-[#1E241B] dark:text-slate-200 leading-relaxed font-medium">{mentorAnalysis.purpose.whyItExists}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Problem Solved</span>
                    <p className="text-sm text-[#1E241B] dark:text-slate-200 leading-relaxed font-medium">{mentorAnalysis.purpose.problemSolved}</p>
                  </div>

                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider">Target Audience</span>
                    <p className="text-sm text-[#1E241B] dark:text-slate-200 leading-relaxed font-medium">{mentorAnalysis.purpose.targetAudience}</p>
                  </div>
                </div>

                {/* Real World Use Cases */}
                {mentorAnalysis.purpose.realWorldUseCases?.length > 0 && (
                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                    <span className="text-xs font-bold text-[#1E241B] dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> Real-World Use Cases
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {mentorAnalysis.purpose.realWorldUseCases.map((useCase, idx) => (
                        <div key={idx} className="p-2.5 bg-[#FFFFFF] dark:bg-[#141A1F] rounded-lg border border-[#EAE2D6] dark:border-slate-800 text-xs text-[#1E241B] dark:text-slate-300 flex items-start gap-2 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Section 2: Executive Summary */}
          {mentorAnalysis?.executiveSummary && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-amber-500" />
                  <CardTitle className="text-xl font-bold">Section 2 — Executive Summary</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  High-level architectural summary and major technical decisions made by the authors.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-4">
                <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                  <span className="text-xs font-bold text-[#5A6653] dark:text-slate-400 uppercase tracking-wider">Main Responsibility</span>
                  <p className="text-sm text-[#1E241B] dark:text-slate-200 font-medium">{mentorAnalysis.executiveSummary.mainResponsibility}</p>
                </div>

                {mentorAnalysis.executiveSummary.majorArchitecturalDecisions?.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#1E241B] dark:text-slate-300 uppercase tracking-wider">Major Architectural Decisions</span>
                    <div className="space-y-2">
                      {mentorAnalysis.executiveSummary.majorArchitecturalDecisions.map((dec, i) => (
                        <div key={i} className="p-3 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] text-xs text-[#1E241B] dark:text-slate-300 flex items-start gap-2.5 font-medium">
                          <Badge variant="sage" className="shrink-0 mt-0.5 text-[10px]">Decision {i + 1}</Badge>
                          <span>{dec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* TAB 2: ARCHITECTURE, RANKED FOLDERS & TECH (Sections 3, 4 & 5) */}
      {activeTab === "architecture" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 3: Architecture Explanation */}
          {mentorAnalysis?.architectureDetails && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="w-5 h-5 text-[#8B9A6E]" />
                  <CardTitle className="text-xl font-bold">Section 3 — Architecture Explanation</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  System pattern breakdown across frontend, backend, data, API, auth, and deployment.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="sage" className="py-1 px-3 text-xs font-semibold">
                    Style: {mentorAnalysis.architectureDetails.overallStyle}
                  </Badge>
                  <Badge variant="sage" className="py-1 px-3 text-xs font-semibold">
                    Layout: {mentorAnalysis.architectureDetails.monolithOrModular}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wide">Frontend Layer</span>
                    <p className="text-xs text-[#1E241B] dark:text-slate-300 leading-relaxed font-medium">{mentorAnalysis.architectureDetails.frontendLayer}</p>
                  </div>

                  <div className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Backend Layer</span>
                    <p className="text-xs text-[#1E241B] dark:text-slate-300 leading-relaxed font-medium">{mentorAnalysis.architectureDetails.backendLayer}</p>
                  </div>

                  <div className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">Data Layer</span>
                    <p className="text-xs text-[#1E241B] dark:text-slate-300 leading-relaxed font-medium">{mentorAnalysis.architectureDetails.dataLayer}</p>
                  </div>

                  <div className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wide">API Layer</span>
                    <p className="text-xs text-[#1E241B] dark:text-slate-300 leading-relaxed font-medium">{mentorAnalysis.architectureDetails.apiLayer}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                  <span className="text-xs font-bold text-[#5A6653] dark:text-slate-400 uppercase tracking-wide">Deployment & Security</span>
                  <p className="text-xs text-[#1E241B] dark:text-slate-300 leading-relaxed font-medium">
                    {mentorAnalysis.architectureDetails.deploymentConsiderations} • Auth: {mentorAnalysis.architectureDetails.authLayer}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Section 4: Important Folders (Ranked) */}
          {mentorAnalysis?.rankedFolders && mentorAnalysis.rankedFolders.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Folder className="w-5 h-5 text-[#8B9A6E]" />
                  <CardTitle className="text-xl font-bold">Section 4 — Ranked Folder Structure</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Key codebase directories ranked by architectural importance and critical learning value.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-3">
                {mentorAnalysis.rankedFolders.map((rf, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2 hover:border-[#8B9A6E]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-[#8B9A6E]/20 text-[#8B9A6E] font-mono font-bold text-xs flex items-center justify-center border border-[#8B9A6E]/30">
                          #{rf.rank || idx + 1}
                        </span>
                        <span className="font-mono font-bold text-sm text-[#8B9A6E]">{rf.folderName}</span>
                      </div>
                      {rf.isCritical && (
                        <Badge variant="amber" icon={<Flame className="w-3 h-3" />}>
                          Critical Module
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-[#1E241B] dark:text-slate-300 font-semibold">{rf.whyExists}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px] text-[#5A6653] dark:text-slate-400">
                      <div className="p-2 bg-[#FFFFFF] dark:bg-[#141A1F] rounded-lg border border-[#EAE2D6] dark:border-slate-800">
                        <span className="font-bold text-[#1E241B] dark:text-slate-300">Code Inside:</span> {rf.codeBelongingThere}
                      </div>
                      <div className="p-2 bg-[#FFFFFF] dark:bg-[#141A1F] rounded-lg border border-[#EAE2D6] dark:border-slate-800">
                        <span className="font-bold text-[#8B9A6E]">What to Learn:</span> {rf.whatToLearnFromIt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Section 5: Technology Explanation */}
          {mentorAnalysis?.explainedTechnologies && mentorAnalysis.explainedTechnologies.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Code2 className="w-5 h-5 text-[#8B9A6E]" />
                  <CardTitle className="text-xl font-bold">Section 5 — Technology Stack Explained</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Detailed technical breakdown of why each framework/library was chosen and how it interacts with the system.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentorAnalysis.explainedTechnologies.map((tech, i) => (
                  <div key={i} className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#1E241B] dark:text-white">{tech.name}</span>
                      <Badge variant="sage">{tech.category}</Badge>
                    </div>
                    <p className="text-xs text-[#1E241B] dark:text-slate-300 font-medium"><strong className="text-[#5A6653] dark:text-slate-400">Why Used:</strong> {tech.whyUsed}</p>
                    <p className="text-xs text-[#5A6653] dark:text-slate-400"><strong className="text-[#1E241B] dark:text-slate-300 font-semibold">System Role:</strong> {tech.rolePlayed}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* TAB 3: ONBOARDING & READING STRATEGY (Sections 6, 7 & 11) */}
      {activeTab === "onboarding" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 6: New Developer Onboarding Guide */}
          {mentorAnalysis?.onboardingGuide && (
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <CardTitle className="text-xl font-bold">Section 6 — New Developer Onboarding Guide</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  5 practical steps for a new engineer to gain fast confidence and start shipping code.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-3">
                {[
                  { title: "Step 1: What to Read First", detail: mentorAnalysis.onboardingGuide.step1WhatToReadFirst },
                  { title: "Step 2: Folders to Explore", detail: mentorAnalysis.onboardingGuide.step2FoldersToExplore },
                  { title: "Step 3: Understanding App Flow", detail: mentorAnalysis.onboardingGuide.step3AppFlow },
                  { title: "Step 4: Understanding Data Flow", detail: mentorAnalysis.onboardingGuide.step4DataFlow },
                  { title: "Step 5: How to Start Contributing", detail: mentorAnalysis.onboardingGuide.step5HowToStartContributing },
                ].map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/30">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#1E241B] dark:text-white uppercase tracking-wider">{step.title}</h5>
                      <p className="text-xs text-[#1E241B] dark:text-slate-300 mt-1 leading-relaxed font-medium">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Section 7: Code Reading Strategy */}
          {mentorAnalysis?.codeReadingStrategy && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-5 h-5 text-[#8B9A6E]" />
                  <CardTitle className="text-xl font-bold">Section 7 — Code Reading Strategy</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Recommended order of reading files and directories to build a mental map without feeling overwhelmed.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider">Initial Files to Inspect</span>
                    {mentorAnalysis.codeReadingStrategy.initialFiles?.map((f, i) => (
                      <div key={i} className="p-2.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] text-xs">
                        <span className="font-mono font-bold text-[#1E241B] dark:text-white">{f.path}</span>
                        <p className="text-[#5A6653] dark:text-slate-400 text-[11px] mt-0.5 font-medium">{f.reason}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider">Subsequent Folders to Explore</span>
                    {mentorAnalysis.codeReadingStrategy.subsequentFolders?.map((f, i) => (
                      <div key={i} className="p-2.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] text-xs">
                        <span className="font-mono font-bold text-[#1E241B] dark:text-white">{f.path}</span>
                        <p className="text-[#5A6653] dark:text-slate-400 text-[11px] mt-0.5 font-medium">{f.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Section 11: Key Concepts */}
          {mentorAnalysis?.keyConcepts && mentorAnalysis.keyConcepts.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <CardTitle className="text-xl font-bold">Section 11 — Key Repository Concepts</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Crucial technical patterns and domain concepts used in this codebase.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentorAnalysis.keyConcepts.map((concept, idx) => (
                  <div key={idx} className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#1E241B] dark:text-white">{concept.conceptName}</span>
                      <Badge variant="slate" className="font-mono text-[10px]">{concept.repoLocation}</Badge>
                    </div>
                    <p className="text-xs text-[#1E241B] dark:text-slate-300 font-medium">{concept.explanation}</p>
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold"><strong className="text-[#5A6653] dark:text-slate-400">Why it matters:</strong> {concept.whyItMatters}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* TAB 4: ROADMAP & ASSESSMENT (Sections 8, 9 & 10) */}
      {activeTab === "roadmap" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 8: Phased Learning Roadmap */}
          {mentorAnalysis?.phasedRoadmap && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-5 h-5 text-[#8B9A6E]" />
                  <CardTitle className="text-xl font-bold">Section 8 — Phased Learning Roadmap</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Week-by-week structured curriculum to master this repository.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-3">
                {mentorAnalysis.phasedRoadmap.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] flex items-start gap-4">
                    <Badge variant="sage" className="shrink-0 font-bold text-xs py-1 px-3">
                      {item.phase}
                    </Badge>
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-[#1E241B] dark:text-white">{item.focusArea}</h5>
                      <p className="text-xs text-[#1E241B] dark:text-slate-300 font-medium">{item.actionableGoal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Section 9: Difficulty Assessment */}
          {mentorAnalysis?.difficultyAssessment && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <CardTitle className="text-xl font-bold">Section 9 — Codebase Difficulty Assessment</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Evaluates learning curve complexity based on code size, depth, and technical breadth.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-4">
                <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-xs text-[#5A6653] dark:text-slate-400 uppercase tracking-wider block font-bold">Assessed Level</span>
                    <span className="text-lg font-bold text-[#1E241B] dark:text-white">{mentorAnalysis.difficultyAssessment.level}</span>
                  </div>
                  <p className="text-xs text-[#1E241B] dark:text-slate-300 max-w-xl font-medium">{mentorAnalysis.difficultyAssessment.reasoning}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-[10px] text-[#5A6653] dark:text-slate-400 uppercase font-bold">Codebase Size</span>
                    <p className="text-xs text-[#1E241B] dark:text-white font-semibold">{mentorAnalysis.difficultyAssessment.factors.codebaseSize}</p>
                  </div>
                  <div className="p-3 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-[10px] text-[#5A6653] dark:text-slate-400 uppercase font-bold">Architecture</span>
                    <p className="text-xs text-[#1E241B] dark:text-white font-semibold">{mentorAnalysis.difficultyAssessment.factors.architectureComplexity}</p>
                  </div>
                  <div className="p-3 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-[10px] text-[#5A6653] dark:text-slate-400 uppercase font-bold">Tech Breadth</span>
                    <p className="text-xs text-[#1E241B] dark:text-white font-semibold">{mentorAnalysis.difficultyAssessment.factors.techStackBreadth}</p>
                  </div>
                  <div className="p-3 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-[10px] text-[#5A6653] dark:text-slate-400 uppercase font-bold">Experience Needed</span>
                    <p className="text-xs text-[#1E241B] dark:text-white font-semibold">{mentorAnalysis.difficultyAssessment.factors.experienceRequired}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Section 10: Learning Time Estimate */}
          {mentorAnalysis?.timeEstimate && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-[#8B9A6E]" />
                  <CardTitle className="text-xl font-bold">Section 10 — Estimated Learning Benchmarks</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Realistic onboarding timelines to achieve basic, contributor, and mastery status.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] text-center space-y-1">
                    <span className="text-xs text-[#5A6653] dark:text-slate-400 font-bold">Basic Understanding</span>
                    <span className="text-lg font-extrabold text-[#8B9A6E] block">{mentorAnalysis.timeEstimate.basicUnderstanding}</span>
                  </div>
                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] text-center space-y-1">
                    <span className="text-xs text-[#5A6653] dark:text-slate-400 font-bold">Contribution Ready</span>
                    <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400 block">{mentorAnalysis.timeEstimate.contributionReady}</span>
                  </div>
                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] text-center space-y-1">
                    <span className="text-xs text-[#5A6653] dark:text-slate-400 font-bold">Advanced Mastery</span>
                    <span className="text-lg font-extrabold text-[#8B9A6E] block">{mentorAnalysis.timeEstimate.advancedMastery}</span>
                  </div>
                </div>
                <p className="text-xs text-[#5A6653] dark:text-slate-400 text-center font-medium">{mentorAnalysis.timeEstimate.reasoning}</p>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* TAB 5: CONTRIBUTOR GUIDE & EXPERT INSIGHTS (Sections 12 & 13) */}
      {activeTab === "contributing" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 12: Contributor Guidance */}
          {mentorAnalysis?.contributorGuidance && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <GitPullRequest className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <CardTitle className="text-xl font-bold">Section 12 — Contributor Guidance</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Where to start, easy modules to hack on, and high-risk core areas to avoid initially.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Good First Tasks</span>
                    <ul className="space-y-1 text-xs text-[#1E241B] dark:text-slate-300 font-medium">
                      {mentorAnalysis.contributorGuidance.goodFirstTasks?.map((task, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Areas to Avoid Initially</span>
                    <ul className="space-y-1 text-xs text-[#1E241B] dark:text-slate-300 font-medium">
                      {mentorAnalysis.contributorGuidance.areasToAvoidInitially?.map((area, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                  <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider">Recommended Contribution Path</span>
                  <p className="text-xs text-[#1E241B] dark:text-slate-200 font-medium">{mentorAnalysis.contributorGuidance.recommendedContributionPath}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Section 13: Expert Insights */}
          {mentorAnalysis?.expertInsights && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-[#8B9A6E]" />
                  <CardTitle className="text-xl font-bold">Section 13 — AI Expert Architectural Insights</CardTitle>
                </div>
                <CardDescription className="text-[#5A6653] dark:text-slate-400 text-xs">
                  Senior Staff Architect evaluation of codebase strengths, challenges, scalability, and maintainability.
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Architectural Strengths</span>
                    <ul className="space-y-1 text-xs text-[#1E241B] dark:text-slate-300 font-medium">
                      {mentorAnalysis.expertInsights.strengths?.map((s, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-2">
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Potential Challenges</span>
                    <ul className="space-y-1 text-xs text-[#1E241B] dark:text-slate-300 font-medium">
                      {mentorAnalysis.expertInsights.potentialChallenges?.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wide">Scalability Analysis</span>
                    <p className="text-xs text-[#1E241B] dark:text-slate-300 font-medium">{mentorAnalysis.expertInsights.scalabilityConsiderations}</p>
                  </div>
                  <div className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                    <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wide">Maintainability Observation</span>
                    <p className="text-xs text-[#1E241B] dark:text-slate-300 font-medium">{mentorAnalysis.expertInsights.maintainabilityObservations}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] space-y-1">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">Unique Characteristics</span>
                  <p className="text-xs text-[#1E241B] dark:text-slate-300 font-medium">{mentorAnalysis.expertInsights.uniqueCharacteristics}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
