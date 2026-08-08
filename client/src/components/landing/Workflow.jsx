import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { landingContent } from '@/data/content';

export function Workflow() {
  const { workflow } = landingContent;

  return (
    <section id="workflow" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Workflow"
          title="Simple 3-step review process"
          subtitle="From raw snippet to clean, optimized code in seconds."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {workflow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className="relative h-full overflow-hidden">
                <span className="font-display text-5xl font-black text-white/5">
                  {item.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-bright">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
