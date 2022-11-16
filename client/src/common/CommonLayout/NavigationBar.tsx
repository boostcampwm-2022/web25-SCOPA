/** @jsxImportSource @emotion/react */

import { logoutButtonStyle, navigationBarWrapperStyle } from './NavigationBar.styles';

export const NavigationBar = () => {
  return (
    <nav css={navigationBarWrapperStyle}>
      <h1>SCOPA</h1>
      <button type='button' css={logoutButtonStyle}>
        <span>로그인</span>
      </button>
    </nav>
  );
};
