"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  index?: number;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  sub,
  index = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl p-5"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(124, 58, 237, 0.2)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(124, 58, 237, 0.15)" }}
        >
          <Icon size={18} style={{ color: "#8B5CF6" }} />
        </div>
      </div>
      <div
        className="text-3xl font-display font-bold mb-0.5"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </div>
      <div className="text-sm text-white font-medium mb-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-500">{sub}</div>}
    </motion.div>
  );
}
