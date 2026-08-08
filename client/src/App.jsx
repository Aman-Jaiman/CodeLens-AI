import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { Loader2 } from 'lucide-react';

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((module) => ({ default: module.DashboardPage }))
);

function DashboardFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink text-muted">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/5 px-5 py-4">
        <Loader2 className="h-5 w-5 animate-spin text-cyan-300" />
        <span className="text-sm">Loading AI workspace…</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<DashboardFallback />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
