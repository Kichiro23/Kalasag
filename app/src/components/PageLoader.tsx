import { Shield } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--accent-teal)] border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="w-5 h-5 text-[var(--accent-teal)]" />
        </div>
      </div>
      <p className="text-sm text-[var(--text-secondary)] animate-pulse">
        Loading...
      </p>
    </div>
  );
}
