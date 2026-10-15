"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { GithubIcon } from "../ui/icons";
import { parseGithubUrl } from "@/lib/parseGithubUrl";

interface AnalyzeFormProps {
  onAnalyze: (owner: string, repo: string) => void;
  isLoading: boolean;
  initialUrl?: string;
}

export function AnalyzeForm({ onAnalyze, isLoading, initialUrl = "" }: AnalyzeFormProps) {
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [validationError, setValidationError] = useState<string | null>(null);

  React.useEffect(() => {
    setInputUrl(initialUrl);
  }, [initialUrl]);

  const sampleRepos = [
    { label: "vercel/next.js", url: "https://github.com/vercel/next.js" },
    { label: "facebook/react", url: "https://github.com/facebook/react" },
    { label: "tailwindlabs/tailwindcss", url: "https://github.com/tailwindlabs/tailwindcss" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const parsed = parseGithubUrl(inputUrl);

    if (!parsed) {
      setValidationError("Please enter a valid GitHub URL (e.g. 'https://github.com/owner/repository').");
      return;
    }

    onAnalyze(parsed.owner, parsed.repo);
  };

  const handleSelectSample = (sampleUrl: string) => {
    setInputUrl(sampleUrl);
    setValidationError(null);
    const parsed = parseGithubUrl(sampleUrl);
    if (parsed) {
      onAnalyze(parsed.owner, parsed.repo);
    }
  };

  return (
    <div className="bg-[#FFFFFF]/90 dark:bg-[#141A1F]/90 border border-[#EAE2D6] dark:border-[#222C35] rounded-2xl p-6 shadow-sm dark:shadow-2xl backdrop-blur-xl space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#5A6653] dark:text-slate-300">
          GitHub Repository URL
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <GithubIcon className="w-5 h-5 text-[#5A6653] dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputUrl}
              disabled={isLoading}
              onChange={(e) => {
                setInputUrl(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g. https://github.com/facebook/react"
              className={`w-full bg-[#F7F2EB] dark:bg-[#0B0F12] border ${
                validationError
                  ? "border-rose-500 focus:ring-rose-500/30"
                  : "border-[#EAE2D6] dark:border-[#222C35] focus:border-[#8B9A6E] focus:ring-[#8B9A6E]/30"
              } rounded-xl pl-11 pr-4 py-3 text-sm text-[#1E241B] dark:text-slate-100 placeholder-[#5A6653]/60 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-60`}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            variant="primary"
            className="w-full sm:w-auto shrink-0 min-w-[200px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Repository</span>
              </>
            )}
          </Button>
        </div>

        {validationError && (
          <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 pt-1 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </form>

      {/* Quick fill sample options */}
      <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
        <span className="text-[#5A6653] dark:text-slate-400 font-semibold">Try sample:</span>
        {sampleRepos.map((sample) => (
          <button
            key={sample.label}
            type="button"
            disabled={isLoading}
            onClick={() => handleSelectSample(sample.url)}
            className="px-2.5 py-1 rounded-lg bg-[#EAE2D6] dark:bg-[#1E272E] hover:bg-[#DCD4C7] dark:hover:bg-[#2A3642] disabled:opacity-50 text-[#1E241B] dark:text-slate-300 border border-[#8B9A6E]/20 dark:border-slate-700 transition-colors cursor-pointer font-medium"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}
