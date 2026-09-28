"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Home, User, Briefcase, FolderOpen, Code2, Mail, MessageCircle, Menu, X,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Img from "@/app/assets/sandhyapf.jpg";
const navLinks = [
  { label: "Home",       href: "home",       Icon: Home },
  { label: "About",      href: "about",      Icon: User },
  { label: "Experience", href: "experience", Icon: Briefcase },
  { label: "Projects",   href: "projects",   Icon: FolderOpen },
  { label: "Skills",     href: "skills",     Icon: Code2 },
  { label: "Contact",    href: "contact",    Icon: Mail },
];

function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="w-20 h-20 rounded-full border-2 border-[var(--accent)] overflow-hidden bg-[var(--card-bg)] flex items-center justify-center flex-shrink-0">
      {imgError ? (
        <span className="text-xl font-bold gradient-text">SJ</span>
      ) : (
        <Image
          src={Img}
          alt="Sandhyarani Jena"
          width={80}
          height={80}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          priority
        />
      )}
    </div>
  );
}

function SidebarContent({
  active,
  scrollTo,
}: {
  active: string;
  scrollTo: (id: string) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Profile */}
      <div className="flex flex-col items-center pt-8 pb-6 px-6">
        <ProfilePhoto />
        <h2 className="mt-3 font-bold text-[var(--foreground)] text-base tracking-tight">
          Sandhya
        </h2>
        <p className="text-[var(--muted)] text-xs font-mono mt-0.5">@sandhya_dev</p>
        <div className="mt-3">
          <ThemeToggle />
        </div>
      </div>

      <div className="h-px bg-[var(--border)] mx-6" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navLinks.map(({ label, href, Icon }) => {
          const isActive = active === href;
          return (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent)]/20"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span>{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="h-px bg-[var(--border)] mx-6" />

      {/* Bottom */}
      <div className="p-5 space-y-3">
        <button
          onClick={() => scrollTo("contact")}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-[var(--muted)] text-sm font-medium hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
        >
          <MessageCircle size={14} />
          Let&apos;s Talk
        </button>
        <p className="text-center text-xs text-[var(--muted)]">
          © 2025 Sandhyarani Jena
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-72 bg-[var(--sidebar-bg)] border-r border-[var(--border)] z-50 overflow-hidden">
        <SidebarContent active={active} scrollTo={scrollTo} />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-[var(--sidebar-bg)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors shadow-lg"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-[var(--sidebar-bg)] border-r border-[var(--border)] z-50 overflow-hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              <SidebarContent active={active} scrollTo={scrollTo} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
