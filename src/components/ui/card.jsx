import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(99,102,241,0.12)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
