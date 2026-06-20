"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IExperienceEntry, IEducationEntry } from "@/lib/models/PortfolioData";

// Fallback static data (used when MongoDB not yet seeded)
const STATIC_EXPERIENCE: IExperienceEntry[] = [
  {
    period: "Aug 2025 – Present",
    role: "Freelance Automation Developer",
    company: "Aptli AI",
    location: "Remote",
    description:
      "Building an intelligent hotel reconciliation system using Python automation. Developed automated pipelines that fetch live booking and billing data from hotel management systems, and engineered workflows that perform end-to-end reconciliation — flagging discrepancies and triggering corrective actions automatically.",
    tags: ["Python", "Playwright", "Automation", "REST APIs", "Data Pipelines"],
    current: true,
  },
  {
    period: "Sep 2024 – Present",
    role: "Freelance Software Developer",
    company: "Remote / Independent",
    location: "Remote",
    description:
      "Building modern MERN stack web applications for clients across various domains. Designed interfaces with React.js, TypeScript, and Tailwind CSS. Developed secure backend APIs with Node.js and Express. Handled full project lifecycle from planning to deployment on Vercel, Render, and Netlify.",
    tags: ["MERN", "React.js", "TypeScript", "Node.js", "MongoDB", "Vercel"],
    current: true,
  },
  {
    period: "Jun 2023 – Aug 2024",
    role: "Associate Application Developer",
    company: "Oracle Financial Services Software",
    location: "Bangalore",
    description:
      "Designed and developed scalable RESTful APIs using Spring Boot and Java. Implemented rate limiting, caching, and Spring Security. Built responsive front-end components with React/Angular integrated via AJAX. Designed SQL schemas with Spring Data JPA. Participated in code reviews and cross-functional delivery.",
    tags: ["Java", "Spring Boot", "REST APIs", "Spring Security", "SQL", "React"],
    current: false,
  },
];

const STATIC_EDUCATION: IEducationEntry[] = [
  {
    period: "Jul 2019 – Jun 2023",
    degree: "B.E. — Instrumentation & Control Engineering",
    institution: "National Institute of Technology Trichy",
    score: "7.24 CGPA",
    description:
      "Studied software engineering, data structures, algorithms, control systems, and embedded systems at one of India's premier NITs.",
  },
  {
    period: "Apr 2015 – Mar 2017",
    degree: "Higher Secondary School",
    institution: "Delhi Public School, Agra",
    score: "87.2%",
    description:
      "Science stream with Mathematics, Physics, and Chemistry.",
  },
];

interface TimelineProps {
  title: string;
  entries: { period: string; role?: string; degree?: string; company?: string; institution?: string; location?: string; description: string; tags?: string[]; current?: boolean; score?: string }[];
  direction: "left" | "right";
  delay: number;
  type: "experience" | "education";
}

function TimelineColumn({ title, entries, direction, delay, type }: TimelineProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <motion.h3
        initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3"
      >
        <span
          className="w-8 h-0.5"
          style={{ background: "linear-gradient(90deg, #7C3AED, transparent)" }}
        />
        {title}
      </motion.h3>

      <div className="relative pl-6">
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, #7C3AED, transparent)" }}
        />

        <div className="space-y-6">
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: direction === "left" ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: delay + i * 0.15 }}
              className="relative"
            >
              {/* Dot — glowing green for current, purple otherwise */}
              <div
                className="absolute -left-6.5 top-2 w-3 h-3 rounded-full"
                style={{
                  background: entry.current ? "#10B981" : "#7C3AED",
                  boxShadow: entry.current
                    ? "0 0 10px rgba(16, 185, 129, 0.7)"
                    : "0 0 10px rgba(124, 58, 237, 0.6)",
                  border: "2px solid #0A0A0F",
                }}
              />

              <div
                className="rounded-xl p-5 transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124, 58, 237, 0.4)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(124, 58, 237, 0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255, 255, 255, 0.06)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255, 255, 255, 0.02)";
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <span className="text-xs font-semibold text-purple-400">{entry.period}</span>
                  {entry.current && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34D399" }}
                    >
                      Current
                    </span>
                  )}
                  {type === "education" && entry.score && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(124, 58, 237, 0.15)", color: "#A78BFA" }}
                    >
                      {entry.score}
                    </span>
                  )}
                </div>

                <h4 className="font-display font-bold text-white text-base mb-0.5">
                  {type === "experience" ? entry.role : entry.degree}
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  {type === "experience" ? entry.company : entry.institution}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">{entry.description}</p>

                {type === "experience" && entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(124, 58, 237, 0.1)",
                          color: "#A78BFA",
                          border: "1px solid rgba(124, 58, 237, 0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ExperienceProps {
  experience?: IExperienceEntry[];
  education?: IEducationEntry[];
}

export default function Experience({ experience, education }: ExperienceProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const expData = experience && experience.length > 0 ? experience : STATIC_EXPERIENCE;
  const eduData = education && education.length > 0 ? education : STATIC_EDUCATION;

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3">My Journey</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Experience &amp;{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Education
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <TimelineColumn
            title="Work Experience"
            entries={expData}
            direction="left"
            delay={0.1}
            type="experience"
          />
          <TimelineColumn
            title="Education"
            entries={eduData}
            direction="right"
            delay={0.25}
            type="education"
          />
        </div>
      </div>
    </section>
  );
}
