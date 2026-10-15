"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star, ExternalLink, ArrowUpRight, Clock, ShieldCheck, FolderGit2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { RecentAnalysisItem } from "@/types";

import { useSearchParams } from "next/navigation";

interface RecentAnalysesProps {
  items: RecentAnalysisItem[];
}

function RecentAnalysesContent({ items }: RecentAnalysesProps) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const [displayItems, setDisplayItems] = useState<RecentAnalysisItem[]>(items);
  const [userAccountName, setUserAccountName] = useState<string>("");

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("user_profile");
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        if (parsed.name) setUserAccountName(parsed.name.toLowerCase());
      }

      const stored = localStorage.getItem("recent_analyses");
      if (stored) {
        const localList: RecentAnalysisItem[] = JSON.parse(stored);
        const map = new Map<string, RecentAnalysisItem>();
        items.forEach((item) => map.set(item.id, item));
        localList.forEach((item) => {
          if (!map.has(item.id)) {
            map.set(item.id, item);
          }
        });
        setDisplayItems(Array.from(map.values()));
      } else {
        setDisplayItems(items);
      }
    } catch {
      setDisplayItems(items);
    }
  }, [items]);

  const filteredItems = displayItems.filter((item) => {
    if (currentTab === "my-repos") {
      if (!userAccountName) return true;
      return item.owner.toLowerCase().includes(userAccountName) || userAccountName.includes(item.owner.toLowerCase());
    }
    return true;
  });

  const getTitle = () => {
    if (currentTab === "saved") return "Saved Reports & Bookmarked Repositories";
    if (currentTab === "my-repos") return "My GitHub Repositories";
    return "Recent Repository Analyses";
  };

  const getDescription = () => {
    if (currentTab === "saved") return "Saved AI analysis reports bookmarked to your profile.";
    if (currentTab === "my-repos") return "Repositories matching your developer account profile.";
    return "Live analysis history synced with your session and Supabase database.";
  };

  return (
    <Card id="recent-analyses">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">{getTitle()}</CardTitle>
            {currentTab !== "overview" && (
              <Badge variant="sage" className="capitalize">{currentTab.replace("-", " ")} Filter</Badge>
            )}
          </div>
          <CardDescription>{getDescription()}</CardDescription>
        </div>
        <Link href="/analyze">
          <Button size="sm" variant="outline">
            <span>Analyze New Repo</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>

      {filteredItems.length === 0 ? (
        <div className="py-12 text-center space-y-4 border border-dashed border-[#EAE2D6] dark:border-slate-800 rounded-2xl bg-[#F7F2EB]/50 dark:bg-[#0B0F12]/40">
          <div className="w-12 h-12 rounded-xl bg-[#EAE2D6] dark:bg-slate-900 border border-[#8B9A6E]/30 text-[#8B9A6E] flex items-center justify-center mx-auto">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#1E241B] dark:text-slate-200">No Repositories Found in This Filter</h4>
            <p className="text-xs text-[#5A6653] dark:text-slate-400 max-w-sm mx-auto">
              {currentTab === "my-repos"
                ? "No analyzed repositories match your developer account profile yet."
                : "Enter any public GitHub URL on the Analyze page to start generating repository reports."}
            </p>
          </div>
          <Link href="/analyze">
            <Button size="sm" variant="primary">
              <span>Start First Analysis</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#EAE2D6] dark:border-[#222C35] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#1E241B] dark:text-slate-300">
              <thead className="bg-[#EAE2D6]/40 dark:bg-[#0B0F12] text-xs uppercase text-[#5A6653] dark:text-slate-400 font-bold border-b border-[#EAE2D6] dark:border-[#222C35] whitespace-nowrap">
                <tr>
                  <th className="py-3.5 px-4">Repository</th>
                  <th className="py-3.5 px-4">Primary Language</th>
                  <th className="py-3.5 px-4">Stars</th>
                  <th className="py-3.5 px-4">Analyzed</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE2D6] dark:divide-slate-800/60 bg-[#FFFFFF]/60 dark:bg-[#141A1F]/60">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#EAE2D6]/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#1E241B] dark:text-white flex items-center gap-1.5 whitespace-nowrap">
                        <span className="text-[#5A6653] dark:text-slate-400 font-normal">{item.owner} /</span>
                        <span>{item.repoName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant="sage">{item.primaryLanguage}</Badge>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{item.stars.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#5A6653] dark:text-slate-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#5A6653] dark:text-slate-500" />
                        <span>{item.analyzedAt}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant="emerald" icon={<ShieldCheck className="w-3 h-3" />}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link href={`/analyze?url=${encodeURIComponent(item.repoUrl)}`}>
                        <Button size="sm" variant="ghost" className="text-xs">
                          <span>View Report</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}

export function RecentAnalyses({ items }: RecentAnalysesProps) {
  return (
    <React.Suspense fallback={<div className="py-10 text-center text-slate-500">Loading analysis history...</div>}>
      <RecentAnalysesContent items={items} />
    </React.Suspense>
  );
}
