import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { generalSettings, systemToggles } from '../data/settings-data';

import { SettingsSection } from '../components/settings-section';
import { InputSetting } from '../components/input-setting';
import { ToggleSetting } from '../components/toggle-setting';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Settings</h1>

          <p className="mt-2 text-slate-500">Configure parking rules and system preferences.</p>
        </div>

        <button className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white">
          Save Changes
        </button>
      </div>

      {/* Settings content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* General settings */}
        <SettingsSection
          title="General Configuration"
          description="Manage core parking system settings."
        >
          <div className="space-y-5">
            {generalSettings.map((setting) => (
              <InputSetting key={setting.id} setting={setting} />
            ))}
          </div>
        </SettingsSection>

        {/* System toggles */}
        <SettingsSection
          title="System Preferences"
          description="Enable or disable system features."
        >
          <div className="space-y-4">
            {systemToggles.map((setting) => (
              <ToggleSetting key={setting.id} setting={setting} />
            ))}
          </div>
        </SettingsSection>
      </div>
    </DashboardLayout>
  );
}
