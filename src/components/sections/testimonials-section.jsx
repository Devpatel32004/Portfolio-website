"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { achievements, education } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { GraduationCap, Trophy, Briefcase, Rocket } from "lucide-react";

const achievementIcons = {
  trophy: Trophy,
  briefcase: Briefcase,
  rocket: Rocket,
};

export function TestimonialsSection() {
  return (
    <section id="education" className="py-16 md:py-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          title="Education & Achievements"
          subtitle="Academic foundation and measurable milestones that support delivery credibility."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {/* Education Card */}
          <Reveal>
            <Card className="h-full transition-all duration-300 hover:border-cyan-300/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-cyan-300" />
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  Education
                </p>
              </div>
              <div className="space-y-4">
                {education.map((item, index) => (
                  <motion.div
                    key={item.degree}
                    className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-400/5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <p className="font-semibold text-white">{item.degree}</p>
                    <p className="mt-1 text-sm text-zinc-300">{item.institute}</p>
                    <Badge className="mt-3 transition-all duration-200 group-hover:border-cyan-300/50 group-hover:bg-cyan-400/20">
                      {item.duration}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Reveal>

          {/* Achievements Card */}
          <Reveal delay={0.1}>
            <Card className="h-full transition-all duration-300 hover:border-cyan-300/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
              <div className="mb-4 flex items-center gap-2">
                <Trophy size={18} className="text-amber-300" />
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-200">
                  Achievements
                </p>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievementIcons[achievement.icon] || Trophy;
                  return (
                    <motion.div
                      key={achievement.title}
                      className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-amber-300/30 hover:bg-amber-400/5"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: -4 }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 transition-colors duration-300 group-hover:bg-amber-400/20">
                        <Icon size={18} className="text-amber-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{achievement.title}</p>
                        <p className="text-sm text-zinc-400">{achievement.subtitle}</p>
                      </div>
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
