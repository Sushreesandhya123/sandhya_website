"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personalInfo } from "@/lib/data";

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2">
        {subtitle}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
        {title}
      </h2>
      <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full" />
    </div>
  );
}

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/sandhyarani-jena",
    href: personalInfo.linkedin,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/Sushreesandhya123",
    href: personalInfo.github,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: null,
  },
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject || "Portfolio Contact")}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle title="Get In Touch" subtitle="Contact" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-[var(--muted)] leading-relaxed">
              I&apos;m currently open to new opportunities. Whether you have a project in mind,
              a job offer, or just want to say hello — my inbox is always open.
            </p>

            <div className="space-y-3">
              {contactLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] group hover:border-[var(--accent)] transition-colors duration-200"
                >
                  <div className="p-2 rounded-lg text-[var(--accent)] group-hover:scale-110 transition-transform">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)] font-mono">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--foreground)]">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--muted)] font-mono mb-1.5 block">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--muted)] font-mono mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--muted)] font-mono mb-1.5 block">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--muted)] font-mono mb-1.5 block">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your message..."
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-[#0a0f1e] font-semibold text-sm hover:opacity-90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(240,180,41,0.35)]"
              >
                <Send size={15} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
