"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import type { IProfile } from "@/lib/models/PortfolioData";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ profile }: { profile?: IProfile }) {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const github = profile?.github ?? "https://github.com/chiragV1";
  const linkedin = profile?.linkedin ?? "https://www.linkedin.com/in/chiragverma1703/";
  const twitter = profile?.twitter ?? "https://twitter.com/chiragverma";
  const email = profile?.email ?? "chiragverma525@gmail.com";

  return (
    <footer
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(124, 58, 237, 0.15)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7C3AED, #8B5CF6)" }}
              >
                CV
              </div>
              <span className="font-display font-bold text-xl text-white">
                Chirag Verma
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Full Stack Developer & Automation Engineer building scalable web
              apps and intelligent automation systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
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
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(124, 58, 237, 0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(124, 58, 237, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(124, 58, 237, 0.25)";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Available for freelance projects
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400">Open to work</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm text-gray-600 flex items-center gap-1.5">
            © 2026 Chirag Verma. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 flex items-center gap-1">
            Built with <Heart size={12} className="text-purple-500 fill-purple-500" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
