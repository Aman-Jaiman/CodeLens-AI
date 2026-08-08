import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { languages } from '@/data/languages';

export function TechStack() {
  return (
    <section id="stack" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Languages"
          title="Supported programming languages"
          subtitle="Engineered specifically to review and optimize these 7 core technologies."
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white/[0.03] px-6 py-4 backdrop-blur-md transition-all hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              <span className="font-mono text-sm font-semibold uppercase text-cyan-300">
                .{lang.extension}
              </span>
              <span className="font-display font-medium text-bright">{lang.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
