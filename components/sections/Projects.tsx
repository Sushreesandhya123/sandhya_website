"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/lib/data";
import GoCarriageImg  from "@/app/assets/Gocarriage.jpg";
import CiviQImg       from "@/app/assets/civiq.jpg";
import GurukulImg     from "@/app/assets/gurukul.jpg";
import JuvvaltechImg from "@/app/assets/juvvaltech.png";
import KilimbImg from "@/app/assets/kilimb.png";
import dashboardImg from "@/app/assets/dashboard.png";
import doctorImg from "@/app/assets/doctor.png";

const projectImages: Record<number, StaticImageData> = {
  1: GoCarriageImg,
  2: CiviQImg,
  3: GurukulImg,
  4:JuvvaltechImg,
  5: KilimbImg,
  6: dashboardImg,
  7: doctorImg,
};

// Per-project accent palette
const projectAccent: Record<number, {
  color: string; border: string; badgeBg: string; badgeText: string; glow: string; tagBg: string; tagBorder: string; tagText: string;
}> = {
  1: { color: "text-amber-500",   border: "hover:border-amber-400/50",   badgeBg: "bg-amber-500/10",   badgeText: "text-amber-500",   glow: "hover:shadow-amber-400/10",   tagBg: "bg-amber-500/8",   tagBorder: "border-amber-400/25",   tagText: "text-amber-600 dark:text-amber-400" },
  2: { color: "text-teal-500",    border: "hover:border-teal-400/50",    badgeBg: "bg-teal-500/10",    badgeText: "text-teal-500",    glow: "hover:shadow-teal-400/10",    tagBg: "bg-teal-500/8",    tagBorder: "border-teal-400/25",    tagText: "text-teal-600 dark:text-teal-400" },
  3: { color: "text-violet-500",  border: "hover:border-violet-400/50",  badgeBg: "bg-violet-500/10",  badgeText: "text-violet-500",  glow: "hover:shadow-violet-400/10",  tagBg: "bg-violet-500/8",  tagBorder: "border-violet-400/25",  tagText: "text-violet-600 dark:text-violet-400" },
  4: { color: "text-sky-500",     border: "hover:border-sky-400/50",     badgeBg: "bg-sky-500/10",     badgeText: "text-sky-500",     glow: "hover:shadow-sky-400/10",     tagBg: "bg-sky-500/8",     tagBorder: "border-sky-400/25",     tagText: "text-sky-600 dark:text-sky-400" },
  5: { color: "text-green-500",   border: "hover:border-green-400/50",   badgeBg: "bg-green-500/10",   badgeText: "text-green-500",   glow: "hover:shadow-green-400/10",   tagBg: "bg-green-500/8",   tagBorder: "border-green-400/25",   tagText: "text-green-600 dark:text-green-400" },
  6: { color: "text-blue-500",    border: "hover:border-blue-400/50",    badgeBg: "bg-blue-500/10",    badgeText: "text-blue-500",    glow: "hover:shadow-blue-400/10",    tagBg: "bg-blue-500/8",    tagBorder: "border-blue-400/25",    tagText: "text-blue-600 dark:text-blue-400" },
  7: { color: "text-rose-500",    border: "hover:border-rose-400/50",    badgeBg: "bg-rose-500/10",    badgeText: "text-rose-500",    glow: "hover:shadow-rose-400/10",    tagBg: "bg-rose-500/8",    tagBorder: "border-rose-400/25",    tagText: "text-rose-600 dark:text-rose-400" },
};

const categories = ["All", "Full Stack", "Frontend"];

function ProjectCard({ project, index, inView }: {
  project: typeof projects[0];
  index: number;
  inView: boolean;
}) {
  const img = projectImages[project.id];
  const accent = projectAccent[project.id] ?? {
    color: "text-[var(--accent)]", border: "hover:border-[var(--accent)]/40",
    badgeBg: "bg-[var(--accent)]/10", badgeText: "text-[var(--accent)]",
    glow: "hover:shadow-[var(--accent)]/10", tagBg: "", tagBorder: "border-[var(--border)]", tagText: "text-[var(--muted)]",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden ${accent.border} hover:shadow-2xl ${accent.glow} transition-all duration-300`}
    >
      {/* ── Accent top bar ── */}
      <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]`} />

      {/* ── Image banner ── */}
      <div className="relative h-44 overflow-hidden bg-[var(--background)] shrink-0">
        {img ? (
          <Image
            src={img}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 ${accent.badgeBg}`} />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-[var(--card-bg)]/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {project.highlight ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent)]/90 text-[#0a0f1e] text-[10px] font-bold backdrop-blur-sm">
              <Star size={10} className="fill-current" /> Featured
            </span>
          ) : <span />}
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono backdrop-blur-sm border ${accent.badgeBg} ${accent.tagBorder} ${accent.badgeText}`}>
            {project.category}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Number + Title */}
        <div className="flex items-start gap-2">
          <span className={`text-[11px] font-mono font-bold mt-0.5 ${accent.color} opacity-60`}>
            {String(project.id).padStart(2, "0")}
          </span>
          <h3 className={`text-base font-bold text-[var(--foreground)] group-hover:${accent.color} transition-colors leading-snug`}>
            {project.title}
          </h3>
        </div>

        <p className="text-[13px] text-[var(--muted)] leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-md border ${accent.tagBorder} ${accent.tagText} bg-transparent`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-3 border-t border-[var(--border)]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 text-xs font-medium ${accent.color} hover:opacity-80 transition-opacity`}
            >
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <GithubIcon size={12} /> GitHub
            </a>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <span className="text-[11px] text-[var(--muted)] italic">Private / In Development</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p className="font-mono text-[15px] text-[var(--accent)] tracking-[0.22em] uppercase mb-2">
            What I&apos;ve Built
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-1">
            Projects & <span className="gradient-text">Work Showcase</span>
          </h2>
          <div className="h-0.5 w-14 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full mt-3" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[var(--accent)] text-[#0a0f1e] border-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
