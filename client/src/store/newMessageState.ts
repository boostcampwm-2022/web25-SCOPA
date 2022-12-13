import { atom } from 'recoil';

import { SingleMessageType } from 'types/message';

export const newMessageState = atom<SingleMessageType | null>({
  key: 'newMessageState',
  default: null,
});
