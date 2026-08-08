import { ChevronDown } from 'lucide-react';

export function LanguageSelector({ languages, value, onChange }) {
  return (
    <label className="relative inline-flex min-w-[12rem] flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Language</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-2xl border border-line bg-white/5 pl-4 pr-10 text-sm text-bright outline-none transition focus:border-cyan-400/50"
        >
          {languages.map((language) => (
            <option key={language.id} value={language.id} className="bg-panel text-bright">
              {language.label} (.{language.extension})
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
    </label>
  );
}
