import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { fetchCheckLogin } from 'services';
import { currentUserState } from 'store';
import { LINK } from 'utils/constants';

export function useCheckLogin() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (currentUser.id) return;
    fetchCheckLogin()
      .then((res) => {
        setCurrentUser({ id: res.id });
      })
      .then(() => {
        if (location.pathname === LINK.LOGIN) nav(LINK.MAIN);
      })
      .catch(() => {
        setCurrentUser({ id: null });
      });
  }, [location]);
}
