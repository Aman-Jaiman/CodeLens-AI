import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

export function CodeEditor({
  value,
  language,
  onChange,
  height = '480px',
  readOnly = false,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0a0f1a]">
      <Editor
        height={height}
        language={language}
        value={value}
        theme="vs-dark"
        loading={
          <div className="flex h-[420px] items-center justify-center gap-2 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
            Loading editor…
          </div>
        }
        onChange={(next) => onChange(next ?? '')}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          lineHeight: 22,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          renderLineHighlight: 'line',
          cursorBlinking: 'smooth',
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
        }}
      />
    </div>
  );
}
