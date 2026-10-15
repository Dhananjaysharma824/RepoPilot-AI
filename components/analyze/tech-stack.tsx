"use client";

import React, { useState } from "react";
import { Layers, Code2, Database, Wrench, Shield, Layout, Server, Palette, Terminal, Cpu } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { TechStackItem, CategorizedTechStack } from "@/types";

interface TechStackProps {
  stack: TechStackItem[];
  categorizedStack?: CategorizedTechStack;
}

export function TechStackSection({ stack, categorizedStack }: TechStackProps) {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "database" | "styling" | "tools">("all");

  const frontendItems = categorizedStack?.frontend || stack.filter((t) => t.category === "Framework" || t.category === "Styling");
  const backendItems = categorizedStack?.backend || stack.filter((t) => t.category === "Framework" || t.category === "Database");
  const databaseItems = categorizedStack?.database || stack.filter((t) => t.category === "Database");
  const stylingItems = categorizedStack?.styling || stack.filter((t) => t.category === "Styling");
  const toolsItems = categorizedStack?.toolsAndPackageManagers || stack.filter((t) => t.category === "Package Manager" || t.category === "Build Tool" || t.category === "Tool");

  const categories = [
    { key: "all", label: "All Tech", icon: Layers, count: stack.length },
    { key: "frontend", label: "Frontend", icon: Layout, count: frontendItems.length },
    { key: "backend", label: "Backend", icon: Server, count: backendItems.length },
    { key: "database", label: "Database", icon: Database, count: databaseItems.length },
    { key: "styling", label: "Styling", icon: Palette, count: stylingItems.length },
    { key: "tools", label: "Tools & Build", icon: Wrench, count: toolsItems.length },
  ];

  const getBadgeVariant = (category: string) => {
    switch (category) {
      case "Language":
        return "sage";
      case "Framework":
        return "sage";
      case "Styling":
        return "cyan";
      case "Database":
        return "emerald";
      case "Package Manager":
        return "amber";
      case "Build Tool":
        return "amber";
      case "Testing":
        return "slate";
      default:
        return "sage";
    }
  };

  const getFilteredItems = (): TechStackItem[] => {
    switch (activeTab) {
      case "frontend":
        return frontendItems;
      case "backend":
        return backendItems;
      case "database":
        return databaseItems;
      case "styling":
        return stylingItems;
      case "tools":
        return toolsItems;
      default:
        return stack;
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#8B9A6E]" />
            <CardTitle className="text-xl font-bold">Tech Stack & Dependencies</CardTitle>
          </div>
          <Badge variant="sage">{stack.length} Detected</Badge>
        </div>
        <CardDescription>
          Automatically detected frameworks, libraries, database drivers, styling engines, package managers, and build tools across root and subfolder manifests.
        </CardDescription>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[#EAE2D6] dark:border-slate-800/80">
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#8B9A6E] text-white dark:text-[#0B0F12] shadow-sm"
                    : "bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-slate-200 border border-[#EAE2D6] dark:border-[#222C35]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? "bg-white/30 dark:bg-black/30 text-white dark:text-[#0B0F12]" : "bg-[#EAE2D6] dark:bg-slate-800 text-[#1E241B] dark:text-slate-400"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </CardHeader>

      {/* Grid of detected items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-[#F7F2EB] dark:bg-[#0B0F12] rounded-xl border border-[#EAE2D6] dark:border-[#222C35] flex items-center justify-between hover:border-[#8B9A6E]/50 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#EAE2D6] dark:bg-slate-900 border border-[#8B9A6E]/30 flex items-center justify-center shrink-0">
                  {item.category === "Database" ? (
                    <Database className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  ) : item.category === "Styling" ? (
                    <Palette className="w-4 h-4 text-[#8B9A6E]" />
                  ) : item.category === "Package Manager" || item.category === "Build Tool" ? (
                    <Terminal className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  ) : item.category === "Language" ? (
                    <Cpu className="w-4 h-4 text-[#8B9A6E]" />
                  ) : (
                    <Code2 className="w-4 h-4 text-[#8B9A6E]" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#1E241B] dark:text-slate-200 truncate">{item.name}</div>
                  {item.version && (
                    <div className="text-[11px] font-mono text-[#5A6653] dark:text-slate-500 truncate">{item.version}</div>
                  )}
                </div>
              </div>
              <Badge variant={getBadgeVariant(item.category)} className="shrink-0">
                {item.category}
              </Badge>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-[#5A6653] dark:text-slate-500">
            No technologies detected in this specific category.
          </div>
        )}
      </div>
    </Card>
  );
}
