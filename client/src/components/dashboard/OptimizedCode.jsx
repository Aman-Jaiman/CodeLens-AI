import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { CodeEditor } from '@/components/dashboard/CodeEditor';
import { Button } from '@/components/ui/Button';

export function OptimizedCode({ code, language, onApply }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 2200);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Optimized code</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-bright">
            AI Suggested Rewrite
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!code}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : copyFailed ? 'Copy failed' : 'Copy'}
          </Button>
          <Button size="sm" onClick={onApply} disabled={!code}>
            Apply to editor
          </Button>
        </div>
      </div>
      <CodeEditor value={code} language={language} onChange={() => undefined} readOnly height="360px" />
    </div>
  );
}
