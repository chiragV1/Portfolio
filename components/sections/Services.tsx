"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Plug, Bot, Server, ChevronRight } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: "01",
    icon: Globe,
    title: "Full Stack Web Development",
    description:
      "End-to-end web applications built with modern frameworks. From pixel-perfect React frontends to scalable Node.js backends — designed for performance, SEO, and real-world traffic.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    id: "02",
    icon: Plug,
    title: "REST API Design & Integration",
    description:
      "Clean, versioned REST APIs with authentication, rate limiting, and comprehensive documentation. I design APIs that third-party developers actually enjoy using.",
    tags: ["Express", "JWT", "Swagger", "MongoDB"],
  },
  {
    id: "03",
    icon: Bot,
    title: "Browser Automation (Playwright / Python)",
    description:
      "Production-grade browser automation for scraping, testing, and workflow automation. I build robust pipelines that handle CAPTCHAs, dynamic content, and large-scale data extraction.",
    tags: ["Playwright", "Python", "Selenium", "BeautifulSoup"],
  },
  {
    id: "04",
    icon: Server,
    title: "Backend Engineering (Node.js / Express)",
    description:
      "Scalable backend systems with proper architecture, database optimization, caching strategies, and monitoring. Built to handle growth without rewrites.",
    tags: ["Node.js", "Express", "PostgreSQL", "Redis"],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3">
            What I Offer
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Services &amp;{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Expertise
            </span>
          </h2>
        </motion.div>

        {/* Accordion cards */}
        <div className="space-y-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActiveIndex(i)}
                className="rounded-xl cursor-pointer overflow-hidden transition-all duration-300"
                style={{
                  background: isActive
                    ? "rgba(124, 58, 237, 0.08)"
                    : "rgba(255, 255, 255, 0.02)",
                  border: isActive
                    ? "1px solid rgba(124, 58, 237, 0.5)"
                    : "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: isActive
                    ? "0 0 30px rgba(124, 58, 237, 0.12)"
                    : "none",
                }}
              >
                <div className="flex items-center gap-6 p-5 md:p-7">
                  {/* Number */}
                  <span
                    className="text-2xl font-display font-bold shrink-0 transition-all duration-300"
                    style={{ color: isActive ? "#8B5CF6" : "#374151" }}
                  >
                    {service.id}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: isActive
                        ? "rgba(124, 58, 237, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <Icon
                      size={20}
                      style={{ color: isActive ? "#8B5CF6" : "#6B7280" }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="flex-1 font-display font-semibold text-lg transition-colors duration-300"
                    style={{ color: isActive ? "#ffffff" : "#9CA3AF" }}
                  >
                    {service.title}
                  </h3>

                  {/* Arrow */}
                  <ChevronRight
                    size={20}
                    className="shrink-0 transition-transform duration-300 text-purple-400"
                    style={{ transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }}
                  />
                </div>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-5 md:px-7 pb-6 pt-0 ml-[calc(2rem+2.75rem+1.5rem)]">
                    <p className="text-gray-400 leading-relaxed mb-4 max-w-2xl">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{
                            background: "rgba(124, 58, 237, 0.15)",
                            color: "#A78BFA",
                            border: "1px solid rgba(124, 58, 237, 0.3)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
