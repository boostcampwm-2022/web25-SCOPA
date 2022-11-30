/** @jsxImportSource @emotion/react */

import { Outlet } from 'react-router-dom';

import { Header } from './Header';

import { footerStyle, mainWrapperStyle } from './styles';

export const CommonLayout = () => {
  return (
    <>
      <Header />
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
