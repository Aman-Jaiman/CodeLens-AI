import { MarkdownRenderer } from '@/components/dashboard/MarkdownRenderer';

export function ReviewPanel({ review, score }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">AI Feedback</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-bright">Detailed Analysis</h3>
        </div>
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200">Overall Score</p>
          <p className="font-display text-3xl font-bold text-cyan-300">{score} <span className="text-sm font-normal text-muted">/ 100</span></p>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-ink/40 p-4 sm:p-5">
        <MarkdownRenderer content={review} />
      </div>
    </div>
  );
}
