import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none rounded-2xl active:scale-[0.98]';

  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-400 to-emerald-400 text-ink font-semibold shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] hover:brightness-110',
    secondary:
      'border border-line bg-white/5 text-bright hover:bg-white/10 hover:border-cyan-400/30',
    outline: 'border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10',
    ghost: 'text-muted hover:text-bright hover:bg-white/5',
  };

  const sizes = {
    sm: 'h-9 px-4 text-xs gap-2',
    md: 'h-11 px-5 text-sm gap-2.5',
    lg: 'h-13 px-7 text-base gap-3 rounded-3xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin text-current" /> : null}
      {children}
    </button>
  );
}
