import type { ReactNode } from 'react';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SettingsSection({ title, description, children }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* Header section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-blue-900">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {children}
    </div>
  );
}
