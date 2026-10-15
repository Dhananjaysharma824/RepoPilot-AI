import Image from "next/image";
import { Star, GitFork, AlertCircle, Scale, ExternalLink, GitBranch, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { GithubRepository } from "@/lib/github";
import { GithubIcon } from "../ui/icons";

interface RepoOverviewProps {
  repo: GithubRepository;
}

export function RepoOverview({ repo }: RepoOverviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          {/* Owner Avatar */}
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#EAE2D6] dark:border-[#222C35] shrink-0 bg-[#EAE2D6] dark:bg-[#141A1F]">
            {repo.owner_avatar ? (
              <img
                src={repo.owner_avatar}
                alt={repo.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#5A6653] dark:text-slate-500">
                <GithubIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-xl font-bold text-[#1E241B] dark:text-white">
                {repo.full_name}
              </CardTitle>
              {repo.language && (
                <Badge variant="sage">{repo.language}</Badge>
              )}
              {repo.default_branch && (
                <Badge variant="slate" icon={<GitBranch className="w-3 h-3" />}>
                  {repo.default_branch}
                </Badge>
              )}
            </div>

            <CardDescription className="text-[#5A6653] dark:text-slate-300 text-sm leading-relaxed max-w-2xl font-medium">
              {repo.description || "No description provided for this repository."}
            </CardDescription>
          </div>
        </div>

        {/* GitHub External Button */}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EAE2D6] dark:bg-[#1E272E] hover:bg-[#DCD4C7] dark:hover:bg-[#2A3642] text-[#1E241B] dark:text-slate-200 border border-[#8B9A6E]/30 dark:border-slate-700 text-xs font-semibold transition-colors shrink-0"
        >
          <GithubIcon className="w-4 h-4" />
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </CardHeader>

      {/* Topics / Tags Badges */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap px-6 pb-2 text-xs">
          <span className="text-[#5A6653] dark:text-slate-500 font-semibold flex items-center gap-1">
            <Tag className="w-3 h-3" /> Topics:
          </span>
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 rounded-lg bg-[#EAE2D6] dark:bg-slate-800 text-[#1E241B] dark:text-slate-300 border border-[#8B9A6E]/20 dark:border-slate-700/60 font-mono text-[11px]"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#EAE2D6] dark:border-[#222C35]">
        <div className="bg-[#F7F2EB] dark:bg-[#0B0F12] p-3.5 rounded-xl border border-[#EAE2D6] dark:border-[#222C35]">
          <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 mb-1 font-semibold">
            <Star className="w-4 h-4 fill-amber-500" />
            <span>Stars</span>
          </div>
          <p className="text-xl font-extrabold text-[#1E241B] dark:text-white">{repo.stars.toLocaleString()}</p>
        </div>

        <div className="bg-[#F7F2EB] dark:bg-[#0B0F12] p-3.5 rounded-xl border border-[#EAE2D6] dark:border-[#222C35]">
          <div className="flex items-center gap-1.5 text-xs text-[#8B9A6E] mb-1 font-semibold">
            <GitFork className="w-4 h-4" />
            <span>Forks</span>
          </div>
          <p className="text-xl font-extrabold text-[#1E241B] dark:text-white">{repo.forks.toLocaleString()}</p>
        </div>

        <div className="bg-[#F7F2EB] dark:bg-[#0B0F12] p-3.5 rounded-xl border border-[#EAE2D6] dark:border-[#222C35]">
          <div className="flex items-center gap-1.5 text-xs text-[#8B9A6E] mb-1 font-semibold">
            <AlertCircle className="w-4 h-4" />
            <span>Open Issues</span>
          </div>
          <p className="text-xl font-extrabold text-[#1E241B] dark:text-white">{repo.open_issues.toLocaleString()}</p>
        </div>

        <div className="bg-[#F7F2EB] dark:bg-[#0B0F12] p-3.5 rounded-xl border border-[#EAE2D6] dark:border-[#222C35]">
          <div className="flex items-center gap-1.5 text-xs text-[#8B9A6E] mb-1 font-semibold">
            <Scale className="w-4 h-4" />
            <span>License</span>
          </div>
          <p className="text-lg font-bold text-[#1E241B] dark:text-white truncate">{repo.license || "None"}</p>
        </div>
      </div>
    </Card>
  );
}
