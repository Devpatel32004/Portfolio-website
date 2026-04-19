"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Dialog({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl rounded-2xl border border-white/15 bg-zinc-950 p-6 shadow-[0_0_50px_rgba(56,189,248,0.25)]"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-zinc-300 transition hover:bg-white/10"
                aria-label="Close case study"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
