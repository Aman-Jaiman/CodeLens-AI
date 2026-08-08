import { motion } from 'framer-motion';

export function ComplexityCard({ label, value, hint = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-2xl border border-line bg-white/[0.02] p-4 backdrop-blur-md"
    >
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-bold text-cyan-300">{value}</span>
      </div>
      {hint ? <p className="mt-1 text-xs text-muted leading-relaxed">{hint}</p> : null}
    </motion.div>
  );
}
