/** @jsxImportSource @emotion/react */

import { ReactElement } from 'react';

import {
  loginButtonDummyDivStyle,
  loginButtonLinkStyle,
  loginButtonTextStyle,
  loginButtonWrapperStyle,
} from './LoginButtonComponent.styles';

interface Props {
  link: string;
  icon: ReactElement;
  innerText: string;
  isBackgroundBlack?: boolean;
}

export const LoginButtonComponent = ({ link, icon, innerText, isBackgroundBlack = false }: Props) => {
  return (
    <a href={link} css={loginButtonLinkStyle}>
      <div css={loginButtonWrapperStyle(isBackgroundBlack)}>
        {icon}
        <span css={loginButtonTextStyle(isBackgroundBlack)}>{innerText} 로그인</span>
        <div css={loginButtonDummyDivStyle} />
      </div>
    </a>
  );
};
