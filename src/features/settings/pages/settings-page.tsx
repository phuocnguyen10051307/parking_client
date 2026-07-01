import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { settingsApi } from '@/features/settings/api/settings-api';
import { getErrorMessage } from '@/lib/error';

import type { SystemSetting } from '../types/settings';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsApi.getSettings();
      setSettings(data);
      setDrafts(
        data.reduce<Record<string, string>>((accumulator, setting) => {
          accumulator[setting.key] = setting.value;
          return accumulator;
        }, {})
      );
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load settings'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadSettings();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const generalSettings = settings.filter((setting) => setting.category === 'general');
  const preferenceSettings = settings.filter((setting) => setting.category === 'preferences');

  const handleSave = async () => {
    try {
      setSaving(true);
      const updated = await settingsApi.updateSettings(
        settings.map((setting) => ({
          key: setting.key,
          type: setting.type,
          value: drafts[setting.key] ?? setting.value,
        }))
      );
      setSettings(updated);
      setDrafts(
        updated.reduce<Record<string, string>>((accumulator, setting) => {
          accumulator[setting.key] = setting.value;
          return accumulator;
        }, {})
      );
      toast.success('Settings updated');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to save settings'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                System Settings
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Configure core system behavior
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                These settings are stored on the backend and applied consistently across admin
                workflows.
              </p>
            </div>
            <Button onClick={() => void handleSave()} disabled={loading || saving} type="button">
              <Save />
              {saving ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </section>

        {loading ? (
          <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading settings...
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <SettingsCard
              title="General Configuration"
              description="Parking policy and billing defaults"
              settings={generalSettings}
              drafts={drafts}
              onChange={setDrafts}
            />
            <SettingsCard
              title="System Preferences"
              description="Operational toggles and feature switches"
              settings={preferenceSettings}
              drafts={drafts}
              onChange={setDrafts}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

type SettingsCardProps = {
  title: string;
  description: string;
  settings: SystemSetting[];
  drafts: Record<string, string>;
  onChange: Dispatch<SetStateAction<Record<string, string>>>;
};

function SettingsCard({ title, description, settings, drafts, onChange }: SettingsCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>

      <div className="mt-6 space-y-5">
        {settings.map((setting) => (
          <div key={setting.key} className="rounded-2xl border border-slate-100 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-slate-900">{setting.label}</h3>
                <p className="mt-1 text-sm text-slate-500">{setting.description}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
                {setting.type}
              </span>
            </div>

            {setting.type === 'boolean' ? (
              <label className="mt-4 flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Enabled</span>
                <input
                  checked={(drafts[setting.key] ?? setting.value) === 'true'}
                  onChange={(event) =>
                    onChange((current) => ({
                      ...current,
                      [setting.key]: String(event.target.checked),
                    }))
                  }
                  type="checkbox"
                  className="h-5 w-5 rounded border-slate-300 text-blue-700"
                />
              </label>
            ) : (
              <input
                value={drafts[setting.key] ?? setting.value}
                onChange={(event) =>
                  onChange((current) => ({
                    ...current,
                    [setting.key]: event.target.value,
                  }))
                }
                type={setting.type === 'number' ? 'number' : 'text'}
                className="mt-4 h-11 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-400"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
