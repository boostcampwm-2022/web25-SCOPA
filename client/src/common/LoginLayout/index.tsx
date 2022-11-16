/** @jsxImportSource @emotion/react */

import { Outlet } from 'react-router-dom';

import { loginPageBackgroundStyle, loginPageInnerStyle, loginPageWrapperStyle } from './styles';

export const LoginLayout = () => {
  return (
    <div css={loginPageBackgroundStyle}>
      <div css={loginPageWrapperStyle}>
        <div css={loginPageInnerStyle}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
