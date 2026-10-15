"use client";

import React from "react";
import { Cpu, Layout, Server, Network, Boxes, Database, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArchitectureAnalysisResult } from "@/types";

interface ArchitectureAnalysisProps {
  architecture: ArchitectureAnalysisResult;
}

export function ArchitectureAnalysisSection({ architecture }: ArchitectureAnalysisProps) {
  const cards = [
    {
      title: "Frontend Structure",
      description: architecture.frontendStructure,
      icon: Layout,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      title: "Backend Structure",
      description: architecture.backendStructure,
      icon: Server,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      title: "API Routes & Endpoints",
      description: architecture.apiRoutes,
      icon: Network,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      title: "Components Layer",
      description: architecture.componentsLayer,
      icon: Boxes,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Database & ORM Layer",
      description: architecture.databaseLayer,
      icon: Database,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <Card className="space-y-6">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Cpu className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          <CardTitle className="text-xl font-bold">Architecture Analysis</CardTitle>
          <Badge variant="indigo">Static Detection</Badge>
        </div>
        <CardDescription className="text-[#5A6653] dark:text-slate-300 leading-relaxed text-sm">
          {architecture.overview}
        </CardDescription>
      </CardHeader>

      {/* Grid of 5 Key Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-[#F7F2EB] dark:bg-slate-950/80 rounded-xl border border-[#EAE2D6] dark:border-slate-800 space-y-2 hover:border-[#8B9A6E]/50 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${item.bg} border ${item.border}`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <h4 className="text-sm font-semibold text-[#1E241B] dark:text-slate-200">{item.title}</h4>
              </div>
              <p className="text-xs text-[#5A6653] dark:text-slate-400 leading-relaxed pl-1">{item.description}</p>
            </div>
          );
        })}

        {/* Architecture Highlights Summary Card */}
        <div className="p-4 bg-gradient-to-br from-[#EAE2D6]/80 to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/40 rounded-xl border border-[#8B9A6E]/30 dark:border-indigo-500/30 space-y-2 col-span-1 md:col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h4 className="text-sm font-bold text-[#1E241B] dark:text-white">Architecture Highlights</h4>
          </div>
          <ul className="space-y-1.5 pt-1">
            {architecture.highlights.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#4E5B47] dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8B9A6E] dark:text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
