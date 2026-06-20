"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Download, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import type { IProfile } from "@/lib/models/PortfolioData";

const codeLines = [
  "const chirag = new Developer({",
  "  stack: ['Next.js', 'Node.js', 'Python'],",
  "  passion: 'Building at scale',",
  "  automation: true,",
  "  openToWork: true,",
  "});",
  "",
  "chirag.build('amazing things');",
];

function TerminalWindow() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= codeLines.length) return;

    const line = codeLines[currentLine];
    if (currentChar <= line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.substring(0, currentChar);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  const getLineColor = (line: string) => {
    if (line.startsWith("const") || line.startsWith("//")) return "#8B5CF6";
    if (line.includes("'") || line.includes('"')) return "#34D399";
    if (line.includes("true") || line.includes("false")) return "#F59E0B";
    if (line.includes(".build(") || line.includes(".")) return "#06B6D4";
    return "#e5e7eb";
  };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(13, 13, 26, 0.9)",
        border: "1px solid rgba(124, 58, 237, 0.3)",
        boxShadow:
          "0 0 40px rgba(124, 58, 237, 0.2), 0 0 80px rgba(124, 58, 237, 0.05)",
      }}
    >
      {/* Terminal title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(124, 58, 237, 0.2)" }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-gray-500 font-mono">portfolio.ts</span>
      </div>

      {/* Code content */}
      <div className="p-5 font-mono text-sm leading-7 min-h-[200px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-gray-600 select-none w-6 mr-4 text-right text-xs leading-7">
              {i + 1}
            </span>
            <span style={{ color: getLineColor(line) }}>{line}</span>
          </div>
        ))}
        {currentLine < codeLines.length && (
          <div className="flex">
            <span className="text-gray-600 select-none w-6 mr-4 text-right text-xs leading-7">
              {currentLine + 1}
            </span>
            <span
              className="w-2 h-5 inline-block cursor-blink"
              style={{ background: "#8B5CF6" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const numStr = value.replace(/\D/g, "");
    const suffix = value.replace(/\d/g, "");
    const target = parseInt(numStr, 10);
    let current = 0;
    const steps = 30;
    const interval = setInterval(() => {
      current++;
      setCount(`${Math.round((target / steps) * current)}${suffix}`);
      if (current >= steps) {
        setCount(value);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-3xl md:text-4xl font-display font-bold"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

// Particle background — generated client-side only to avoid SSR/hydration mismatch
function ParticleBg() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "rgba(124, 58, 237, 0.6)"
                : p.id % 3 === 1
                ? "rgba(139, 92, 246, 0.4)"
                : "rgba(6, 182, 212, 0.4)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ profile }: { profile?: IProfile }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const stats = [
    { value: profile?.stats?.yearsExperience ?? "2+", label: "Years Experience" },
    { value: profile?.stats?.projectsCompleted ?? "15+", label: "Projects Completed" },
    { value: profile?.stats?.happyClients ?? "5+", label: "Happy Clients" },
    { value: profile?.stats?.toolsBuilt ?? "3+", label: "Tools Built" },
  ];

  const github = profile?.github ?? "https://github.com/chiragV1";
  const linkedin = profile?.linkedin ?? "https://www.linkedin.com/in/chiragverma1703/";
  const twitter = profile?.twitter ?? "https://twitter.com/chiragverma";
  const email = profile?.email ?? "chiragverma525@gmail.com";

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <ParticleBg />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm text-gray-400 mb-4 tracking-widest uppercase"
            >
              I am Chirag Verma
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-6"
            >
              Full Stack{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #8B5CF6, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Developer
              </span>
              <br />+{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Automation
              </span>
              <br />
              Engineer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              I build scalable web apps and intelligent automation systems that
              solve real problems — from frontend interfaces to production-grade
              APIs and test pipelines.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a
                href="/chirag-verma-cv.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                  boxShadow: "0 0 25px rgba(124, 58, 237, 0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 0 40px rgba(124, 58, 237, 0.7)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 0 25px rgba(124, 58, 237, 0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <Download size={18} />
                Download CV
              </a>

              <button
                onClick={() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(124, 58, 237, 0.5)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(124, 58, 237, 0.1)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(124, 58, 237, 0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(124, 58, 237, 0.5)";
                }}
              >
                Let&apos;s Talk
                <ArrowRight size={18} />
              </button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-4"
            >
              {[
                { icon: GithubIcon, href: github, label: "GitHub" },
                { icon: LinkedinIcon, href: linkedin, label: "LinkedIn" },
                { icon: TwitterIcon, href: twitter, label: "Twitter" },
                { icon: Mail, href: `mailto:${email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-white transition-all duration-300"
                  style={{ border: "1px solid rgba(124, 58, 237, 0.25)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(124, 58, 237, 0.7)";
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(124, 58, 237, 0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 15px rgba(124, 58, 237, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(124, 58, 237, 0.25)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            {/* Glow blob behind terminal */}
            <div
              className="absolute -inset-10 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div className="float-animation">
              <TerminalWindow />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
          style={{
            borderTop: "1px solid rgba(124, 58, 237, 0.15)",
            paddingTop: "2.5rem",
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-0">
              <div className="flex-1">
                <StatCounter value={stat.value} label={stat.label} />
              </div>
              {i < stats.length - 1 && (
                <div
                  className="hidden md:block w-px h-12 mx-auto"
                  style={{ background: "rgba(124, 58, 237, 0.2)" }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(124, 58, 237, 0.4)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: "#8B5CF6" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
