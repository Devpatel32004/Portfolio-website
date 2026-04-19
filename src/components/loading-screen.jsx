"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sparkles, Zap } from "lucide-react";

const loadingStates = [
  { progress: 0, text: "Initializing Portfolio...", icon: null },
  { progress: 25, text: "Loading Projects...", icon: null },
  { progress: 50, text: "Preparing Experience...", icon: null },
  { progress: 75, text: "Finalizing Skills...", icon: null },
  { progress: 100, text: "Welcome", icon: Sparkles },
];

export function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 600);
          return 100;
        }
        return prev + Math.random() * 12 + 4;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const currentState = useMemo(() => {
    return loadingStates.reduce((prev, curr) => 
      progress >= curr.progress ? curr : prev
    );
  }, [progress]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050508]"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-cyan-500/5 blur-[150px]" />
            <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-violet-500/5 blur-[150px]" />
          </div>

          {/* Tech grid with scanline effect */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(34,211,238,1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Floating particles - client only to prevent hydration mismatch */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-cyan-400/40"
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight
                  }}
                  animate={{ 
                    y: [null, -100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          )}

          {/* Main content container */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Premium Logo */}
            <div className="relative mb-10">
              {/* Outer glow rings */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{ 
                  boxShadow: [
                    "0 0 40px rgba(34,211,238,0.1), inset 0 0 40px rgba(34,211,238,0.05)",
                    "0 0 60px rgba(34,211,238,0.2), inset 0 0 60px rgba(34,211,238,0.1)",
                    "0 0 40px rgba(34,211,238,0.1), inset 0 0 40px rgba(34,211,238,0.05)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Rotating border gradient */}
              <motion.div
                className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ padding: '1px' }}
              >
                <div className="h-full w-full rounded-3xl bg-[#050508]" />
              </motion.div>

              {/* Icon container */}
              <motion.div 
                className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-cyan-500/10 backdrop-blur-sm"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 className="h-12 w-12 text-cyan-300" strokeWidth={1.5} />
                
                {/* Inner sparkle */}
                <motion.div
                  className="absolute -right-1 -top-1"
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="h-5 w-5 text-violet-300" />
                </motion.div>
              </motion.div>

              {/* Orbiting dots */}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-2 w-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                  style={{ transformOrigin: "0 60px" }}
                >
                  <div className="h-full w-full rounded-full bg-cyan-400/60" />
                </motion.div>
              ))}
            </div>

            {/* Typography */}
            <div className="mb-8 text-center">
              <motion.h1 
                className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                  Dev Patel
                </span>
              </motion.h1>
              <motion.p 
                className="text-sm font-medium tracking-wide text-cyan-400/80 sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Full Stack & Frontend Developer
              </motion.p>
            </div>

            {/* Premium Progress Indicator */}
            <div className="w-72 sm:w-80">
              {/* Progress bar container */}
              <div className="relative mb-3 overflow-hidden rounded-full bg-zinc-900/80 p-[2px]">
                {/* Glow track */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 opacity-50" />
                
                {/* Progress fill */}
                <div className="relative h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 via-violet-300 to-violet-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Status row */}
              <div className="flex items-center justify-between px-1">
                <motion.div 
                  className="flex items-center gap-2 text-xs text-zinc-400"
                  key={currentState.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentState.icon && <currentState.icon className="h-3.5 w-3.5 text-cyan-400" />}
                  <span className="font-mono">{currentState.text}</span>
                </motion.div>
                
                <span className="font-mono text-xs text-zinc-500">
                  {Math.min(Math.round(progress), 100).toString().padStart(2, '0')}%
                </span>
              </div>
            </div>

            {/* Tech badges */}
            <motion.div 
              className="mt-8 flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {["React", "Next.js", "TypeScript"].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-500 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Corner accents */}
          <div className="absolute bottom-6 left-6 text-xs font-mono text-zinc-700">
            <motion.span 
              className="text-cyan-500/50"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ●
            </motion.span>
            <span className="ml-2">system.ready</span>
          </div>
          
          <div className="absolute bottom-6 right-6 text-xs font-mono text-zinc-700">
            v2.0.26
          </div>

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
