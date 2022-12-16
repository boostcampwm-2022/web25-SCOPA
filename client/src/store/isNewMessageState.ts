import { atom } from 'recoil';

export const isNewMessageState = atom<boolean>({
  key: 'isNewMessageState',
  default: false,
});
