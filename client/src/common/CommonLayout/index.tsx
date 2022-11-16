/** @jsxImportSource @emotion/react */

import { Outlet } from 'react-router-dom';

import { NavigationBar } from './NavigationBar';

import { mainWrapperStyle } from './styles';

export const CommonLayout = () => {
  return (
    <>
      <NavigationBar />
      <main css={mainWrapperStyle}>
        <Outlet />
      </main>
    </>
  );
};
