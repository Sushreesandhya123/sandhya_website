"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personalInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-[var(--muted)]">
            <span className="text-[var(--accent)]">{"<"}</span>
            <span className="text-[var(--foreground)] font-semibold">SandhyaraniJena</span>
            <span className="text-[var(--accent)]">{" />"}</span>
          </p>
          <p className="text-xs text-[var(--muted)] mt-1">
            Full Stack Developer &bull; Bengaluru, India
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="text-xs text-[var(--muted)] text-center sm:text-right">
          &copy; {new Date().getFullYear()} Sandhyarani Jena. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
