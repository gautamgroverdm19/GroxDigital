import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../../state/AppContext.jsx';
import Icon from '../ui/Icon.jsx';

export const TABS = [
  { to: '/', label: 'Today', icon: 'today', end: true },
  { to: '/learn', label: 'Learn', icon: 'learn' },
  { to: '/practice', label: 'Practice', icon: 'practice' },
  { to: '/search', label: 'Search', icon: 'search' },
  { to: '/progress', label: 'Progress', icon: 'progress' },
];

// Full-screen flows hide the tab bar.
const FULL_SCREEN = ['/quiz', '/flashcards', '/welcome'];

export default function AppShell() {
  const { pathname } = useLocation();
  const { toast, saveError } = useApp();
  const full = FULL_SCREEN.some((p) => pathname.startsWith(p));
  const tabActive = (t) => (t.end ? pathname === '/' || pathname === '/today' : pathname.startsWith(t.to)) || (t.to === '/practice' && pathname.startsWith('/weak'));

  return (
    <div className="min-h-dvh lg:flex">
      {!full && (
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-surface px-4 py-6 lg:flex">
          <div className="mb-8 flex items-center gap-2.5 px-2">
            <span className="grid h-10 w-10 place-items-center rounded-btn bg-primary text-onprimary">
              <Icon name="pill" />
            </span>
            <span className="text-lg font-extrabold leading-tight">MedLearn Counter</span>
          </div>
          <nav className="space-y-1" aria-label="Main">
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={() =>
                  `focus-ring flex h-12 items-center gap-3 rounded-btn px-3 text-base font-bold transition ${tabActive(t) ? 'bg-primary-soft text-primary-strong dark:text-primary' : 'text-ink-muted hover:bg-line-soft'}`
                }
              >
                <Icon name={t.icon} />
                {t.label}
              </NavLink>
            ))}
          </nav>
          <NavLink to="/settings" className={({ isActive }) => `focus-ring mt-auto flex h-12 items-center gap-3 rounded-btn px-3 text-base font-bold ${isActive ? 'bg-primary-soft text-primary-strong dark:text-primary' : 'text-ink-muted hover:bg-line-soft'}`}>
            <Icon name="gear" /> Settings
          </NavLink>
        </aside>
      )}

      <main className={`mx-auto w-full flex-1 px-5 pt-5 ${full ? 'max-w-2xl pb-8' : 'max-w-2xl pb-[110px] lg:max-w-6xl lg:px-10 lg:pb-12 lg:pt-8'}`}>
        {saveError && (
          <div className="mb-4 flex items-start gap-2 rounded-btn border border-caution-border bg-caution-bg p-3 text-sm font-semibold text-caution-body">
            <Icon name="triangle" size={18} className="mt-0.5 text-caution-text" /> {saveError}
          </div>
        )}
        <Outlet />
      </main>

      {!full && (
        <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-30 flex h-[84px] border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
          {TABS.map((t) => {
            const active = tabActive(t);
            return (
              <NavLink key={t.to} to={t.to} end={t.end} className={`focus-ring flex flex-1 flex-col items-center justify-center gap-1 text-xs font-bold ${active ? 'text-primary' : 'text-ink-muted'}`} aria-current={active ? 'page' : undefined}>
                <span className={`grid h-8 w-14 place-items-center rounded-full transition ${active ? 'bg-primary-soft' : ''}`}>
                  <Icon name={t.icon} size={22} />
                </span>
                {t.label}
              </NavLink>
            );
          })}
        </nav>
      )}

      {toast && (
        <div key={toast.id} role="status" className="fixed inset-x-0 bottom-[100px] z-50 mx-auto w-fit max-w-[90vw] animate-fadein rounded-btn bg-ink px-4 py-3 text-sm font-bold text-bg shadow-lg lg:bottom-8">
          {toast.msg}
        </div>
      )}
    </div>
  );
}
