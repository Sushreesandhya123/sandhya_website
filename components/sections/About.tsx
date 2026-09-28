"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin, Mail, GraduationCap, Briefcase,
  Code2, Server, Activity, Monitor, Cloud, ShieldCheck,
  TrendingUp, Zap, Users, CheckCircle2, Star,
} from "lucide-react";
import { personalInfo, education } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay },
});

// ── Full Stack Node Graph ──────────────────────────────────
function FullStackFlow() {
  return (
    <motion.div
      {...fadeUp(0.45)}
      className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] px-4 pt-4 pb-5 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-mono text-[var(--muted)] tracking-[0.2em] uppercase">System Architecture</p>
        <span className="text-[10px] font-mono text-[var(--accent-secondary)] tracking-widest">FULL-STACK // ARCH</span>
      </div>

      {/*
        Layout (ViewBox 600×360):
        FRONTEND  center-x=300  w=185  x=208  right=393  bottom=96
        AUTH      center-x=88   w=148  x=14   right=162  bottom=216
        BACKEND   center-x=300  w=185  x=208  right=393  bottom=218
        CLOUD     center-x=512  w=148  x=438  right=586  bottom=216
        DATABASE  center-x=140  w=148  x=66   right=214  bottom=342
        REALTIME  center-x=460  w=148  x=386  right=534  bottom=342
      */}
      <svg viewBox="0 0 600 360" className="w-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0b429" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.45"/>
          </linearGradient>
        </defs>

        {/* ── LINES ── */}

        {/* FRONTEND(300,96) → BACKEND(300,162) */}
        <line x1="300" y1="96" x2="300" y2="162" stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="308" y="127" fill="#f0b429" fontSize="9">REST API</text>

        {/* AUTH right(162,190) → BACKEND left(208,190) */}
        <line x1="162" y1="190" x2="208" y2="190" stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="185" y="183" fill="#2dd4bf" fontSize="9" textAnchor="middle">JWT</text>

        {/* BACKEND right(393,190) → CLOUD left(438,190) */}
        <line x1="393" y1="190" x2="438" y2="190" stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="415" y="183" fill="#38bdf8" fontSize="9" textAnchor="middle">S3</text>

        {/* BACKEND(262,218) → DATABASE top-center(140,290) */}
        <line x1="262" y1="218" x2="140" y2="290" stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="192" y="252" fill="#60a5fa" fontSize="9" textAnchor="middle">SQL</text>

        {/* BACKEND(338,218) → REALTIME top-center(460,290) */}
        <line x1="338" y1="218" x2="460" y2="290" stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="406" y="252" fill="#4ade80" fontSize="9" textAnchor="middle">Socket</text>

        {/* ── NODES ── */}

        {/* FRONTEND — amber | x=208 w=185 center=300 */}
        <rect x="208" y="44" width="185" height="52" rx="11" fill="var(--background)" stroke="#f0b429" strokeWidth="1.5"/>
        <rect x="208" y="44" width="185" height="52" rx="11" fill="#f0b429" fillOpacity="0.05"/>
        <circle cx="230" cy="70" r="5" fill="#f0b429" fillOpacity="0.25"/>
        <circle cx="230" cy="70" r="2.5" fill="#f0b429"/>
        <text x="242" y="66" fill="var(--foreground)" fontSize="11" fontWeight="600" letterSpacing="1.5">FRONTEND</text>
        <text x="242" y="80" fill="#f0b429" fontSize="8.5" opacity="0.8">React · Next.js · Tailwind</text>

        {/* AUTH — teal | x=14 w=148 center=88 */}
        <rect x="14" y="164" width="148" height="52" rx="11" fill="var(--background)" stroke="#2dd4bf" strokeWidth="1.5"/>
        <rect x="14" y="164" width="148" height="52" rx="11" fill="#2dd4bf" fillOpacity="0.05"/>
        <circle cx="36" cy="190" r="5" fill="#2dd4bf" fillOpacity="0.25"/>
        <circle cx="36" cy="190" r="2.5" fill="#2dd4bf"/>
        <text x="48" y="186" fill="var(--foreground)" fontSize="11" fontWeight="600" letterSpacing="1.5">AUTH</text>
        <text x="48" y="200" fill="#2dd4bf" fontSize="8.5" opacity="0.8">JWT · RBAC · 5 Roles</text>

        {/* BACKEND — violet hub | x=208 w=185 center=300 */}
        <rect x="208" y="162" width="185" height="56" rx="11" fill="var(--background)" stroke="#a78bfa" strokeWidth="2"/>
        <rect x="208" y="162" width="185" height="56" rx="11" fill="#a78bfa" fillOpacity="0.07"/>
        <circle cx="230" cy="190" r="5" fill="#a78bfa" fillOpacity="0.35"/>
        <circle cx="230" cy="190" r="2.5" fill="#a78bfa"/>
        <text x="242" y="185" fill="var(--foreground)" fontSize="11" fontWeight="700" letterSpacing="1.5">BACKEND</text>
        <text x="242" y="200" fill="#a78bfa" fontSize="8.5" opacity="0.8">FastAPI · Node.js · Laravel</text>

        {/* CLOUD — sky | x=438 w=148 center=512 */}
        <rect x="438" y="164" width="148" height="52" rx="11" fill="var(--background)" stroke="#38bdf8" strokeWidth="1.5"/>
        <rect x="438" y="164" width="148" height="52" rx="11" fill="#38bdf8" fillOpacity="0.05"/>
        <circle cx="460" cy="190" r="5" fill="#38bdf8" fillOpacity="0.25"/>
        <circle cx="460" cy="190" r="2.5" fill="#38bdf8"/>
        <text x="472" y="186" fill="var(--foreground)" fontSize="11" fontWeight="600" letterSpacing="1.5">CLOUD</text>
        <text x="472" y="200" fill="#38bdf8" fontSize="8.5" opacity="0.8">AWS S3 · Firebase</text>

        {/* DATABASE — blue | x=66 w=148 center=140 */}
        <rect x="66" y="290" width="148" height="52" rx="11" fill="var(--background)" stroke="#60a5fa" strokeWidth="1.5"/>
        <rect x="66" y="290" width="148" height="52" rx="11" fill="#60a5fa" fillOpacity="0.05"/>
        <circle cx="88" cy="316" r="5" fill="#60a5fa" fillOpacity="0.25"/>
        <circle cx="88" cy="316" r="2.5" fill="#60a5fa"/>
        <text x="100" y="312" fill="var(--foreground)" fontSize="11" fontWeight="600" letterSpacing="1.5">DATABASE</text>
        <text x="100" y="326" fill="#60a5fa" fontSize="8.5" opacity="0.8">MySQL · SQL Server</text>

        {/* REALTIME — green | x=386 w=148 center=460 */}
        <rect x="386" y="290" width="148" height="52" rx="11" fill="var(--background)" stroke="#4ade80" strokeWidth="1.5"/>
        <rect x="386" y="290" width="148" height="52" rx="11" fill="#4ade80" fillOpacity="0.05"/>
        <circle cx="408" cy="316" r="5" fill="#4ade80" fillOpacity="0.25"/>
        <circle cx="408" cy="316" r="2.5" fill="#4ade80"/>
        <text x="420" y="312" fill="var(--foreground)" fontSize="11" fontWeight="600" letterSpacing="1.5">REALTIME</text>
        <text x="420" y="326" fill="#4ade80" fontSize="8.5" opacity="0.8">Socket.IO · Firebase</text>
      </svg>
    </motion.div>
  );
}

