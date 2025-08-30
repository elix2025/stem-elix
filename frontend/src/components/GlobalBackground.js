export default function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800" />
      {/* Teal wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-teal-600/20" />
      {/* Subtle animated blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  );
}
