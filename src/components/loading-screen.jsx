"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Terminal } from "lucide-react";

export function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08080b]"
        >
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo/Icon animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 backdrop-blur-sm">
                <Code2 className="h-10 w-10 text-cyan-300" />
              </div>
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl border border-cyan-400/50"
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Dev Patel
              </h1>
              <p className="mt-1 text-sm text-cyan-300/80">
                <Terminal className="mr-1 inline h-4 w-4" />
                Full Stack & Frontend Developer
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64">
              <div className="mb-2 flex justify-between text-xs text-zinc-400">
                <span>Loading...</span>
                <span>{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Loading steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-2 text-xs text-zinc-500"
            >
              {progress < 30 && <span>Initializing...</span>}
              {progress >= 30 && progress < 60 && <span>Loading components...</span>}
              {progress >= 60 && progress < 90 && <span>Preparing content...</span>}
              {progress >= 90 && <span>Ready!</span>}
            </motion.div>
          </div>

          {/* Corner decoration */}
          <div className="absolute bottom-8 left-8 text-xs text-zinc-600">
            <span className="text-cyan-400">&gt;</span> npm run portfolio
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
