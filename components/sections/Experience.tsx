"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, ArrowRight, Briefcase, TrendingUp, ChevronDown } from "lucide-react";
import { experiences } from "@/lib/data";

const companyAccent: Record<string, { color: string; bg: string; border: string; initials: string }> = {
  "Zebraffe Technologies Ltd.": {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/25",
    initials: "ZTL",
  },
  "AlongX Software Solutions": {
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    border: "border-teal-400/25",
    initials: "AX",
  },
};

type Meta = { color: string; bg: string; border: string; initials: string };
type Exp = typeof import("@/lib/data").experiences[number];

function ExperienceCard({ exp, meta, i, inView }: { exp: Exp; meta: Meta; i: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + i * 0.15 }}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--background)] overflow-hidden hover:border-[var(--accent)]/30 hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all duration-300"
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]" />

      <div className="p-6 sm:p-8">
        {/* ── Header: avatar + title + meta ── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
          <div className={`w-14 h-14 rounded-2xl border ${meta.border} ${meta.bg} flex items-center justify-center shrink-0`}>
            <span className={`font-bold text-sm font-mono ${meta.color}`}>{meta.initials}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5 mb-1">
              <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {exp.role}
              </h3>
              {exp.current && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <p className={`font-semibold text-sm ${meta.color}`}>{exp.company}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[var(--muted)] text-[12px]">
              <span className="inline-flex items-center gap-1"><MapPin size={11} /> {exp.location}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
              <span className="inline-flex items-center gap-1"><Calendar size={11} /> {exp.period}</span>
            </div>
          </div>

          <div className={`hidden sm:flex items-center gap-1.5 self-start px-3 py-1.5 rounded-xl border ${meta.border} ${meta.bg}`}>
            <Briefcase size={12} className={meta.color} />
            <span className={`text-[11px] font-mono ${meta.color}`}>{exp.current ? "Present" : "2 yrs"}</span>
          </div>
        </div>

        {/* ── Collapsible toggle row ── */}
        <div className="border-t border-[var(--border)] pt-4">
          <button
            onClick={() => setOpen((v) => !v)}
            className={`w-full flex items-center gap-2 text-[12px] font-mono font-semibold tracking-wider uppercase transition-colors ${open ? meta.color : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <TrendingUp size={13} />
            Key Contributions &amp; Tech Stack
            <ChevronDown
              size={14}
              className={`ml-auto transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Key Contributions */}
                <ul className="mt-5 space-y-2.5 mb-6">
                  {exp.highlights.map((h, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: idx * 0.04 }}
                      className="flex items-start gap-2.5 text-[13px] text-[var(--muted)] leading-relaxed"
                    >
                      <ArrowRight size={13} className={`${meta.color} mt-0.5 shrink-0`} />
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="border-t border-[var(--border)] pt-4">
                  <p className="text-[11px] font-mono text-[var(--muted)] tracking-wider uppercase mb-2.5">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="pt-10 pb-20 bg-[var(--card-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="font-mono text-[15px] text-[var(--accent)] tracking-[0.22em] uppercase mb-2">
            Work History
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-1">
            Where I&apos;ve <span className="gradient-text">Built Things</span>
          </h2>
          <div className="h-0.5 w-14 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full mt-3" />
        </motion.div>

        {/* ── Cards ──────────────────────────────────── */}
        <div className="space-y-6">
          {experiences.map((exp, i) => {
            const meta = companyAccent[exp.company] ?? {
              color: "text-[var(--accent)]",
              bg: "bg-[var(--accent)]/10",
              border: "border-[var(--accent)]/25",
              initials: exp.company.slice(0, 2).toUpperCase(),
            };

            return (
              <ExperienceCard key={exp.id} exp={exp} meta={meta} i={i} inView={inView} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
