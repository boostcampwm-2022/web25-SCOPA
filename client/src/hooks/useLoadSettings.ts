import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { settingsState } from 'store';
import { getSettingsFromLocalStorage, setSettingsInLocalStorage } from 'utils/storage';

export const useLoadSettings = () => {
  const [settings, setSettings] = useRecoilState(settingsState);

  useEffect(() => {
    const settingsFromLocalStorage = getSettingsFromLocalStorage();
    if (!settingsFromLocalStorage) setSettingsInLocalStorage(settings);
    else setSettings(settingsFromLocalStorage);
  }, []);
};
