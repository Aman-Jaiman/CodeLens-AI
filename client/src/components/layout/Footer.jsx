import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 text-ink">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-bold text-bright">
              Codex<span className="text-cyan-300">Review</span>
            </span>
          </Link>

          <p className="text-xs text-muted">
            Powered by Google Gemini AI Free Tier & Express.
          </p>
        </div>
      </div>
    </footer>
  );
}
