"use client";

import React, { useState } from "react";
import { Compass, CheckCircle2, Circle, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { RoadmapStep } from "@/types";

interface LearningRoadmapProps {
  roadmap: RoadmapStep[];
  repoName: string;
}

export function LearningRoadmapSection({ roadmap, repoName }: LearningRoadmapProps) {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = roadmap.length > 0 ? Math.round((completedCount / roadmap.length) * 100) : 0;

  return (
    <Card className="space-y-6 border-emerald-500/20 bg-gradient-to-br from-[#F7F2EB] via-emerald-500/5 to-[#EAE2D6] dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-xl font-bold">Developer Learning Roadmap</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">{progressPercent}% Completed</Badge>
            <Badge variant="slate">Rule-Based Generator</Badge>
          </div>
        </div>
        <CardDescription className="text-[#5A6653] dark:text-slate-300 text-sm leading-relaxed">
          Step-by-step onboarding sequence dynamically generated from detected technologies to master <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{repoName}</span>.
        </CardDescription>

        {/* Progress Bar */}
        <div className="w-full bg-[#EAE2D6] dark:bg-slate-950 rounded-full h-2 overflow-hidden border border-[#8B9A6E]/30 dark:border-slate-800 mt-2">
          <div
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </CardHeader>

      {/* Steps List */}
      <div className="space-y-3">
        {roadmap.map((step) => {
          const isDone = !!completedSteps[step.stepNumber];
          return (
            <div
              key={step.stepNumber}
              onClick={() => toggleStep(step.stepNumber)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                isDone
                  ? "bg-emerald-500/10 dark:bg-emerald-950/20 border-emerald-500/40 text-[#4E5B47] dark:text-slate-300"
                  : "bg-white/80 dark:bg-slate-950/80 border-[#EAE2D6] dark:border-slate-800 hover:border-[#8B9A6E]/50 dark:hover:border-slate-700 text-[#1E241B] dark:text-slate-100"
              }`}
            >
              {/* Step Number Checkbox */}
              <div className="flex items-center justify-center shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#EAE2D6] dark:bg-slate-900 border border-[#8B9A6E]/40 dark:border-slate-700 text-[#4E5B47] dark:text-slate-400 text-xs font-bold flex items-center justify-center">
                    {step.stepNumber}
                  </div>
                )}
              </div>

              {/* Step Information */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      Step {step.stepNumber}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#5A6653] dark:text-slate-600" />
                    <h4 className={`text-sm font-bold ${isDone ? "line-through text-[#5A6653] dark:text-slate-400" : "text-[#1E241B] dark:text-white"}`}>
                      {step.title}
                    </h4>
                  </div>
                  {step.category && <Badge variant="slate">{step.category}</Badge>}
                </div>
                <p className="text-xs text-[#5A6653] dark:text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
