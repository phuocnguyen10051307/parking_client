import type { SettingInput, ToggleSetting } from '../types/settings';

export const generalSettings: SettingInput[] = [
  {
    id: 1,
    label: 'Operating Hours',
    value: '06:00 - 23:00',
  },
  {
    id: 2,
    label: 'Grace Period (minutes)',
    value: '15',
  },
  {
    id: 3,
    label: 'Tax Rate (%)',
    value: '10',
  },
  {
    id: 4,
    label: 'Penalty Fee ($)',
    value: '5',
  },
  {
    id: 5,
    label: 'Currency',
    value: 'USD',
  },
];

export const systemToggles: ToggleSetting[] = [
  {
    id: 1,
    label: 'Auto Lock Full Zones',
    enabled: true,
  },
  {
    id: 2,
    label: 'Enable Notifications',
    enabled: true,
  },
  {
    id: 3,
    label: 'Allow Reservation',
    enabled: false,
  },
];
