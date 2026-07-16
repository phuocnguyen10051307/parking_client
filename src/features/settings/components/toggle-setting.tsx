import type { ToggleSetting as ToggleType } from '../types/settings';

type Props = {
  setting: ToggleType;
};

export function ToggleSetting({ setting }: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
      <span className="font-medium text-slate-700">{setting.label}</span>

      {/* Toggle UI */}
      <button
        className={`flex h-7 w-14 items-center rounded-full px-1 transition ${
          setting.enabled ? 'bg-blue-900' : 'bg-slate-300'
        }`}
      >
        <div
          className={`h-5 w-5 rounded-full bg-white transition ${
            setting.enabled ? 'translate-x-7' : ''
          }`}
        />
      </button>
    </div>
  );
}
