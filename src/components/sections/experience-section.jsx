"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experience } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, TrendingUp, MapPin, Clock } from "lucide-react";

export function ExperienceSection() {
  const [expandedJob, setExpandedJob] = useState(null);

  return (
    <section id="experience" className="py-16 md:py-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          title="Experience Timeline"
          subtitle="Internship journey focused on shipping scalable, high-impact product features."
        />
        <div className="relative ml-2 border-l border-cyan-200/20 pl-7 before:absolute before:inset-y-0 before:-left-px before:w-px before:bg-linear-to-b before:from-cyan-300/70 before:via-violet-400/40 before:to-transparent">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 0.08}>
              <div className="relative mb-8">
                <span className="absolute -left-[35px] top-3 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.95)]" />
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {job.role}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-300">
                        <span>{job.company}</span>
                        <span className="text-zinc-600">|</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} /> {job.location}
                        </span>
                      </div>
                    </div>
                    <p className="inline-flex items-center gap-1 text-sm text-cyan-200">
                      <Clock size={12} /> {job.duration}
                    </p>
                  </div>

                  {/* Impact Metrics */}
                  {job.impact && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {job.impact.map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2"
                        >
                          <TrendingUp size={14} className="text-emerald-300" />
                          <span className="text-sm font-medium text-emerald-200">
                            {item.value} {item.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                    {job.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Expandable Responsibilities Accordion */}
                  {job.responsibilities && (
                    <div className="mt-4">
                      <button
                        onClick={() => setExpandedJob(expandedJob === job.company ? null : job.company)}
                        className="flex items-center gap-2 text-sm font-medium text-cyan-200 transition-colors hover:text-cyan-100"
                      >
                        <span>View Responsibilities</span>
                        <motion.span
                          animate={{ rotate: expandedJob === job.company ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>
                      
                      <AnimatePresence>
                        {expandedJob === job.company && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                              <h4 className="mb-3 text-sm font-semibold text-white">Key Responsibilities</h4>
                              <ul className="space-y-2 text-sm text-zinc-300">
                                {job.responsibilities.map((resp) => (
                                  <li key={resp} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <Badge key={tech} className="transition-all duration-200 hover:scale-105 hover:border-cyan-300/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