// ── What I Do ──────────────────────────────────────────────
const domains = [
  {
    Icon: Code2,
    title: "Full-Stack Development",
    desc: "End-to-end web apps — from pixel-perfect UIs to performant APIs and optimized databases.",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    Icon: Activity,
    title: "Real-Time Systems",
    desc: "Live tracking, instant notifications, and event-driven architectures with Socket.IO & Firebase.",
    color: "text-teal-400",
    bg: "bg-teal-400/10 border-teal-400/20",
  },
  {
    Icon: Server,
    title: "Backend Engineering",
    desc: "Scalable REST APIs with FastAPI, Node.js, Django & Laravel handling thousands of daily requests.",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
  },
  {
    Icon: Monitor,
    title: "Frontend Architecture",
    desc: "Reusable component systems, state management, and responsive interfaces with Next.js & React.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    Icon: Cloud,
    title: "Cloud & Integrations",
    desc: "AWS S3, Firebase, Google Maps API, payment gateways and third-party service integrations.",
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/20",
  },
  {
    Icon: ShieldCheck,
    title: "Production Engineering",
    desc: "JWT + RBAC auth, performance optimisation, security hardening, and Agile delivery.",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
];

// ── What I Achieved ─────────────────────────────────────────
const stats = [
  { Icon: Briefcase, value: "2+",   label: "Years Experience",    color: "text-amber-400" },
  { Icon: TrendingUp, value: "40%", label: "Efficiency Gains",    color: "text-teal-400"  },
  { Icon: Zap,        value: "35%", label: "Latency Reduced",     color: "text-violet-400"},
  { Icon: Users,      value: "5",   label: "User Role Systems",   color: "text-blue-400"  },
  { Icon: Star,       value: "7+",  label: "Projects Shipped",    color: "text-sky-400"   },
  { Icon: Code2,      value: "10K+",label: "API Req / Month",     color: "text-green-400" },
];

const achievements = [
  "Architected real-time logistics platform (GoCarriage) — cut booking response latency by 35%",
  "Engineered live driver tracking with Socket.IO, Firebase & Google Maps API",
  "Built AWS S3 document pipelines (KYC / RC / Insurance) — cut manual effort by 50%",
  "Developed high-performance REST APIs handling 10,000+ monthly requests",
  "Rebuilt 4+ enterprise frontend modules — reduced page load by 1.2s",
  "Implemented JWT + RBAC auth across 5 user roles in production systems",
  "Led Agile delivery in 6-member teams — reduced delivery-cycle time by 20%",
];

export function About() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-padding max-w-7xl mx-auto">

      {/* ══ WHO AM I ════════════════════════════════════════════ */}
      <div>
        <motion.div {...fadeUp(0)}>
          <p className="font-mono text-[15px] text-[var(--accent)] tracking-[0.22em] uppercase mb-2">Who am I</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-1">
            The Person Behind the <span className="gradient-text">Code</span>
          </h2>
          <div className="h-0.5 w-14 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full mt-3 mb-10" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          {/* Bio */}
          <motion.div {...fadeLeft(0.1)} className="space-y-5">
            <p className="text-[var(--muted)] leading-relaxed text-[15px]">
              Hi, I&apos;m <span className="text-[var(--foreground)] font-semibold">Sandhyarani Jena</span> — a Full Stack Developer
              with <span className="text-[var(--accent)] font-medium">2+ years of hands-on experience</span> building
              real-world, production-grade web applications from the ground up.
            </p>
            <p className="text-[var(--muted)] leading-relaxed text-[15px]">
              I work across the entire stack — crafting responsive UIs with <span className="text-[var(--foreground)]">Next.js & React</span>,
              building robust APIs with <span className="text-[var(--foreground)]">FastAPI, Node.js & Django</span>,
              and integrating cloud services like <span className="text-[var(--foreground)]">AWS S3, Firebase & Google Maps</span>.
            </p>
            <p className="text-[var(--muted)] leading-relaxed text-[15px]">
              I thrive in Agile startup environments where speed, quality, and real impact matter. Whether it&apos;s
              live booking flows, subscription billing engines, or role-based security — I build systems that scale.
            </p>

            {/* Contact chips */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                { Icon: MapPin, text: personalInfo.location },
                { Icon: Mail,   text: personalInfo.email, href: `mailto:${personalInfo.email}` },
               
              ].map(({ Icon, text, href }) => (
                href ? (
                  <a key={text} href={href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[11px] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all font-mono">
                    <Icon size={11} className="shrink-0" /> {text}
                  </a>
                ) : (
                  <span key={text}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[11px] text-[var(--muted)] font-mono">
                    <Icon size={11} className="shrink-0" /> {text}
                  </span>
                )
              ))}
            </div>
          </motion.div>

          {/* Education + quick facts */}
          <motion.div {...fadeUp(0.2)} className="space-y-3">
            {/* Education */}
            <div className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                  <GraduationCap size={15} />
                </div>
                <p className="text-[11px] font-mono text-[var(--accent)] tracking-wider uppercase">Education</p>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)] leading-snug">{education.degree}</p>
              <p className="text-[12px] text-[var(--muted)] mt-1">{education.institution}</p>
              <p className="text-[11px] text-[var(--muted)]/70 mt-0.5">{education.university}</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--border)]">
                <span className="font-mono text-xs text-[var(--accent)]">{education.period}</span>
                <span className="text-[var(--border)]">|</span>
                <span className="font-mono text-xs text-[var(--accent-secondary)]">CGPA {education.cgpa}</span>
              </div>
            </div>

            {/* Currently at */}
            <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] mt-0.5">
                <Briefcase size={14} />
              </div>
              <div>
                <p className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider">Currently at</p>
                <p className="text-sm font-semibold text-[var(--foreground)] mt-0.5">Zebraffe Technologies Ltd.</p>
                <p className="text-[11px] text-[var(--muted)] mt-0.5">Full Stack Developer · Aug 2025 – Present</p>
                <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Open to opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══ WHAT I DO ═══════════════════════════════════════════ */}
      <div>
        <motion.div {...fadeUp(0)}>
          <p className="font-mono text-[15px] text-[var(--accent)] tracking-[0.22em] uppercase mb-2">What I Do</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-1">
            Domains I <span className="gradient-text">Specialise In</span>
          </h2>
          <div className="h-0.5 w-14 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full mt-3 mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {domains.map(({ Icon, title, desc, color, bg }, i) => (
            <motion.div
              key={title}
              {...fadeUp(0.05 + i * 0.07)}
              className="group p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)]/25 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-300"
            >
              <div className={`inline-flex p-2.5 rounded-xl border ${bg} mb-4 transition-transform duration-200 group-hover:scale-105`}>
                <Icon size={16} className={color} />
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                {title}
              </h3>
              <p className="text-[12px] text-[var(--muted)] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <FullStackFlow />
      </div>

      {/* ══ WHAT I ACHIEVED ═════════════════════════════════════ */}
      <div className="mt-10">
        <motion.div {...fadeUp(0)}>
          <p className="font-mono text-[15px] text-[var(--accent)] tracking-[0.22em] uppercase mb-2">What I Achieved</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-1">
            Impact & <span className="gradient-text">Key Milestones</span>
          </h2>
          <div className="h-0.5 w-14 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full mt-3 mb-10" />
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-10">
          {stats.map(({ Icon, value, label, color }, i) => (
            <motion.div
              key={label}
              {...fadeUp(0.06 + i * 0.06)}
              className="group p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] text-center hover:border-[var(--accent)]/25 hover:shadow-md hover:shadow-[var(--accent)]/5 transition-all duration-300"
            >
              <Icon size={15} className={`${color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-[10px] text-[var(--muted)] mt-0.5 leading-snug">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievement list */}
        <div className="grid sm:grid-cols-2 gap-3">
          {achievements.map((item, i) => (
            <motion.div
              key={item}
              {...fadeLeft(0.08 + i * 0.06)}
              className="flex items-start gap-3 p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)]/20 transition-colors"
            >
              <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[var(--muted)] leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
