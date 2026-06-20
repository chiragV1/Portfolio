"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Briefcase,
  Clock,
  LogOut,
  RefreshCw,
  BarChart2,
  ExternalLink,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import LeadsTable from "@/components/admin/LeadsTable";

interface Stats {
  totalLeads: number;
  newLeadsThisWeek: number;
  topProjectType: string;
  lastLeadAt: string | null;
  pageViews: { page: string; count: number }[];
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

function timeAgo(dateStr: string | null) {
  if (!dateStr) return "Never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (mins > 0) return `${mins} min ago`;
  return "just now";
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, leadsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch(`/api/admin/leads?status=${statusFilter}&limit=50`),
      ]);

      if (statsRes.status === 401 || leadsRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      const [statsData, leadsData] = await Promise.all([
        statsRes.json(),
        leadsRes.json(),
      ]);

      setStats(statsData);
      setLeads(leadsData.leads || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            l._id === id ? { ...l, status: status as Lead["status"] } : l
          )
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSeed = async () => {
    if (!confirm("Re-seed portfolio data from CV? This will overwrite existing profile/experience/skills data.")) return;
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const data = await res.json();
    alert(res.ok ? "✅ " + data.message : "❌ " + data.error);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0A0A0F" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }}
          />
          <p className="text-gray-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      {/* Topbar */}
      <div
        className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10, 10, 15, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(124, 58, 237, 0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #8B5CF6)" }}
          >
            CV
          </div>
          <span className="font-display font-semibold text-white">
            Admin Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-purple-400 hover:text-white transition-colors cursor-pointer"
            style={{ border: "1px solid rgba(124,58,237,0.3)" }}
            title="Seed portfolio data (experience, skills, profile) from CV"
          >
            ⚡ Seed CV Data
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              icon={Users}
              label="Total Leads"
              value={stats.totalLeads}
              index={0}
            />
            <StatsCard
              icon={TrendingUp}
              label="New This Week"
              value={stats.newLeadsThisWeek}
              sub="Last 7 days"
              index={1}
            />
            <StatsCard
              icon={Briefcase}
              label="Top Project Type"
              value={stats.topProjectType}
              sub="Most requested"
              index={2}
            />
            <StatsCard
              icon={Clock}
              label="Last Lead"
              value={timeAgo(stats.lastLeadAt)}
              index={3}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Page Views */}
          {stats && stats.pageViews.length > 0 && (
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(124, 58, 237, 0.15)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 size={16} style={{ color: "#8B5CF6" }} />
                <h3 className="font-semibold text-white text-sm">
                  Top Pages
                </h3>
              </div>
              <div className="space-y-3">
                {stats.pageViews.slice(0, 5).map((pv) => (
                  <div
                    key={pv.page}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-400 truncate">{pv.page}</span>
                    <span className="text-purple-400 font-semibold ml-2 shrink-0">
                      {pv.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-4">
                Full analytics:{" "}
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  Google Analytics
                  <ExternalLink size={10} />
                </a>
              </p>
            </div>
          )}

          {/* Placeholder */}
          <div
            className="lg:col-span-2 rounded-xl p-5 flex flex-col justify-between"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(124, 58, 237, 0.15)",
            }}
          >
            <div>
              <h3 className="font-semibold text-white text-sm mb-2">
                Quick Stats
              </h3>
              <p className="text-gray-500 text-sm">
                Page views are tracked via MongoDB. For detailed session
                analytics, funnel tracking, and geographic data, visit your
                Google Analytics 4 and Microsoft Clarity dashboards.
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-white"
                style={{
                  background: "rgba(124, 58, 237, 0.15)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                }}
              >
                <ExternalLink size={12} />
                Google Analytics
              </a>
              <a
                href="https://clarity.microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-white"
                style={{
                  background: "rgba(6, 182, 212, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                }}
              >
                <ExternalLink size={12} />
                Microsoft Clarity
              </a>
            </div>
          </div>
        </div>

        {/* Leads table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-white">
              Leads
            </h2>

            {/* Status filter */}
            <div className="flex gap-2">
              {["all", "new", "contacted", "closed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize cursor-pointer"
                  style={{
                    background:
                      statusFilter === s
                        ? "rgba(124, 58, 237, 0.25)"
                        : "rgba(255,255,255,0.04)",
                    color: statusFilter === s ? "#A78BFA" : "#6B7280",
                    border: `1px solid ${
                      statusFilter === s
                        ? "rgba(124, 58, 237, 0.4)"
                        : "rgba(255,255,255,0.08)"
                    }`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <LeadsTable leads={leads} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
}
