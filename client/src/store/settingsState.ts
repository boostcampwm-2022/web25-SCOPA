import { atom } from 'recoil';

import { SettingsType } from 'types/settings';
import { CODE_SIZE } from 'utils/constants';

export const settingsState = atom<SettingsType>({
  key: 'settingsState',
  default: {
    codeBoxSize: 0,
    codeBoxTheme: 0,
    isDarkMode: false,
  },
});
