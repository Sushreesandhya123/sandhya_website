"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Download, Mail, ArrowRight, MapPin,
  Zap, ShieldCheck, Layers, Activity, Lock, Briefcase,
  Code2, Server, Monitor, Cloud,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personalInfo, projects } from "@/lib/data";
import Img from "@/app/assets/sandhyapf.jpg";

/* ─── Constants ───────────────────────────────────────────────── */

const roles = [
  "Full Stack Developer",
  "Web Application Developer",
  "React.js Developer",
  "Next.js Developer",
  "FastAPI Developer",
];

const techPills = ["Next.js", "React", "Node.js", "Python", "FastAPI", "MySQL", "GitHub Actions"];

const rightStats = [
  {
    value: "2+",
    label: "Years Experience",
    sub: "Full Stack Development",
    Icon: Briefcase,
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
  {
    value: "30%",
    label: "Performance Engineering",
    sub: "Faster page loads & optimized rendering",
    Icon: Zap,
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent-bg)] border-[var(--accent)]/20",
  },
  {
    value: "",
    label: "System Architecture",
    sub: "Scalable, modular & reusable services",
    Icon: Layers,
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    value: "",
    label: "Real-Time Engineering",
    sub: "Live tracking & event-driven systems",
    Icon: Activity,
    color: "text-[var(--accent-secondary)]",
    bg: "bg-[var(--accent-secondary)]/10 border-[var(--accent-secondary)]/20",
  },
  {
    value: "",
    label: "Security Engineering",
    sub: "JWT, RBAC & protected APIs",
    Icon: Lock,
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  
];

const barStats = [
  { value: "01", label: "Full-Stack Development",  sub: "Frontend → API → Database → Deployment",            Icon: Code2 },
  { value: "02", label: "Real-Time Systems",        sub: "Socket.IO → Live Tracking → Events → Notifications", Icon: Activity },
  { value: "03", label: "Backend Engineering",      sub: "FastAPI → Node.js → REST APIs → MySQL",              Icon: Server },
  { value: "04", label: "Frontend Architecture",    sub: "Next.js → React → TypeScript → Reusable UI",         Icon: Monitor },
  { value: "05", label: "Cloud & Integrations",     sub: "AWS S3 → Firebase → Google Maps → Payments",         Icon: Cloud },
  { value: "06", label: "Production Engineering",   sub: "Security → Performance → Scalability → Reliability", Icon: ShieldCheck },
];

const projectMeta: Record<number, { subtitle: string; gradient: string }> = {
  1: { subtitle: "Logistics & Transportation Platform", gradient: "from-amber-900/80 via-yellow-900/50 to-slate-900" },
  2: { subtitle: "Apartment Management Platform",       gradient: "from-teal-900/80 via-cyan-900/50 to-slate-900" },
  3: { subtitle: "School Automation System",            gradient: "from-indigo-900/80 via-blue-900/50 to-slate-900" },
};

const socialLinks = [
  { href: personalInfo.github,            Icon: GithubIcon,   label: "GitHub" },
  { href: personalInfo.linkedin,          Icon: LinkedinIcon, label: "LinkedIn" },
  { href: `mailto:${personalInfo.email}`, Icon: Mail,         label: "Email" },
];

/* ─── Typing animation ────────────────────────────────────────── */

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyping(false), 2000);
      return () => clearTimeout(t);
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      }
      setRoleIndex((i) => (i + 1) % roles.length);
      setTyping(true);
    }
  }, [displayed, typing, roleIndex]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="text-[var(--accent)] opacity-80 animate-pulse">|</span>
    </span>
  );
}

/* ─── Profile photo ───────────────────────────────────────────── */

function HeroPhoto() {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[var(--accent)]/8 blur-3xl" />
      {/* Rings */}
      <div className="absolute w-[272px] h-[272px] rounded-full border border-[var(--accent)]/15" />
      <div className="absolute w-[310px] h-[310px] rounded-full border border-[var(--accent-secondary)]/10" />

      {/* Photo */}
      <div className="relative w-[236px] h-[236px] sm:w-[256px] sm:h-[256px] rounded-full overflow-hidden border-2 border-[var(--accent)]/30 shadow-2xl shadow-[var(--accent)]/10">
        <Image
          src={Img}
          alt="Sandhyarani Jena"
          fill
          sizes="256px"
          className="object-cover object-top"
          priority
        />
      </div>
    </div>
  );
}

