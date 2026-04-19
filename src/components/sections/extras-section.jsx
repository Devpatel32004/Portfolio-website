"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/portfolio";
import { FolderGit2, Terminal, Link2, Zap, Target, Layers, Cpu, ExternalLink } from "lucide-react";

const strengths = [
  { title: "Full Stack Delivery", icon: Layers },
  { title: "Geospatial & 3D", icon: Target },
  { title: "DSA Foundation", icon: Cpu },
];

const professionalProfiles = [
  { 
    name: "GitHub", 
    url: profile.links.github, 
    icon: FolderGit2, 
    color: "from-zinc-600 to-zinc-500",
    handle: "github.com/Devpatel32004"
  },
  { 
    name: "LinkedIn", 
    url: profile.links.linkedin, 
    icon: Link2, 
    color: "from-blue-600 to-blue-500",
    handle: "linkedin.com/in/devpatelma"
  },
  { 
    name: "LeetCode", 
    url: profile.links.leetcode, 
    icon: Terminal, 
    color: "from-amber-600 to-amber-500",
    handle: "leetcode.com/u/devpatel22"
  },
];

export function ExtrasSection() {
  return (
    <section id="extras" className="py-16 md:py-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          title="Professional Highlights"
          subtitle="Profiles and strengths recruiters can evaluate quickly."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Professional Profiles - All profile links in one place */}
          <Reveal>
            <Card className="h-full transition-all duration-300 hover:border-cyan-300/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
              <div className="mb-4 flex items-center gap-2">
                <Zap size={18} className="text-cyan-300" />
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  Professional Profiles
                </p>
              </div>
              <div className="space-y-3">
                {professionalProfiles.map((prof, index) => {
                  const Icon = prof.icon;
                  return (
                    <motion.a
                      key={prof.name}
                      href={prof.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-400/5"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${prof.color} bg-opacity-20`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{prof.name}</p>
                          <p className="text-xs text-zinc-400">{prof.handle}</p>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-zinc-500 transition-colors group-hover:text-cyan-300" />
                    </motion.a>
                  );
                })}
              </div>
            </Card>
          </Reveal>

          {/* Core Strengths */}
          <Reveal delay={0.1}>
            <Card className="h-full transition-all duration-300 hover:border-cyan-300/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
              <div className="mb-4 flex items-center gap-2">
                <Target size={18} className="text-violet-300" />
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-200">
                  Core Strengths
                </p>
              </div>
              <div className="space-y-3">
                {strengths.map((strength, index) => {
                  const Icon = strength.icon;
                  return (
                    <motion.div
                      key={strength.title}
                      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-violet-300/30 hover:bg-violet-400/5"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: -4 }}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 transition-colors duration-300 group-hover:bg-violet-400/20">
                        <Icon size={24} className="text-violet-300" />
                      </div>
                      <h4 className="font-semibold text-white">{strength.title}</h4>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
