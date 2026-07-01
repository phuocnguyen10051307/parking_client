export type SettingType = 'string' | 'number' | 'boolean';

export type SettingInput = {
  id: number;
  label: string;
  value: string;
};

export type ToggleSetting = {
  id: number;
  label: string;
  enabled: boolean;
};

export type SystemSetting = {
  id: string;
  key: string;
  label: string;
  description: string | null;
  category: string;
  type: SettingType;
  value: string;
  createdAt: string;
  updatedAt: string;
};
