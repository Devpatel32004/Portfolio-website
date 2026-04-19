"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { skills } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { profile } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          title="About Me"
          subtitle="Professional summary and technical capabilities."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="transition-all duration-300 hover:border-cyan-300/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Professional Summary
              </h3>
              <p className="leading-7 text-zinc-300">
                {profile.objective} I am currently focused on shipping
                recruiter-ready products that combine polished interfaces with
                practical engineering outcomes.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="transition-all duration-300 hover:border-cyan-300/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge className="cursor-default transition-all duration-200 hover:border-cyan-300/50 hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
