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
        if ((location.pathname === '/mypage' || location.pathname === 'settings') && code !== 10000) nav('/');
        if (location.pathname === '/login' && code === 10000) nav('/');
      })
      .catch(() => {
        if (location.pathname === '/mypage' || location.pathname === '/settings') nav('/');
      }); // setState 는 비동기로 동작해서 안 되는 거였다
    // state를 가져와서 비교를 하지 않고, fetch 함수의 결과값을 이용해서 로그인 체크를 하면 정상 작동
  }, [location]);
}
