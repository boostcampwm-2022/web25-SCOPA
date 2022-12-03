import { SettingsType } from 'types/settings';

export function setSettingsInLocalStorage(settingsObj: SettingsType): void {
  localStorage.setItem('settings', JSON.stringify(settingsObj));
}

export function getSettingsFromLocalStorage(): SettingsType | null {
  try {
    const settingsStr = localStorage.getItem('settings');
    if (!settingsStr) return null;
    return JSON.parse(settingsStr);
  } catch {
    return null;
  }
}
