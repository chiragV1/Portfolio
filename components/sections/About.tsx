"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Zap, Shield } from "lucide-react";
import type { IProfile } from "@/lib/models/PortfolioData";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Every line written with readability, maintainability, and scalability in mind.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Agile execution without cutting corners. Production-ready code, on time.",
  },
  {
    icon: Shield,
    title: "Reliability",
    desc: "Systems built to handle real-world traffic, edge cases, and growth.",
  },
];

export default function About({ profile }: { profile?: IProfile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const bio = profile?.bio ??
    "I'm Chirag Verma, a Full Stack Developer and Automation Engineer based in India. With 2+ years of hands-on experience, I specialize in building web applications that are both visually compelling and technically robust. My background spans the full stack — React frontends, Node.js backends, REST APIs, and browser automation with Playwright and Python.";

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm text-purple-400 tracking-widest uppercase mb-3"
            >
              About Me
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-bold mb-6"
            >
              Building the web,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                one system
              </span>{" "}
              at a time
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 leading-relaxed mb-4"
            >
              {bio.split(". ").slice(0, 2).join(". ") + "."}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 leading-relaxed"
            >
              {bio.split(". ").slice(2).join(". ")}
            </motion.p>
          </div>

          {/* Right — highlights */}
          <div className="space-y-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="flex items-start gap-5 p-5 rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(124, 58, 237, 0.12)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(124, 58, 237, 0.4)";
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(124, 58, 237, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(124, 58, 237, 0.12)";
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(255,255,255,0.02)";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(124, 58, 237, 0.15)" }}
                  >
                    <Icon size={20} style={{ color: "#8B5CF6" }} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
