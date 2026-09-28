"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="font-mono text-sm font-medium tracking-wider"
        >
          <span className="text-[var(--accent)]">{"<"}</span>
          <span className="text-[var(--foreground)]">SJ</span>
          <span className="text-[var(--accent)]">{"/>"}</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    active === id
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                  {active === id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="h-0.5 bg-[var(--accent)] rounded-full mt-0.5"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="md:hidden p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)]"
          >
            <ul className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                return (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active === id
                          ? "text-[var(--accent)] bg-[var(--card-bg)]"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
