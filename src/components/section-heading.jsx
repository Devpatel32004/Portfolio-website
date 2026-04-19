import { cn } from "@/lib/utils";

export function SectionHeading({ title, subtitle, className }) {
  return (
    <div className={cn("mb-6 md:mb-8 max-w-2xl", className)}>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
        Portfolio Section
      </p>
      <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-zinc-300 md:text-base">{subtitle}</p> : null}
    </div>
  );
}
