import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const CheckLogin = () => {
  useEffect(() => {
    console.warn(`로그인 체크 로직을 여기에\n하위 컴포넌트 렌더링 될 때마다 실행됩니다...`);
  }, []);

  return <Outlet />;
};
