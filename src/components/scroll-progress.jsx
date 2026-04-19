"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const value = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(value);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_24px_rgba(59,130,246,0.8)] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
