import type { SettingInput } from '../types/settings';

type Props = {
  setting: SettingInput;
};

export function InputSetting({ setting }: Props) {
  return (
    <div>
      {/* Label setting */}
      <label className="mb-2 block text-sm font-medium text-slate-600">{setting.label}</label>

      {/* Input value */}
      <input
        defaultValue={setting.value}
        className="h-11 w-full rounded-xl border border-slate-200 px-4 outline-none"
      />
    </div>
  );
}
