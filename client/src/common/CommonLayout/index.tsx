import { Outlet } from 'react-router-dom';

export const CommonLayout = () => {
  return (
    <>
      <nav>여기 내비게이션 바임</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
