export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-[min(1100px,95%)] flex-col justify-between gap-3 text-sm text-zinc-400 md:flex-row">
        <p>© {new Date().getFullYear()} Dev Patel. All rights reserved.</p>
        <p>Built with Next.js, Tailwind CSS, Framer Motion, and shadcn/ui style.</p>
      </div>
    </footer>
  );
}
