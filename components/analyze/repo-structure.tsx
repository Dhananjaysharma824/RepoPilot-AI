"use client";

import React from "react";
import { FolderTree, Folder, FileText, ChevronRight, Layers, FileCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { StructureAnalysis, TreeNode } from "@/types";
import { FolderTreeSection } from "./folder-tree";

interface RepoStructureProps {
  structure: StructureAnalysis;
  folderTree: TreeNode[];
}

export function RepoStructureSection({ structure, folderTree }: RepoStructureProps) {
  return (
    <Card className="space-y-6">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-indigo-400" />
            <CardTitle className="text-xl font-bold">Repository Structure & Key Modules</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="indigo">{structure.totalFolders} Folders</Badge>
            <Badge variant="slate">{structure.totalFiles} Files</Badge>
          </div>
        </div>
        <CardDescription>
          Overview of primary top-level folders, essential configuration files, and complete interactive folder hierarchy.
        </CardDescription>
      </CardHeader>

      {/* Grid: Root Folders & Important Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Root Folders Card */}
        <div className="bg-[#F7F2EB] dark:bg-slate-950/80 p-4 rounded-xl border border-[#EAE2D6] dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E241B] dark:text-slate-300">
            <Folder className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>Root Folders</span>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {structure.rootFolders.length > 0 ? (
              structure.rootFolders.map((folder, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/90 border border-[#EAE2D6] dark:border-slate-800/80 flex items-start gap-2.5 hover:border-[#8B9A6E]/50 dark:hover:border-slate-700 transition-colors"
                >
                  <Folder className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1E241B] dark:text-slate-200 font-mono">/{folder.name}</span>
                      {folder.fileCount && (
                        <span className="text-[10px] text-[#5A6653] dark:text-slate-500 font-sans">{folder.fileCount} items</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5A6653] dark:text-slate-400 mt-0.5 leading-snug">{folder.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-[#5A6653] dark:text-slate-500 py-4 text-center">No root folders detected.</div>
            )}
          </div>
        </div>

        {/* Important Files Card */}
        <div className="bg-[#F7F2EB] dark:bg-slate-950/80 p-4 rounded-xl border border-[#EAE2D6] dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E241B] dark:text-slate-300">
            <FileCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Important Configuration Files</span>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {structure.importantFiles.length > 0 ? (
              structure.importantFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/90 border border-[#EAE2D6] dark:border-slate-800/80 flex items-start gap-2.5 hover:border-[#8B9A6E]/50 dark:hover:border-slate-700 transition-colors"
                >
                  <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1E241B] dark:text-slate-200 font-mono">{file.name}</span>
                      {file.size && <span className="text-[10px] text-[#5A6653] dark:text-slate-500 font-sans">{file.size}</span>}
                    </div>
                    <p className="text-[11px] text-[#5A6653] dark:text-slate-400 mt-0.5 leading-snug">{file.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-[#5A6653] dark:text-slate-500 py-4 text-center">No manifest files detected in root.</div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Folder Tree Section */}
      <div className="pt-2 border-t border-[#EAE2D6] dark:border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E241B] dark:text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span>Interactive Folder Tree</span>
          </h4>
        </div>
        <FolderTreeSection tree={folderTree} />
      </div>
    </Card>
  );
}
