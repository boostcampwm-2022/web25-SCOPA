/** @jsxImportSource @emotion/react */

import { loginPageBackgroundStyle, loginPageInnerStyle, loginPageWrapperStyle } from './styles';

export const LoginLayout = () => {
  return (
    <div css={loginPageBackgroundStyle}>
      <div css={loginPageWrapperStyle}>
        <div css={loginPageInnerStyle}>내용물</div>
      </div>
    </div>
  );
};
