import { Link } from 'react-router-dom';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Workflow } from '@/components/landing/Workflow';
import { TechStack } from '@/components/landing/TechStack';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <TechStack />
        <FAQ />

        <section className="pb-24 pt-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass relative overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:px-10"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-emerald-400/10"
                aria-hidden
              />
              <h2 className="relative font-display text-3xl font-bold text-bright sm:text-4xl">
                Ready to review your code with AI?
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-muted">
                Open the workspace, select your language, paste code, and get real-time AI review cards.
              </p>
              <div className="relative mt-7 flex justify-center">
                <Link to="/dashboard">
                  <Button size="lg">
                    Launch Workspace
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
