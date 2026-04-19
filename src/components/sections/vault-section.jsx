"use client";

import { motion } from "framer-motion";
import { ExternalLink, FolderLock, FileText, Award, FolderGit2, Briefcase, Shield, Clock } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/portfolio";

const vaultItems = [
  { label: "Resume Versions", icon: FileText },
  { label: "Certificates", icon: Award },
  { label: "Projects", icon: FolderGit2 },
  { label: "Work Samples", icon: Briefcase },
];

export function VaultSection() {
  return (
    <section id="vault" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          title="Recruiter Vault"
          subtitle="Resumes, Certificates, Projects & Work Samples"
        />
        <Reveal>
          <Card className="relative overflow-hidden border-cyan-300/20 bg-gradient-to-r from-cyan-500/10 to-violet-500/10">
            {/* Animated gradient background */}
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-30"
              style={{
                background: "linear-gradient(45deg, rgba(56,189,248,0.3), rgba(139,92,246,0.3), rgba(56,189,248,0.3))",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                    <FolderLock size={14} />
                    Secure Access
                  </p>
                  
                  {/* Verified Documents Badge */}
                  <Badge className="border-emerald-300/30 bg-emerald-400/10 text-emerald-200">
                    <Shield size={12} className="mr-1" />
                    Verified Documents
                  </Badge>
                </div>
                
                <div className="grid gap-3 text-zinc-200 sm:grid-cols-2">
                  {vaultItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-400/5"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10">
                          <Icon size={16} className="text-cyan-300" />
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  <p className="inline-flex items-center gap-1.5">
                    <Clock size={14} />
                    Updated regularly for recruiter review
                  </p>
                </div>
              </div>
              
              <motion.a
                href={profile.resumeVaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                {/* Animated gradient glow effect on button */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 opacity-70 blur-lg"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                <Button size="default" className="relative sm:h-11 sm:px-6">
                  Open Recruiter Vault <ExternalLink size={16} className="ml-2" />
                </Button>
              </motion.a>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
