import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchCheckLogin } from 'services';

import { currentUserState } from 'store';

export function useCheckLogin() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    if (currentUser.id) return;
    fetchCheckLogin().then((data) => {
      const { data: body, code } = data;
      if (code !== 10000) setCurrentUser({ id: null });
      else setCurrentUser({ id: body.id });
    });
  }, []);
}