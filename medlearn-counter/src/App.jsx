import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AppShell from './components/layout/AppShell.jsx';
import { AppProvider, useApp } from './state/AppContext.jsx';
import CategoryChains from './pages/CategoryChains.jsx';
import Flashcards from './pages/Flashcards.jsx';
import Home from './pages/Home.jsx';
import MedicineCard from './pages/MedicineCard.jsx';
import PracticeHub from './pages/PracticeHub.jsx';
import Progress from './pages/Progress.jsx';
import Quiz from './pages/Quiz.jsx';
import Search from './pages/Search.jsx';
import Settings from './pages/Settings.jsx';
import TodayFive from './pages/TodayFive.jsx';
import WeakMedicines from './pages/WeakMedicines.jsx';
import Welcome from './pages/Welcome.jsx';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

/** Until medicines are imported, send people to the Welcome screen. */
function NeedsData({ children }) {
  const { medicines } = useApp();
  return medicines.length ? children : <Navigate to="/welcome" replace />;
}

function AppRoutes() {
  const { ready } = useApp();
  if (!ready) return <div className="grid min-h-dvh place-items-center text-ink-muted">Loading…</div>;
  const d = (el) => <NeedsData>{el}</NeedsData>;
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={d(<Home />)} />
        <Route path="/today" element={d(<TodayFive />)} />
        <Route path="/medicine/:id" element={d(<MedicineCard />)} />
        <Route path="/learn" element={d(<CategoryChains />)} />
        <Route path="/practice" element={d(<PracticeHub />)} />
        <Route path="/quiz" element={d(<Quiz />)} />
        <Route path="/flashcards" element={d(<Flashcards />)} />
        <Route path="/weak" element={d(<WeakMedicines />)} />
        <Route path="/search" element={d(<Search />)} />
        <Route path="/progress" element={d(<Progress />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollTop />
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}
