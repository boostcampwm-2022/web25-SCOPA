import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { settingsState } from 'store';
import { getSettingsFromLocalStorage, setSettingsInLocalStorage } from 'utils/storage';

export function useLoadSettings() {
  const [settings, setSettings] = useRecoilState(settingsState);

  useEffect(() => {
    const settingsFromLocalStorage = getSettingsFromLocalStorage();
    if (!settingsFromLocalStorage) setSettingsInLocalStorage(settings);
    else setSettings(settingsFromLocalStorage);
  }, []);
}
// TODO: 이 훅 관련 게시글 작성중
