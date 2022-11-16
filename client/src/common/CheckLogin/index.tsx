import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const CheckLogin = () => {
  useEffect(() => {
    console.warn(`로그인 체크 로직을 여기에\n하위 컴포넌트 (페이지) 렌더링 될 때마다 실행됩니다...`);
  }, []);

  // 전역 상태가 남아있으면, 굳이 fetch 하지 않고 return outlet
  // 전역 상태가 날아갔다면, 새로 받아오기 (쿠키 검증 및 데이터 fetch)

  // 로그인 시에만 접근할 수 있는 페이지일 경우, 매 페이지 이동마다 로그인을 체크하는 컴포넌트
  // 모든 페이지의 상단에서 동작 (미들웨어처럼)
  // 로그인이 되어 있다면 전역 상태로 로그인 정보 저장하는 등의 로직 수행

  // 전역상태값은 조작가능한가?

  return <Outlet />;
};
