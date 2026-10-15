"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnalyzeForm } from "@/components/analyze/analyze-form";
import { RepoOverview } from "@/components/analyze/repo-overview";
import { AISummarySection } from "@/components/analyze/ai-summary";
import { TechStackSection } from "@/components/analyze/tech-stack";
import { ArchitectureAnalysisSection } from "@/components/analyze/architecture-analysis";
import { RepoStructureSection } from "@/components/analyze/repo-structure";
import { LearningRoadmapSection } from "@/components/analyze/learning-roadmap";
import { analyzeRepositoryAction } from "@/app/actions/repository";
import { RepositoryAnalysis, GithubRepository } from "@/types";
import { Sparkles, ArrowLeft, AlertCircle, Search } from "lucide-react";
import Link from "next/link";

function saveRecentAnalysisToStorage(analysis: RepositoryAnalysis) {
  try {
    const stored = localStorage.getItem("recent_analyses");
    const list: any[] = stored ? JSON.parse(stored) : [];
    const filtered = list.filter((item) => item.id !== analysis.id);
    filtered.unshift({
      id: analysis.id,
      repoName: analysis.name,
      owner: analysis.owner,
      repoUrl: analysis.url,
      analyzedAt: new Date().toLocaleDateString(),
      stars: analysis.stars,
      primaryLanguage: analysis.primaryLanguage || "Multi-language",
      status: "Completed",
    });
    localStorage.setItem("recent_analyses", JSON.stringify(filtered.slice(0, 10)));
  } catch {}
}

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const initialUrlFromParam = searchParams.get("url") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(initialUrlFromParam);
  const [analysisData, setAnalysisData] = useState<RepositoryAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const executeAnalysis = async (url: string) => {
    if (!url.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await analyzeRepositoryAction(url);
      if (res.success && res.data) {
        setAnalysisData(res.data);
        saveRecentAnalysisToStorage(res.data);
      } else {
        setAnalysisData(null);
        setErrorMessage(res.error || "Failed to analyze GitHub repository.");
      }
    } catch (err: any) {
      setAnalysisData(null);
      setErrorMessage(err.message || "An unexpected error occurred during repository analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormAnalyze = (owner: string, repo: string) => {
    const fullUrl = `https://github.com/${owner}/${repo}`;
    setCurrentUrl(fullUrl);
    executeAnalysis(fullUrl);
  };

  useEffect(() => {
    const urlFromParam = searchParams.get("url");
    if (urlFromParam) {
      setCurrentUrl(urlFromParam);
      executeAnalysis(urlFromParam);
    }
  }, [searchParams]);

  const repoMeta: GithubRepository | null = analysisData
    ? {
        name: analysisData.name,
        owner: analysisData.owner,
        full_name: `${analysisData.owner}/${analysisData.name}`,
        description: analysisData.description,
        stars: analysisData.stars,
        forks: analysisData.forks,
        language: analysisData.primaryLanguage,
        topics: [],
        open_issues: analysisData.openIssues,
        license: analysisData.license,
        default_branch: "main",
        owner_avatar: `https://github.com/${analysisData.owner}.png`,
        html_url: analysisData.url,
      }
    : null;

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="text-xs text-[#8B9A6E] font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>GitHub REST API Engine</span>
        </div>
      </div>

      {/* Input Form */}
      <AnalyzeForm
        onAnalyze={handleFormAnalyze}
        isLoading={isLoading}
        initialUrl={currentUrl}
      />

      {/* Error State Banner */}
      {errorMessage && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-sm text-rose-600 dark:text-rose-400 font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="py-20 text-center space-y-4 bg-[#FFFFFF]/90 dark:bg-[#141A1F]/90 rounded-2xl border border-[#EAE2D6] dark:border-[#222C35] backdrop-blur-md shadow-sm">
          <div className="w-12 h-12 rounded-full border-2 border-[#8B9A6E] border-t-transparent animate-spin mx-auto"></div>
          <h3 className="text-lg font-bold text-[#1E241B] dark:text-white">Running Advanced Repository Analysis...</h3>
          <p className="text-sm text-[#5A6653] dark:text-slate-400 max-w-md mx-auto">
            Parsing repository tree structure, analyzing manifest files (`package.json`, `requirements.txt`, etc.), generating Gemini AI insights, and mapping architecture.
          </p>
        </div>
      ) : analysisData && repoMeta ? (
        /* Success State: Comprehensive Real Repository Analysis Sections */
        <div className="space-y-8">
          {/* 1. Repository Header & Overview */}
          <RepoOverview repo={repoMeta} />

          {/* 2. Google Gemini AI Summary & Insights */}
          {analysisData.geminiSummary && (
            <AISummarySection summary={analysisData.geminiSummary} />
          )}

          {/* 3. Tech Stack Detection Section */}
          <TechStackSection
            stack={analysisData.techStack}
            categorizedStack={analysisData.categorizedTechStack}
          />

          {/* 4. Architecture Analysis Section */}
          <ArchitectureAnalysisSection architecture={analysisData.architecture} />

          {/* 5. Repository Structure & Folder Tree Component */}
          <RepoStructureSection
            structure={analysisData.structure}
            folderTree={analysisData.folderStructure}
          />

          {/* 6. Learning Roadmap Section */}
          <LearningRoadmapSection
            roadmap={analysisData.roadmap}
            repoName={analysisData.name}
          />
        </div>
      ) : !errorMessage ? (
        <div className="py-16 text-center space-y-4 bg-[#FFFFFF]/80 dark:bg-[#141A1F]/80 rounded-2xl border border-[#EAE2D6] dark:border-[#222C35] backdrop-blur-md p-8 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#8B9A6E]/15 border border-[#8B9A6E]/30 flex items-center justify-center mx-auto text-[#8B9A6E]">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#1E241B] dark:text-white">Enter a Repository URL to Begin</h3>
          <p className="text-sm text-[#5A6653] dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Paste any public GitHub repository link above (or click one of the sample buttons) to analyze its architecture, tech stack, and onboarding roadmap.
          </p>
        </div>
      ) : null}
    </main>
  );
}

export default function AnalyzePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#1E241B] dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <Suspense fallback={<div className="p-10 text-center text-[#5A6653] dark:text-slate-400">Loading analysis engine...</div>}>
        <AnalyzeContent />
      </Suspense>
      <Footer />
    </div>
  );
}