/* ─── Main Hero ───────────────────────────────────────────────── */

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const featured = projects.filter((p) => p.highlight);

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/4 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-secondary)]/4 blur-3xl" />
      </div>

      {/* ── Top hero: 3-column ─────────────────────────────────── */}
      <div className="max-w-full mx-auto px-6 lg:px-10 pt-10 pb-4">
        {/*
          Content area widths (sidebar = 288px):
          • lg  (1024): 736px  → 2-col (text | photo)
          • xl  (1280): 992px  → 2-col (text | photo)
          • 2xl (1536): 1248px → 3-col (text | photo | stats)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] 2xl:grid-cols-[1fr_260px_220px] gap-8 2xl:gap-12 items-center">

          {/* Left – text */}
          <div className="space-y-5 order-2 lg:order-1">
            <motion.p {...fade(0.05)} className="text-xs font-mono text-[var(--accent)] tracking-[0.2em] uppercase">
              Hello, I&apos;m
            </motion.p>

            <motion.h1 {...fade(0.12)} className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-[1.12] text-[var(--foreground)]">
              Sandhyarani Jena
            </motion.h1>

            <motion.h2 {...fade(0.2)} className="text-xl sm:text-2xl xl:text-3xl font-bold leading-tight min-h-[2rem]">
              <TypingText />
            </motion.h2>

            <motion.p {...fade(0.27)} className="text-[var(--muted)] text-sm leading-relaxed max-w-lg">
              I build scalable, real-time web applications that improve business
              operations, performance, and user experience.
            </motion.p>

            {/* Tech pills */}
            <motion.div {...fade(0.33)} className="flex flex-wrap gap-2">
              {techPills.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-xs font-medium text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--foreground)] transition-all duration-200"
                >
                  {name}
                </span>
              ))}
            </motion.div>

            {/* Location + availability */}
            <motion.div {...fade(0.38)} className="flex items-center flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-[var(--muted)]">
                <MapPin size={13} className="text-[var(--accent)]" />
                Bengaluru, India
              </span>
              <span className="h-3 w-px bg-[var(--border)]" />
              <span className="flex items-center gap-1.5 text-green-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div {...fade(0.44)} className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => scrollTo("projects")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[#0a0f1e] font-semibold text-sm hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:shadow-[var(--accent)]/30"
              >
                View My Work <ArrowRight size={14} />
              </button>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-200"
              >
                <Download size={14} /> Download CV
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--accent-secondary)]/50 hover:text-[var(--accent-secondary)] transition-all duration-200"
              >
                <Mail size={14} /> Let&apos;s Connect
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div {...fade(0.5)} className="flex items-center gap-2.5 pt-0.5">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Center – photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <HeroPhoto />
          </motion.div>

          {/* Right – stat cards (2xl+ only, when sidebar has enough room) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="hidden 2xl:flex flex-col gap-3 order-3"
          >
            {rightStats.map(({ value, label, sub, Icon, color, bg }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:shadow-md transition-all duration-200"
              >
                <div className={`p-2 rounded-xl border ${bg} flex-shrink-0`}>
                  <Icon size={16} className={color} />
                </div>
                <div className="min-w-0">
                  {value && (
                    <p className={`text-lg font-bold leading-tight ${color}`}>{value}</p>
                  )}
                  <p className={`text-[11px] font-semibold leading-tight ${value ? "text-[var(--muted)]" : color} mt-0.5`}>
                    {label}
                  </p>
                  <p className="text-[10px] text-[var(--muted)]/60 leading-tight mt-0.5 truncate">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Engineering Focus bar ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-14 border-t border-[var(--border)] grid grid-cols-3 xl:grid-cols-6 xl:divide-x xl:divide-[var(--border)]"
        >
          {barStats.map(({ label, sub, Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
              className="group relative flex flex-col items-center text-center gap-2.5 py-7 px-4 hover:bg-[var(--card-bg)] transition-all duration-200"
            >
              {/* Accent top line on hover */}
              <span className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />

              {/* Icon */}
              <div className="p-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] group-hover:border-[var(--accent)]/40 group-hover:bg-[var(--accent-bg)] transition-all duration-200">
                <Icon size={15} className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
              </div>

              {/* Label */}
              <p className="text-[11px] font-semibold text-[var(--foreground)] leading-snug transition-colors group-hover:text-[var(--accent)]">
                {label}
              </p>

              {/* Sub-text */}
              <p className="text-[10px] text-[var(--muted)]/60 leading-relaxed">
                {sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
