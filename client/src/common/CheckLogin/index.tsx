import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { fetchCheckLogin } from 'services';
import { currentUserState } from 'store';

interface Props {
  children: JSX.Element;
}

export const CheckLogin = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    if (currentUser.id) return;
    fetchCheckLogin().then((data) => {
      const { data: body, code } = data;
      if (code !== 10000) setCurrentUser({ id: null });
      else setCurrentUser({ id: body.id });
    });
  }, []); // 페이지 로딩 시 한 번만 호출

  // 전역 상태가 남아있으면, 굳이 fetch 하지 않고 return outlet
  // 전역 상태가 날아갔다면, 새로 받아오기 (쿠키 검증 및 데이터 fetch)

  // 로그인이 되어 있다면 전역 상태로 로그인 정보 저장하는 등의 로직 수행

  return children;
};
