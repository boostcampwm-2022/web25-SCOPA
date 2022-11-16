import { Outlet } from 'react-router-dom';

import { NavigationBar } from './NavigationBar';

export const CommonLayout = () => {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
