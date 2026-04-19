"use client";

import { useState, useEffect, useRef } from "react";

const FULL_TEXT = "Full Stack & Frontend Developer";
const TYPING_SPEED = 65; // ms per character - exact current speed
const PAUSE_AFTER_TYPING = 1500; // ms
const PAUSE_AFTER_DELETING = 800; // ms

export function Typewriter({ className }) {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing"); // 'typing' | 'pauseAfterTyping' | 'deleting' | 'pauseAfterDeleting'

  // Use ref for timer to ensure proper cleanup
  const timerRef = useRef(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!mounted) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (phase === "typing") {
      if (displayText.length < FULL_TEXT.length) {
        // Type next character
        timerRef.current = setTimeout(() => {
          setDisplayText(FULL_TEXT.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        // Finished typing, pause before deleting
        timerRef.current = setTimeout(() => {
          setPhase("deleting");
        }, PAUSE_AFTER_TYPING);
      }
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        // Delete last character
        timerRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, TYPING_SPEED);
      } else {
        // Finished deleting, pause before typing again
        timerRef.current = setTimeout(() => {
          setPhase("typing");
        }, PAUSE_AFTER_DELETING);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [mounted, displayText, phase]);

  // SSR-safe fallback
  if (!mounted) {
    return (
      <span className={className}>
        {FULL_TEXT}
      </span>
    );
  }

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-cyan-300">|</span>
    </span>
  );
}
