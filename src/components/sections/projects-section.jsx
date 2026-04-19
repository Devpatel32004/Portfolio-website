"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Expand, FolderGit2, Search, FileText, Info } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { projects } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

const categories = ["All", ...new Set(projects.map((project) => project.category))];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [descriptionProject, setDescriptionProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const needle = query.toLowerCase();
      const matchesQuery =
        project.title.toLowerCase().includes(needle) ||
        project.description.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const activeLightboxProject =
    lightboxIndex === null ? null : filteredProjects[lightboxIndex];

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e) => {
    if (lightboxIndex === null) return;
    
    if (e.key === "Escape") {
      setLightboxIndex(null);
    } else if (e.key === "ArrowLeft") {
      setLightboxIndex((prev) =>
        prev === null ? 0 : (prev - 1 + filteredProjects.length) % filteredProjects.length
      );
    } else if (e.key === "ArrowRight") {
      setLightboxIndex((prev) =>
        prev === null ? 0 : (prev + 1) % filteredProjects.length
      );
    }
  }, [lightboxIndex, filteredProjects.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);


  return (
    <section id="projects" className="py-16 md:py-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          title="Featured Projects"
          subtitle="Impact-first product work with clear outcomes, stacks, and recruiter-friendly call-to-actions."
        />
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-2xl border px-4 py-2 text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "border-cyan-300/60 bg-cyan-400/20 text-cyan-100 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                    : "border-white/15 text-zinc-300 hover:border-cyan-300/40 hover:bg-cyan-400/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-3.5 text-zinc-500"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05}>
              <motion.div
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ 
                  y: -8,
                  rotateX: 2,
                  rotateY: hoveredProject === project.title ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="group h-full overflow-hidden p-0 transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]">
                  <div className="relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={900}
                      height={500}
                      className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#09090f] via-transparent to-transparent" />
                    
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <p className="rounded-full border border-cyan-200/40 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cyan-100 backdrop-blur-sm">
                        {project.category}
                      </p>
                    </div>
                      
                      
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        className="absolute bottom-4 right-4 rounded-full border border-white/25 bg-black/45 p-2 text-white transition-all duration-300 hover:scale-110 hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:text-cyan-100"
                        aria-label={`Open ${project.title} image preview`}
                      >
                        <Expand size={16} />
                      </button>
                    </div>
                    <div className="space-y-4 p-5">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <p className="text-sm leading-6 text-zinc-300">{project.description}</p>
                      </div>
                      
                      
                      <div className="flex min-h-14 flex-wrap gap-2">
                        {project.stack.map((tech, i) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Badge className="transition-all duration-200 hover:border-cyan-300/50 hover:bg-cyan-400/20">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Action Buttons - Consistent grouped styling */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="h-9 px-3 text-sm sm:h-10 sm:px-4 border-zinc-700 bg-zinc-900/50 hover:border-cyan-300/50 hover:bg-cyan-400/10"
                          >
                            <FolderGit2 size={15} className="mr-2 text-zinc-400" />
                            <span className="text-zinc-200">GitHub</span>
                          </Button>
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="h-9 px-3 text-sm sm:h-10 sm:px-4 border-zinc-700 bg-zinc-900/50 hover:border-cyan-300/50 hover:bg-cyan-400/10"
                          >
                            <ExternalLink size={15} className="mr-2 text-zinc-400" />
                            <span className="text-zinc-200">Live Link</span>
                          </Button>
                        </motion.a>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={() => setDescriptionProject(project)}
                            variant="outline"
                            className="h-9 px-3 text-sm sm:h-10 sm:px-4 border-zinc-700 bg-zinc-900/50 hover:border-cyan-300/50 hover:bg-cyan-400/10"
                          >
                            <Info size={15} className="mr-2 text-zinc-400" />
                            <span className="text-zinc-200">Description</span>
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={() => setSelectedProject(project)}
                            className="h-9 px-3 text-sm sm:h-10 sm:px-4 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 shadow-lg shadow-cyan-500/20"
                          >
                            <FileText size={15} className="mr-2" />
                            <span>Impact Notes</span>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Reveal>
          ))}
        </div>
        
        {filteredProjects.length === 0 ? (
          <motion.p 
            className="mt-6 text-sm text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No matching projects found. Try another keyword or category.
          </motion.p>
        ) : null}
      </div>

      {/* Case Study Dialog */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ? `${selectedProject.title} — Impact Notes` : ""}
      >
        <div className="space-y-4">
          <p className="text-zinc-300">{selectedProject?.caseStudy}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedProject?.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </Dialog>

      {/* Enhanced Image Modal with Keyboard Navigation */}
      <Dialog
        open={Boolean(activeLightboxProject)}
        onClose={() => setLightboxIndex(null)}
        title={activeLightboxProject?.title ? `${activeLightboxProject.title} Preview` : ""}
      >
        {activeLightboxProject ? (
          <div className="space-y-4">
            <motion.div 
              className="relative overflow-hidden rounded-xl border border-white/15 bg-black/40"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={activeLightboxProject.image}
                alt={`${activeLightboxProject.title} full preview`}
                width={1400}
                height={800}
                className="max-h-[72vh] w-full object-contain"
                priority
              />
            </motion.div>
            
            <div className="flex items-center justify-between gap-3">
              <motion.button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === null
                      ? 0
                      : (prev - 1 + filteredProjects.length) % filteredProjects.length
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition-all duration-200 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous</span>
              </motion.button>
              
              <div className="text-center">
                <p className="text-sm text-zinc-400">
                  {lightboxIndex + 1} / {filteredProjects.length}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Use ← → arrows or ESC
                </p>
              </div>
              
              <motion.button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === null ? 0 : (prev + 1) % filteredProjects.length
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition-all duration-200 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        ) : null}
      </Dialog>

      {/* Description Dialog */}
      <Dialog
        open={Boolean(descriptionProject)}
        onClose={() => setDescriptionProject(null)}
        title={descriptionProject?.title ? `${descriptionProject.title} — Description` : ""}
      >
        <div className="space-y-4">
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <ul className="space-y-3">
              {descriptionProject?.longDescription?.map((bullet, index) => (
                <li key={index} className="flex gap-3 text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
            {descriptionProject?.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </Dialog>
    </section>
  );
}
