import { atom } from 'recoil';

import { AuthType } from 'types/auth';

export const currentUserState = atom<AuthType>({
  key: 'currentUserState',
  default: { id: null },
});
