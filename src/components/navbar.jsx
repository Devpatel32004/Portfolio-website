"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: "-80px 0px -60% 0px" // Account for sticky header + trigger earlier
      }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header 
      className="sticky top-4 z-40 mx-auto w-[min(1100px,95%)] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="#hero"
            className="bg-linear-to-r from-cyan-300 to-violet-400 bg-clip-text text-lg font-bold text-transparent"
          >
            Dev Portfolio
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              ref={(el) => { navRefs.current[item.id] = el; }}
              className={cn(
                "relative rounded-xl px-3 py-2 text-sm text-zinc-300 transition-colors duration-300 hover:text-cyan-200",
                activeSection === item.id && "text-cyan-200"
              )}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator with gradient glow */}
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20"
                  layoutId="activeNav"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-md" />
                </motion.div>
              )}
              
              {/* Hover glow effect */}
              {hoveredItem === item.id && activeSection !== item.id && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-xl bg-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              
              {item.label}
            </motion.a>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mt-3 grid gap-1 border-t border-white/10 pt-3 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => {
                  // Step 1: Immediately set active state
                  setActiveSection(item.id);
                  // Step 2: Close menu (triggers smooth exit animation)
                  setMenuOpen(false);
                  // Step 3: After menu closes, scroll to section
                  setTimeout(() => {
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }, 200); // Match menu close animation duration
                }}
                className={cn(
                  "w-full text-left rounded-xl px-3 py-2 text-sm text-zinc-300 transition-all duration-300",
                  activeSection === item.id 
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-200" 
                    : "hover:bg-cyan-300/10 hover:text-cyan-200"
                )}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
