/** @jsxImportSource @emotion/react */

import { loginPageBackgroundStyle, loginPageInnerStyle, loginPageWrapperStyle } from './styles';

export const LoginPage = () => {
  return (
    <div css={loginPageBackgroundStyle}>
      <div css={loginPageWrapperStyle}>
        <div css={loginPageInnerStyle}>로그인 페이지입니다</div>
      </div>
    </div>
  );
};
