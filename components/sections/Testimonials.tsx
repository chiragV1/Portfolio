"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Riya Sharma",
    role: "Product Manager",
    company: "GrowthTech Solutions",
    rating: 5,
    text: "Chirag built our entire lead management platform from scratch in under 6 weeks. The code quality was excellent, the UI was modern, and he proactively flagged potential issues before they became problems. A genuinely rare combination of speed and quality.",
    avatar: "RS",
  },
  {
    name: "Alex Müller",
    role: "Founder",
    company: "DataPulse Analytics",
    rating: 5,
    text: "We needed a web scraping system that could handle 50+ sites reliably. Chirag's Playwright solution runs 24/7 with built-in error recovery and sends us clean structured data every morning. Saved us 40+ hours of manual work per week.",
    avatar: "AM",
  },
  {
    name: "Priya Nair",
    role: "CTO",
    company: "ShopEase",
    rating: 5,
    text: "The REST API Chirag designed became the backbone of our entire platform. He thought through edge cases we hadn't considered, documented everything thoroughly, and even set up monitoring alerts. Highly recommend him for any backend work.",
    avatar: "PN",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3">
            What Clients Say
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Client{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stories
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl p-6 flex flex-col gap-4 relative group transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(124, 58, 237, 0.5)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 30px rgba(124, 58, 237, 0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255, 255, 255, 0.07)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Quote icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(124, 58, 237, 0.15)" }}
              >
                <Quote size={18} style={{ color: "#8B5CF6" }} />
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#F59E0B"
                    style={{ color: "#F59E0B" }}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
