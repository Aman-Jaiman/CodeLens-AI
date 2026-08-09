import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { CodeEditor } from '@/components/dashboard/CodeEditor';
import { LanguageSelector } from '@/components/dashboard/LanguageSelector';
import { ReviewPanel } from '@/components/dashboard/ReviewPanel';
import { OptimizedCode } from '@/components/dashboard/OptimizedCode';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { ComplexityCard } from '@/components/ui/ComplexityCard';
import { Badge } from '@/components/ui/Badge';
import { languages, sampleCode } from '@/data/languages';
import { requestReview } from '@/utils/api';

export function DashboardPage() {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(sampleCode.cpp);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const monacoLanguage = useMemo(
    () => languages.find((item) => item.id === language)?.monaco ?? 'cpp',
    [language]
  );

  const handleLanguageChange = (nextLang) => {
    setLanguage(nextLang);
    setCode(sampleCode[nextLang] || '');
    setResult(null);
    setError(null);
  };

  const handleReset = () => {
    setCode(sampleCode[language] || '');
    setResult(null);
    setError(null);
  };

  const handleReview = async () => {
    if (loading) return;

    if (!code.trim()) {
      setError('Please paste or write some code before running an AI review.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await requestReview(language, code);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong while requesting AI review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="mx-auto max-w-350 px-4 pt-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="cyan">
              <BrainCircuit className="h-3.5 w-3.5" />
              AI Review Workspace
            </Badge>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-bright sm:text-4xl">
              AI Code Review Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
              Select your language, edit code in Monaco, and click Run AI Review to detect bugs, analyze complexity, and get optimized code.
            </p>
          </div>
          <div className="hidden flex-wrap gap-2 lg:flex">
            <Button variant="secondary" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
              Reset Sample
            </Button>
            <Button size="sm" loading={loading} onClick={handleReview}>
              <Sparkles className="h-4 w-4" />
              Run AI Review
            </Button>
          </div>
        </div>

        {/* Editor & Results Grid */}
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Left Column: Monaco Code Editor */}
          <GlassCard padding="md" className="min-w-0">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
              <LanguageSelector
                languages={languages}
                value={language}
                onChange={handleLanguageChange}
              />
              <p className="text-xs text-muted">
                {code.split('\n').length} lines · {code.length} chars
              </p>
            </div>

            <CodeEditor
              value={code}
              language={monacoLanguage}
              onChange={setCode}
              height="520px"
            />

            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <p className="font-semibold">Review Error</p>
                  <p className="text-xs text-rose-200/90 mt-0.5">{error}</p>
                </div>
              </motion.div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
              <Button className="w-full" loading={loading} onClick={handleReview}>
                <Sparkles className="h-4 w-4" />
                Run AI Review
              </Button>
            </div>
          </GlassCard>

          {/* Right Column: Score, Complexity & Loading/Idle State */}
          <div className="space-y-6 min-w-0">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <GlassCard className="flex min-h-95 flex-col items-center justify-center text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    >
                      <BrainCircuit className="h-8 w-8" />
                    </motion.div>
                    <p className="font-display text-xl font-semibold text-bright">
                      AI is reviewing your {languages.find(l => l.id === language)?.label} code…
                    </p>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      Checking for bugs, assessing code quality, analyzing time/space complexity, and building optimized output.
                    </p>
                  </GlassCard>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Quality Score Card */}
                  <GlassCard>
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        Quality Metric
                      </p>
                      <h2 className="mt-1 font-display text-xl font-semibold text-bright">
                        Code Quality Score
                      </h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-1">
                      <ScoreCard
                        label="Overall Health"
                        score={result.score ?? 85}
                        max={100}
                        trend={result.score >= 80 ? 'Excellent' : result.score >= 60 ? 'Needs Improvement' : 'Refactor Recommended'}
                      />
                    </div>
                  </GlassCard>

                  {/* Complexity Cards */}
                  <GlassCard>
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        Algorithmic Analysis
                      </p>
                      <h2 className="mt-1 font-display text-xl font-semibold text-bright">
                        Time & Space Complexity
                      </h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ComplexityCard
                        label="Time Complexity"
                        value={result.complexity?.time || 'N/A'}
                        hint="Estimated execution time growth rate"
                      />
                      <ComplexityCard
                        label="Space Complexity"
                        value={result.complexity?.space || 'N/A'}
                        hint="Estimated memory footprint"
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GlassCard className="flex min-h-95 flex-col justify-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Ready</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-bright">
                      Run AI review to generate insights
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                      Your detailed bug report, time & space complexity, quality score, and optimized code rewrite will appear here.
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-soft">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        Bug & Security Vulnerability detection
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        Time & Space Complexity analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                        One-click apply optimized rewrite
                      </li>
                    </ul>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Detailed Findings & Optimized Code Section */}
        <AnimatePresence>
          {result && !loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="mt-6 grid gap-6 xl:grid-cols-2"
            >
              <GlassCard>
                <ReviewPanel
                  review={result.review}
                  score={result.score}
                />
              </GlassCard>

              <GlassCard>
                <OptimizedCode
                  code={result.optimizedCode}
                  language={monacoLanguage}
                  onApply={() => setCode(result.optimizedCode)}
                />
              </GlassCard>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
