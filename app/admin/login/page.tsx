"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0A0A0F" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124, 58, 237, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(13, 13, 26, 0.9)",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            boxShadow: "0 0 60px rgba(124, 58, 237, 0.1)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(124, 58, 237, 0.2)" }}
            >
              <Lock size={24} style={{ color: "#8B5CF6" }} />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-1">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500">
              Enter your password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
                className="w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none pr-12 transition-all duration-300"
                style={{
                  borderColor: error
                    ? "rgba(239, 68, 68, 0.6)"
                    : "rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => {
                  if (!error)
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "rgba(124, 58, 237, 0.6)";
                }}
                onBlur={(e) => {
                  if (!error)
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "rgba(255,255,255,0.1)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                boxShadow: "0 0 25px rgba(124, 58, 237, 0.3)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
