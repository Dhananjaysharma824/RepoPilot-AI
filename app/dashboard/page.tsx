import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentAnalyses } from "@/components/dashboard/recent-analyses";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { getUserRepositoriesAction, getDashboardStatsAction } from "@/app/actions/repository";

export default async function DashboardPage() {
  const [recentItems, stats] = await Promise.all([
    getUserRepositoriesAction(),
    getDashboardStatsAction(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E241B] dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-[#5A6653] dark:text-slate-400 text-sm mt-1">
            Welcome back! Live repository metrics synced with your Supabase database.
          </p>
        </div>

        <Badge variant="sage" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Live Sync Active
        </Badge>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Recent Analyses */}
      <RecentAnalyses items={recentItems} />
    </div>
  );
}
