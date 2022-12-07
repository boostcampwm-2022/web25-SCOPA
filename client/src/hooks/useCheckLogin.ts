import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { fetchCheckLogin } from 'services';
import { currentUserState } from 'store';

export function useCheckLogin() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (currentUser.id) return;
    fetchCheckLogin()
      .then((data) => {
        const { data: body, code } = data;
        if (code !== 10000) setCurrentUser({ id: null });
        else setCurrentUser({ id: body.id });
        return code;
      })
      .then((code: number) => {
        if (location.pathname === '/login' && code === 10000) nav('/');
      })
      .catch(() => {
        setCurrentUser({ id: null });
      });
  }, [location]);
}
