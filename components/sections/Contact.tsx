"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { toast } from "sonner";

const projectTypes = [
  "Full Stack Web App",
  "REST API Development",
  "Browser Automation",
  "Backend Engineering",
  "E-Commerce Site",
  "CRM / Dashboard",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent! I'll be in touch within 24 hours.", {
          duration: 5000,
        });
        setForm(EMPTY_FORM);
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm transition-all duration-300 outline-none focus:border-purple-500/60 focus:bg-purple-500/5";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124, 58, 237, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Let&apos;s Work{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Together
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Let&apos;s talk about it. I&apos;m always open to
            discussing new opportunities, collaborations, or just a good
            developer conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-display font-bold text-white mb-8">
              Contact Information
            </h3>

            <div className="space-y-4 mb-10">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "chiragverma525@gmail.com",
                  href: "mailto:chiragverma525@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 73517 40611",
                  href: "tel:+917351740611",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "India",
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(124, 58, 237, 0.15)" }}
                  >
                    <Icon size={18} style={{ color: "#8B5CF6" }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        className="text-white text-sm hover:text-purple-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-white text-sm">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">
              Follow me
            </h3>
            <div className="flex gap-3">
              {[
                { icon: GithubIcon, href: "https://github.com/chiragV1", label: "GitHub" },
                {
                  icon: LinkedinIcon,
                  href: "https://www.linkedin.com/in/chiragverma1703/",
                  label: "LinkedIn",
                },
                { icon: TwitterIcon, href: "https://twitter.com/chiragverma", label: "Twitter" },
                { icon: Mail, href: "mailto:chiragverma525@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-white transition-all duration-300"
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
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Chirag Verma"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="chirag@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                    Company
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={{ cursor: "pointer" }}
                >
                  <option value="" disabled style={{ background: "#0D0D1A" }}>
                    Select project type...
                  </option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t} style={{ background: "#0D0D1A" }}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={inputClass}
                  style={{ resize: "vertical" }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                  boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)",
                }}
                onMouseEnter={(e) => {
                  if (!submitting)
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 50px rgba(124, 58, 237, 0.7)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 30px rgba(124, 58, 237, 0.4)";
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
