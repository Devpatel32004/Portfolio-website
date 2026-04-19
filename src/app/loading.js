export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070a]">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />
        <p className="mt-4 text-sm uppercase tracking-[0.25em] text-cyan-200">
          Loading Portfolio
        </p>
      </div>
    </div>
  );
}
