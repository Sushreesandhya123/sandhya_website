"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/lib/data";

// skillicons.dev slug map — only skills that have an icon
const iconSlug: Record<string, string> = {
  "React.js":       "react",
  "Next.js":        "nextjs",
  "JavaScript":     "js",
  "TypeScript":     "ts",
  "Tailwind CSS":   "tailwind",
  "Redux":          "redux",
  "HTML5":          "html",
  "CSS3":           "css",
  "Bootstrap":      "bootstrap",
  "Python":         "python",
  "FastAPI":        "fastapi",
  "Django":         "django",
  "Node.js":        "nodejs",
  "PHP":            "php",
  "Laravel":        "laravel",
  "Firebase":       "firebase",
  "MySQL":          "mysql",
  "Git":            "git",
  "GitHub":         "github",
  "Postman":        "postman",
  "Azure App Services": "azure",
  "AWS S3":         "aws",
  "Zustand":        "react",   // closest visual match
};

const categoryMeta: Record<string, { color: string; dot: string }> = {
  "Frontend & UI":            { color: "text-amber-400",  dot: "bg-amber-400"  },
  "Backend & Databases":      { color: "text-teal-400",   dot: "bg-teal-400"   },
  "Cloud, Tools & Practices": { color: "text-violet-400", dot: "bg-violet-400" },
};

type SkillItem = { name: string; slug?: string; dot: string; color: string };

const allSkills: SkillItem[] = Object.entries(skills).flatMap(([cat, items]) =>
  items.map((name) => ({
    name,
    slug: iconSlug[name],
    dot:  categoryMeta[cat]?.dot   ?? "bg-[var(--muted)]",
    color: categoryMeta[cat]?.color ?? "text-[var(--muted)]",
  }))
);

const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const row2 = allSkills.slice(Math.ceil(allSkills.length / 2));

function SkillCard({ skill }: { skill: SkillItem }) {
  const iconUrl = skill.slug
    ? `https://skillicons.dev/icons?i=${skill.slug}&theme=dark`
    : null;

  return (
    <div className="flex flex-col items-center justify-center gap-2.5 w-[110px] h-[118px] rounded-2xl bg-[var(--background)] border border-[var(--border)] mx-2 shrink-0 hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-300 cursor-default group">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center">
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt={skill.name}
            width={48}
            height={48}
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className={`w-12 h-12 rounded-xl ${skill.dot} bg-opacity-20 flex items-center justify-center`}>
            <span className={`text-sm font-bold font-mono ${skill.color}`}>
              {skill.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      {/* Name */}
      <span className="text-[11px] text-[var(--muted)] text-center leading-tight px-2 font-medium group-hover:text-[var(--foreground)] transition-colors">
        {skill.name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: SkillItem[]; direction: "ltr" | "rtl" }) {
  const cls = direction === "ltr" ? "animate-marquee-ltr" : "animate-marquee-rtl";
  return (
    <div className="marquee-track overflow-hidden w-full py-1">
      <div className={`flex w-max ${cls}`}>
        {[...items, ...items].map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-20 bg-[var(--card-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="font-mono text-[15px] text-[var(--accent)] tracking-[0.22em] uppercase mb-2">
            Tech Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-1">
            Tools I <span className="gradient-text">Work With</span>
          </h2>
          <div className="h-0.5 w-14 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full mt-3 mb-8" />

          {/* Legend */}
          <div className="flex flex-wrap gap-5">
            {Object.entries(categoryMeta).map(([cat, { dot, color }]) => (
              <span key={cat} className="inline-flex items-center gap-2 text-[12px] text-[var(--muted)]">
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                <span className={color}>{cat}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative space-y-4"
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[var(--card-bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[var(--card-bg)] to-transparent" />

          <MarqueeRow items={row1} direction="ltr" />
          <MarqueeRow items={row2} direction="rtl" />
        </motion.div>

      </div>
    </section>
  );
}
