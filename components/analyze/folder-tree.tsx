"use client";

import React, { useState } from "react";
import { FolderTree, Folder, FolderOpen, FileCode, ChevronRight, ChevronDown, Search, Expand, Minimize2 } from "lucide-react";
import { TreeNode } from "@/types";

interface FolderTreeProps {
  tree: TreeNode[];
}

function getFileIconColor(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "tsx":
      return "text-indigo-400";
    case "js":
    case "jsx":
      return "text-amber-400";
    case "json":
      return "text-cyan-400";
    case "md":
      return "text-slate-400";
    case "py":
      return "text-emerald-400";
    case "rs":
      return "text-orange-400";
    case "java":
      return "text-red-400";
    case "css":
    case "scss":
      return "text-violet-400";
    default:
      return "text-slate-400";
  }
}

function TreeItem({ node, defaultOpen, searchQuery }: { node: TreeNode; defaultOpen: boolean; searchQuery: string }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isFolder = node.type === "folder";

  // Check if current item or any child matches search query
  const matchesSearch = (item: TreeNode, query: string): boolean => {
    if (!query) return true;
    const q = query.toLowerCase();
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.children) {
      return item.children.some((c) => matchesSearch(c, q));
    }
    return false;
  };

  if (searchQuery && !matchesSearch(node, searchQuery)) {
    return null;
  }

  const fileColorClass = getFileIconColor(node.name);

  return (
    <div className="ml-2.5 my-0.5 select-none">
      <div
        onClick={() => isFolder && setIsOpen(!isOpen)}
        className={`flex items-center gap-2 py-1 px-2 rounded-md text-xs font-mono transition-colors ${
          isFolder
            ? "text-[#1E241B] dark:text-slate-200 hover:bg-[#EAE2D6]/70 dark:hover:bg-slate-800/80 cursor-pointer"
            : "text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-slate-100 hover:bg-[#EAE2D6]/40 dark:hover:bg-slate-900/60"
        }`}
      >
        {isFolder ? (
          <>
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-[#5A6653] dark:text-slate-500 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-[#5A6653] dark:text-slate-500 shrink-0" />
            )}
            {isOpen ? (
              <FolderOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
            )}
            <span className="font-semibold text-[#1E241B] dark:text-slate-200">{node.name}</span>
            {node.children && (
              <span className="text-[10px] text-[#5A6653] dark:text-slate-600 font-sans ml-1">({node.children.length})</span>
            )}
          </>
        ) : (
          <>
            <span className="w-3.5 shrink-0"></span>
            <FileCode className={`w-4 h-4 shrink-0 ${fileColorClass}`} />
            <span className="truncate">{node.name}</span>
            {node.size && <span className="ml-auto text-[10px] text-[#5A6653] dark:text-slate-600 font-sans shrink-0">{node.size}</span>}
          </>
        )}
      </div>

      {isFolder && (isOpen || !!searchQuery) && node.children && (
        <div className="border-l border-[#EAE2D6] dark:border-slate-800/80 ml-2.5 pl-0.5">
          {node.children.map((childNode, i) => (
            <TreeItem key={i} node={childNode} defaultOpen={defaultOpen} searchQuery={searchQuery} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FolderTreeSection({ tree }: FolderTreeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandKey, setExpandKey] = useState(0);
  const [isAllExpanded, setIsAllExpanded] = useState(true);

  const toggleExpandAll = () => {
    setIsAllExpanded(!isAllExpanded);
    setExpandKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-3">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#5A6653] dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files in tree..."
            className="w-full bg-[#F7F2EB] dark:bg-slate-950/90 border border-[#EAE2D6] dark:border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#1E241B] dark:text-slate-200 placeholder-[#5A6653]/60 dark:placeholder-slate-500 focus:outline-none focus:border-[#8B9A6E] dark:focus:border-indigo-500 transition-colors"
          />
        </div>

        <button
          onClick={toggleExpandAll}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EAE2D6] dark:bg-slate-900 hover:bg-[#DCD4C7] dark:hover:bg-slate-800 border border-[#8B9A6E]/30 dark:border-slate-800 text-xs font-semibold text-[#1E241B] dark:text-slate-300 transition-colors shrink-0 cursor-pointer"
        >
          {isAllExpanded ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Collapse All</span>
            </>
          ) : (
            <>
              <Expand className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Expand All</span>
            </>
          )}
        </button>
      </div>

      {/* Tree Content Container */}
      <div
        key={expandKey}
        className="bg-[#F7F2EB]/90 dark:bg-slate-950/90 p-4 rounded-xl border border-[#EAE2D6] dark:border-slate-800/90 max-h-[420px] overflow-y-auto font-mono text-xs shadow-inner"
      >
        {tree.length > 0 ? (
          tree.map((node, idx) => (
            <TreeItem key={idx} node={node} defaultOpen={isAllExpanded} searchQuery={searchQuery} />
          ))
        ) : (
          <div className="py-8 text-center text-[#5A6653] dark:text-slate-500 text-xs">No files found matching criteria.</div>
        )}
      </div>
    </div>
  );
}
