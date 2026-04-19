"use client";

import { motion } from "framer-motion";
import { FolderGit2, Link, Terminal } from "lucide-react";
import { profile } from "@/data/portfolio";

const socialLinks = [
  { name: "GitHub", url: profile.links.github, icon: FolderGit2 },
  { name: "LinkedIn", url: profile.links.linkedin, icon: Link },
  { name: "LeetCode", url: profile.links.leetcode, icon: Terminal },
];

export function SocialIcons({ className }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-zinc-300 transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Visit ${link.name} profile`}
          >
            <Icon size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
              {link.name}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
