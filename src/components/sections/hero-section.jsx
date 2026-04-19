"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Mail, Sparkles, Rocket, FolderKanban, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import { Typewriter } from "@/components/typewriter";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="mesh-gradient h-full w-full" />
      </div>
      
      {/* Animated background glow */}
      <motion.div
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-violet-500/20 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="mx-auto grid w-[min(1100px,95%)] gap-8 py-16 md:gap-12 md:py-20 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Open to Work Badge */}
          <motion.p
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs uppercase tracking-[0.15em] text-emerald-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            Open to Work
          </motion.p>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          
          {/* Animated typing effect for roles */}
          <div className="mt-3 flex items-center gap-3">
            <Typewriter className="text-xl font-medium text-cyan-200" />
          </div>

          {/* Currently Building Badge */}
          <motion.p
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1 text-xs text-violet-200"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Rocket size={12} />
            Currently Building AI & Full Stack Products
          </motion.p>

          <p className="mt-5 max-w-xl text-zinc-300">
            {profile.objective}
          </p>
          
          <motion.p
            className="mt-6 text-sm text-cyan-200"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            Crafting premium digital products with performance-first engineering.
          </motion.p>

          {/* CTA Buttons with hierarchy - responsive sizing */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <a href="#projects">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="default" className="shadow-[0_0_30px_rgba(56,189,248,0.35)] sm:h-11 sm:px-6">
                  <FolderKanban size={16} className="mr-2" />
                  View Projects
                </Button>
              </motion.div>
            </a>
            <a
              href={profile.resumeVaultUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="default" className="sm:h-11 sm:px-6">
                  <ExternalLink size={16} className="mr-2" />
                  View Resume
                </Button>
              </motion.div>
            </a>
            <a href="#contact">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="default" className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 sm:h-11 sm:px-6">
                  <Mail size={16} className="mr-2" />
                  Contact Me
                </Button>
              </motion.div>
            </a>
          </div>

        </motion.div>

        {/* Profile Image with floating animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto w-full max-w-sm"
        >
          <motion.div
            className="relative rounded-3xl border border-white/15 bg-white/5 p-3 shadow-[0_0_80px_rgba(56,189,248,0.25)] backdrop-blur-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glow effect behind image */}
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 blur-2xl" />
            
            <Image
              src="/profile.png"
              alt="Developer portrait"
              width={700}
              height={1000}
              className="h-[460px] w-full rounded-2xl object-cover"
              priority
            />
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -right-3 -top-3 h-20 w-20 rounded-full border border-cyan-300/30 bg-cyan-400/10 p-3 backdrop-blur-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Code2 size={24} className="text-cyan-300" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-2 rounded-xl border border-violet-300/30 bg-violet-400/10 px-3 py-2 backdrop-blur-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-xs font-medium text-violet-200">Full Stack Developer</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
