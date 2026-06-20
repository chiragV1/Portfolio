"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Clock } from "lucide-react";

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

const STATUS_COLORS: Record<string, { bg: string; text: string; next: string }> = {
  new: { bg: "rgba(59, 130, 246, 0.15)", text: "#60A5FA", next: "contacted" },
  contacted: {
    bg: "rgba(245, 158, 11, 0.15)",
    text: "#FCD34D",
    next: "closed",
  },
  closed: { bg: "rgba(16, 185, 129, 0.15)", text: "#34D399", next: "new" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "just now";
}

export default function LeadsTable({
  leads,
  onStatusChange,
}: {
  leads: Lead[];
  onStatusChange: (id: string, status: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No leads found.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {leads.map((lead, i) => {
        const isExpanded = expandedId === lead._id;
        const statusStyle = STATUS_COLORS[lead.status];

        return (
          <motion.div
            key={lead._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: isExpanded
                ? "1px solid rgba(124, 58, 237, 0.4)"
                : "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {/* Row */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : lead._id)}
              className="w-full flex items-center gap-4 p-4 text-left cursor-pointer"
            >
              <span className="text-gray-500 w-4">
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold text-white text-sm">
                    {lead.name}
                  </span>
                  <span className="text-gray-500 text-xs">{lead.email}</span>
                  {lead.company && (
                    <span className="text-xs text-gray-600">
                      · {lead.company}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-xs text-gray-500 shrink-0 hidden sm:block">
                {lead.projectType}
              </span>

              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                style={{
                  background: statusStyle.bg,
                  color: statusStyle.text,
                }}
              >
                {lead.status}
              </span>

              <span className="text-xs text-gray-600 shrink-0 hidden md:flex items-center gap-1">
                <Clock size={11} />
                {timeAgo(lead.createdAt)}
              </span>
            </button>

            {/* Expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="px-5 pb-5 pt-0"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      marginTop: 0,
                    }}
                  >
                    <div className="grid sm:grid-cols-2 gap-4 mt-4 mb-4">
                      {[
                        ["Project Type", lead.projectType],
                        ["Email", lead.email],
                        ["Phone", lead.company || "—"],
                        [
                          "Received",
                          new Date(lead.createdAt).toLocaleString(),
                        ],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <div className="text-xs text-gray-500 mb-0.5">
                            {label}
                          </div>
                          <div className="text-sm text-white">{val}</div>
                        </div>
                      ))}
                    </div>

                    <div
                      className="p-3 rounded-lg mb-4 text-sm text-gray-300 leading-relaxed"
                      style={{
                        background: "rgba(124, 58, 237, 0.06)",
                        borderLeft: "3px solid #7C3AED",
                      }}
                    >
                      {lead.message}
                    </div>

                    {/* Status toggle */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">
                        Change status:
                      </span>
                      {(["new", "contacted", "closed"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => onStatusChange(lead._id, s)}
                          disabled={lead.status === s}
                          className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          style={{
                            background:
                              lead.status === s
                                ? STATUS_COLORS[s].bg
                                : "rgba(255,255,255,0.05)",
                            color:
                              lead.status === s
                                ? STATUS_COLORS[s].text
                                : "#6B7280",
                            border: `1px solid ${
                              lead.status === s
                                ? STATUS_COLORS[s].text + "40"
                                : "rgba(255,255,255,0.1)"
                            }`,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
