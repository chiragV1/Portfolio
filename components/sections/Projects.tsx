"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";

const projects = [
  {
    id: 1,
    title: "AutoScraper Pro",
    description:
      "Production-grade web scraping tool with dynamic content handling, CAPTCHA bypass strategies, and structured data export to CSV/JSON/MongoDB. Handles JavaScript-heavy sites with ease.",
    tags: ["Python", "Playwright", "MongoDB", "FastAPI"],
    category: "automation",
    gradient: "from-purple-600 to-cyan-500",
    github: "https://github.com/chiragV1",
    demo: null,
    icon: "🤖",
  },
  {
    id: 2,
    title: "DevLink API",
    description:
      "Robust REST API with JWT authentication, rate limiting, role-based access control, and automated Swagger docs. Production-ready with full test coverage.",
    tags: ["Node.js", "Express", "JWT", "PostgreSQL"],
    category: "apis",
    gradient: "from-blue-600 to-purple-600",
    github: "https://github.com/chiragV1",
    demo: null,
    icon: "🔗",
  },
  {
    id: 3,
    title: "ShopFlow",
    description:
      "Modern e-commerce frontend with server-side rendering, optimistic UI updates, cart management, and Stripe payment integration. Built for sub-100ms page loads.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    category: "web",
    gradient: "from-pink-600 to-purple-600",
    github: "https://github.com/chiragV1",
    demo: "https://shopflow.vercel.app",
    icon: "🛍️",
  },
  {
    id: 4,
    title: "TestPilot",
    description:
      "Comprehensive Playwright automation framework with Page Object Model, parallel test execution, CI/CD integration, and HTML reporting. Used in 3 production projects.",
    tags: ["Playwright", "TypeScript", "CI/CD", "GitHub Actions"],
    category: "automation",
    gradient: "from-green-600 to-cyan-600",
    github: "https://github.com/chiragV1",
    demo: null,
    icon: "🧪",
  },
  {
    id: 5,
    title: "LeadTrack",
    description:
      "Full-stack CRM dashboard for tracking sales leads with real-time status updates, analytics charts, email notifications, and CSV export. Manages 1000+ leads.",
    tags: ["Next.js", "MongoDB", "Mongoose", "Chart.js"],
    category: "web",
    gradient: "from-orange-600 to-pink-600",
    github: "https://github.com/chiragV1",
    demo: null,
    icon: "📊",
  },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Web Apps", value: "web" },
  { label: "Automation", value: "automation" },
  { label: "APIs", value: "apis" },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden group cursor-default transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: hovered
          ? "1px solid rgba(124, 58, 237, 0.6)"
          : "1px solid rgba(255, 255, 255, 0.07)",
        boxShadow: hovered
          ? "0 0 40px rgba(124, 58, 237, 0.2), 0 20px 60px rgba(0,0,0,0.4)"
          : "none",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Card image/header area */}
      <div
        className="h-48 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(6, 182, 212, 0.08))`,
        }}
      >
        <div
          className="text-7xl transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.15)" : "scale(1)" }}
        >
          {project.icon}
        </div>
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(6, 182, 212, 0.2))",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Hover buttons */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <GithubIcon size={15} /> GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
              }}
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full"
              style={{
                background: "rgba(124, 58, 237, 0.12)",
                color: "#A78BFA",
                border: "1px solid rgba(124, 58, 237, 0.25)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="works" className="section-padding relative overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Recent{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Works
            </span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
              style={{
                background:
                  activeCategory === cat.value
                    ? "linear-gradient(135deg, #7C3AED, #8B5CF6)"
                    : "rgba(255,255,255,0.05)",
                color: activeCategory === cat.value ? "#ffffff" : "#9CA3AF",
                border:
                  activeCategory === cat.value
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  activeCategory === cat.value
                    ? "0 0 20px rgba(124, 58, 237, 0.3)"
                    : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
