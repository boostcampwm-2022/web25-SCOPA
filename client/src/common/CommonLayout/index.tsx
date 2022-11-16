/** @jsxImportSource @emotion/react */

import { Outlet } from 'react-router-dom';

import { NavigationBar } from './NavigationBar';

import { footerStyle, mainWrapperStyle } from './styles';

export const CommonLayout = () => {
  return (
    <>
      <NavigationBar />
      <main css={mainWrapperStyle}>
        <Outlet />
      </main>
      <footer css={footerStyle}>
        <img src='/earlybird.png' alt='copyright-earlybird' />
        <span>© 2022 Team Earlybird</span>
        <img src='/earlybird.png' alt='copyright-earlybird' />
      </footer>
    </>
  );
};
