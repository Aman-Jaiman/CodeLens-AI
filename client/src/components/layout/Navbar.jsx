import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#workflow', label: 'Workflow' },
  { href: '/#stack', label: 'Tech Stack' },
  { href: '/#faq', label: 'FAQ' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onDashboard = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || onDashboard
          ? 'border-b border-line bg-ink/75 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-ink shadow-[0_0_30px_rgba(34,211,238,0.35)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-bright">
            Codex<span className="text-cyan-300">Review</span>
          </span>
        </Link>

        {!onDashboard ? (
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-bright"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : (
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className="text-sm text-muted transition-colors hover:text-bright"
            >
              Home
            </NavLink>
            <span className="text-sm font-semibold text-cyan-300">Workspace</span>
          </nav>
        )}

        <div className="hidden items-center gap-3 md:flex">
          {!onDashboard ? (
            <Link to="/dashboard">
              <Button size="sm">Open Dashboard</Button>
            </Link>
          ) : (
            <Link to="/">
              <Button variant="secondary" size="sm">
                Back to Home
              </Button>
            </Link>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/5 text-bright md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-line bg-ink/95 px-4 py-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {!onDashboard
                ? links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-xl px-3 py-2 text-sm text-soft hover:bg-white/5"
                    >
                      {link.label}
                    </a>
                  ))
                : null}
              <Link to={onDashboard ? '/' : '/dashboard'}>
                <Button className="w-full" size="md">
                  {onDashboard ? 'Back to Home' : 'Open Dashboard'}
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
