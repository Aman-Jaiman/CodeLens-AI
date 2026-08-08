import { motion } from 'framer-motion';

export function GlassCard({ children, className = '', padding = 'md', hover = false }) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ duration: 0.2 }}
      className={`glass relative rounded-3xl backdrop-blur-xl ${paddings[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
