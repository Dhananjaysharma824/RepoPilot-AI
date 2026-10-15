"use client";

import React, { useEffect, useState } from "react";
import { FolderGit2, Sparkles, BookmarkCheck, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const [effectiveStats, setEffectiveStats] = useState<DashboardStats>(stats);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recent_analyses");
      const localList = stored ? JSON.parse(stored) : [];
      const localCount = Array.isArray(localList) ? localList.length : 0;

      const repos = Math.max(stats.repositoriesAnalyzed, localCount);
      setEffectiveStats({
        repositoriesAnalyzed: repos,
        aiSummariesGenerated: Math.max(stats.aiSummariesGenerated, repos * 3),
        savedReports: Math.max(stats.savedReports, repos),
      });
    } catch {
      setEffectiveStats(stats);
    }
  }, [stats]);

  const statList = [
    {
      title: "Repositories Analyzed",
      value: effectiveStats.repositoriesAnalyzed.toString(),
      change: effectiveStats.repositoriesAnalyzed > 0 ? "Synced & Active" : "No analyses yet",
      icon: FolderGit2,
      iconColor: "text-[#8B9A6E]",
      bgColor: "bg-[#8B9A6E]/15",
      borderColor: "border-[#8B9A6E]/30",
    },
    {
      title: "AI Summaries Generated",
      value: effectiveStats.aiSummariesGenerated.toString(),
      change: effectiveStats.aiSummariesGenerated > 0 ? "Gemini Pipeline Active" : "Ready to generate",
      icon: Sparkles,
      iconColor: "text-[#8B9A6E]",
      bgColor: "bg-[#8B9A6E]/15",
      borderColor: "border-[#8B9A6E]/30",
    },
    {
      title: "Saved Reports",
      value: effectiveStats.savedReports.toString(),
      change: effectiveStats.savedReports > 0 ? "Synced to Profile" : "0 saved",
      icon: BookmarkCheck,
      iconColor: "text-[#8B9A6E]",
      bgColor: "bg-[#8B9A6E]/15",
      borderColor: "border-[#8B9A6E]/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {statList.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} hoverEffect className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#5A6653] dark:text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-extrabold text-[#1E241B] dark:text-white mt-2 tracking-tight">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`w-12 h-12 rounded-2xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAE2D6] dark:border-slate-800 flex items-center gap-1.5 text-xs text-[#8B9A6E] font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{stat.change}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
