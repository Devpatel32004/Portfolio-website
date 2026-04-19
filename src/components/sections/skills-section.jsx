"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups, tools } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, GitBranch, Box, PenTool, Cloud, Wrench } from "lucide-react";

const toolIcons = {
  "VS Code": Terminal,
  "Git": GitBranch,
  "Postman": Box,
  "Figma": PenTool,
  "Vercel": Cloud,
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          title="Skills"
          subtitle="Grouped capabilities that reflect full-stack delivery, engineering fundamentals, and production collaboration."
        />
        
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="group h-full transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        <Badge className="cursor-default transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:border-cyan-300/50 hover:bg-cyan-400/20">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Tools Section */}
        <Reveal delay={0.2}>
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <Wrench size={18} className="text-cyan-300" />
              <h3 className="text-lg font-semibold text-white">Tools & Platforms</h3>
            </div>
            <Card className="transition-all duration-300 hover:border-cyan-300/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {tools.map((tool, index) => {
                  const Icon = toolIcons[tool.name] || Wrench;
                  return (
                    <motion.div
                      key={tool.name}
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-400/5"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 transition-colors duration-300 group-hover:bg-cyan-400/20">
                        <Icon size={20} className="text-cyan-300" />
                      </div>
                      <span className="font-medium text-white">{tool.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
