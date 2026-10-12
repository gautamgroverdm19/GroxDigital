import { useState } from 'react';
import { useApp } from '../../state/AppContext.jsx';
import Icon from './Icon.jsx';

/**
 * Shows a field from the medicine. Empty fields show "Add details"; anything can be edited.
 * Lists: one item per line (or separate with ;).
 */
export default function EditableField({ med, field, label, placeholder, multiline = true, list = false, children, hint }) {
  const { updateMedicine, showToast } = useApp();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const value = med[field];

  const start = () => {
    setDraft(value ? (list ? String(value).split(/\s*[;|]\s*/).join('\n') : String(value)) : '');
    setEditing(true);
  };
  const saveIt = () => {
    const cleaned = list
      ? draft
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
          .join('\n')
      : draft.trim();
    updateMedicine(med.id, { [field]: cleaned });
    setEditing(false);
    showToast(`${label} saved`);
  };

  if (editing) {
    return (
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink-muted" htmlFor={`f-${field}`}>
          {label}
          {hint && <span className="font-semibold"> — {hint}</span>}
        </label>
        {multiline ? (
          <textarea id={`f-${field}`} autoFocus rows={4} className="input" value={draft} placeholder={placeholder} onChange={(e) => setDraft(e.target.value)} />
        ) : (
          <input id={`f-${field}`} autoFocus className="input" value={draft} placeholder={placeholder} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveIt()} />
        )}
        <div className="flex gap-2">
          <button className="btn-primary h-11 flex-1 text-base" onClick={saveIt}>
            Save
          </button>
          <button className="btn-secondary h-11 flex-1 text-base" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (!value) {
    return (
      <button onClick={start} className="focus-ring flex min-h-[44px] w-full items-center gap-2 rounded-btn border-[1.5px] border-dashed border-line px-3.5 py-2.5 text-left text-sm font-bold text-primary-strong hover:border-primary dark:text-primary">
        <Icon name="pencil" size={18} />
        Add details{label ? ` · ${label}` : ''}
      </button>
    );
  }

  return (
    <div className="group relative">
      {children || <p className="whitespace-pre-line text-base leading-relaxed text-ink-alt">{value}</p>}
      <button onClick={start} className="focus-ring mt-2 inline-flex h-11 items-center gap-1.5 rounded-btn px-1 text-sm font-bold text-primary-strong dark:text-primary" aria-label={`Edit ${label}`}>
        <Icon name="pencil" size={16} /> Edit
      </button>
    </div>
  );
}
