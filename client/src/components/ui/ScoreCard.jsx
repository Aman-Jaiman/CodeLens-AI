import { motion } from 'framer-motion';

export function ScoreCard({ label, score, max = 100, trend = 'Optimal', delay = 0 }) {
  const percentage = Math.min(100, Math.max(0, Math.round((score / max) * 100)));

  let colorClass = 'text-cyan-300 stroke-cyan-400';
  if (percentage < 60) colorClass = 'text-rose-400 stroke-rose-400';
  else if (percentage < 80) colorClass = 'text-amber-300 stroke-amber-400';
  else colorClass = 'text-emerald-300 stroke-emerald-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center justify-between rounded-2xl border border-line bg-white/[0.02] p-4 backdrop-blur-md"
    >
      <div>
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-display text-3xl font-bold text-bright">{score}</span>
          <span className="text-xs text-muted">/ {max}</span>
        </div>
        <p className="mt-1 text-xs text-cyan-300/80">{trend}</p>
      </div>

      <div className="relative flex h-14 w-14 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
          <path
            className="stroke-white/10"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className={colorClass}
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            initial={{ strokeDasharray: '0, 100' }}
            animate={{ strokeDasharray: `${percentage}, 100` }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
          />
        </svg>
        <span className="absolute font-mono text-xs font-semibold text-bright">{percentage}%</span>
      </div>
    </motion.div>
  );
}
