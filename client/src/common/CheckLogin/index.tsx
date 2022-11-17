import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { fetchCheckLogin } from 'services';
import { currentUserState } from 'store';

export const CheckLogin = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    fetchCheckLogin().then((data) => {
      if (data.code !== 200) setCurrentUser({ id: null });
      else setCurrentUser({ id: data.body.id });
    });
  }, []);

  // 전역 상태가 남아있으면, 굳이 fetch 하지 않고 return outlet
  // 전역 상태가 날아갔다면, 새로 받아오기 (쿠키 검증 및 데이터 fetch)

  // 로그인 시에만 접근할 수 있는 페이지일 경우, 매 페이지 이동마다 로그인을 체크하는 컴포넌트
  // 모든 페이지의 상단에서 동작 (미들웨어처럼)
  // 로그인이 되어 있다면 전역 상태로 로그인 정보 저장하는 등의 로직 수행

  // 전역상태값은 조작가능한가?

  return <Outlet />;
};
