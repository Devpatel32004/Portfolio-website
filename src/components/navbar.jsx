"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Unified scroll function for desktop and mobile
  const scrollToSection = useCallback((sectionId) => {
    // Flag to disable observer during programmatic scroll
    isProgrammaticScroll.current = true;
    
    // Update active state immediately
    setActiveSection(sectionId);
    
    // Update URL hash without triggering scroll
    window.history.replaceState(null, null, `#${sectionId}`);
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Re-enable observer after scroll completes
    // Average smooth scroll duration is ~500-800ms
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000);
  }, []);

  // IntersectionObserver for scroll spy (manual scrolling)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if we're in a programmatic scroll
        if (isProgrammaticScroll.current) return;
        
        // Find the most visible section
        let bestEntry = null;
        let bestRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        });
        
        if (bestEntry) {
          setActiveSection(bestEntry.target.id);
          // Update URL hash to match
          window.history.replaceState(null, null, `#${bestEntry.target.id}`);
        }
      },
      { 
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: "-70px 0px -40% 0px"
      }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && navItems.some(item => item.id === hash)) {
      setActiveSection(hash);
      // Small delay to let page settle before scrolling
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    }
  }, []);

  // Handle mobile navigation
  const handleMobileNavClick = useCallback((sectionId) => {
    // Step 1: Set active state immediately
    setActiveSection(sectionId);
    
    // Step 2: Close menu (smooth animation)
    setMenuOpen(false);
    
    // Step 3: After menu closes, scroll
    setTimeout(() => {
      isProgrammaticScroll.current = true;
      window.history.replaceState(null, null, `#${sectionId}`);
      
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
    }, 250); // Match menu close animation
  }, []);

  return (
    <motion.header 
      className="sticky top-4 z-40 mx-auto w-[min(1100px,95%)] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => scrollToSection("hero")}
          className="bg-linear-to-r from-cyan-300 to-violet-400 bg-clip-text text-lg font-bold text-transparent"
        >
          Dev Portfolio
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative rounded-xl px-3 py-2 text-sm text-zinc-300 transition-colors duration-300 hover:text-cyan-200",
                activeSection === item.id && "text-cyan-200"
              )}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
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
            </motion.button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
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

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mt-3 grid gap-1 border-t border-white/10 pt-3 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => handleMobileNavClick(item.id)}
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
