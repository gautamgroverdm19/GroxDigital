import { useNavigate } from 'react-router-dom';
import ImportPanel, { ColumnGuide } from '../components/ImportPanel.jsx';
import { Icon, SafetyFooter } from '../components/ui/index.jsx';
import { useApp } from '../state/AppContext.jsx';

export default function Welcome() {
  const navigate = useNavigate();
  const { rawCount } = useApp();
  return (
    <div className="mx-auto max-w-md pt-6">
      <div className="mb-6 grid h-16 w-16 place-items-center rounded-[20px] bg-primary text-onprimary">
        <Icon name="pill" size={34} />
      </div>
      <h1 className="text-4xl font-extrabold tracking-[-0.02em]">MedLearn Counter</h1>
      <p className="mt-3 text-lg text-ink-alt">
        Apne store ki har medicine seekho — salt, class, rack aur dispensing alerts — 15–20 minute ke sessions mein, customers ke beech.
      </p>
      <div className="card mt-8 space-y-4">
        <h2 className="text-lg font-extrabold">Start with your medicine list</h2>
        <ImportPanel onDone={() => navigate('/')} />
        <ColumnGuide />
      </div>
      {rawCount > 0 && (
        <button className="btn-text mt-4 w-full" onClick={() => navigate('/')}>
          Continue to app
        </button>
      )}
      <SafetyFooter />
    </div>
  );
}
