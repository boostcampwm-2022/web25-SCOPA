import { atom } from 'recoil';

import { SettingsType } from 'types/settings';
import { CODE_SIZE } from 'utils/constants';

export const settingsState = atom<SettingsType>({
  key: 'settingsState',
  default: {
    codeBoxSize: CODE_SIZE.medium,
    codeBoxTheme: 0, // TODO: 상수로 변경
    isDarkMode: false,
  },
});
