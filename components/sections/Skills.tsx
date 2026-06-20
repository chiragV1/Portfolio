"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { ISkillCategory } from "@/lib/models/PortfolioData";

const STATIC_SKILLS: ISkillCategory[] = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React / Next.js", level: 90, color: "#61DAFB" },
      { name: "TypeScript", level: 85, color: "#3178C6" },
      { name: "Tailwind CSS", level: 92, color: "#06B6D4" },
      { name: "HTML / CSS", level: 95, color: "#E34F26" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js / Express", level: 88, color: "#339933" },
      { name: "Java / Spring Boot", level: 80, color: "#F89820" },
      { name: "REST API Design", level: 90, color: "#8B5CF6" },
      { name: "Python", level: 82, color: "#3776AB" },
    ],
  },
  {
    category: "Automation",
    icon: "🤖",
    skills: [
      { name: "Python Automation", level: 88, color: "#3776AB" },
      { name: "Playwright", level: 85, color: "#2EAD33" },
      { name: "Data Pipelines", level: 82, color: "#A78BFA" },
      { name: "Workflow Automation", level: 84, color: "#F59E0B" },
    ],
  },
  {
    category: "Databases & Cloud",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", level: 87, color: "#47A248" },
      { name: "MySQL / SQL", level: 80, color: "#336791" },
      { name: "Vercel / Render", level: 85, color: "#06B6D4" },
      { name: "Firebase", level: 72, color: "#FFCA28" },
    ],
  },
];

function CircularProgress({
  skill,
  animate,
}: {
  skill: { name: string; level: number; color: string };
  animate: boolean;
}) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const timeout = setTimeout(() => setProgress(skill.level), 200);
    return () => clearTimeout(timeout);
  }, [animate, skill.level]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="40" cy="40" r={radius} fill="none"
            stroke={skill.color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 1s ease-out",
              filter: `drop-shadow(0 0 6px ${skill.color}80)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{progress}%</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 text-center leading-tight max-w-20">{skill.name}</span>
    </div>
  );
}

export default function Skills({ skills }: { skills?: ISkillCategory[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const skillData = skills && skills.length > 0 ? skills : STATIC_SKILLS;

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3">What I Know</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Technical{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Skills
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillData.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(124, 58, 237, 0.15)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-display font-semibold text-lg text-white">{cat.category}</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: catIndex * 0.15 + i * 0.08 }}
                  >
                    <CircularProgress skill={skill} animate={inView} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
