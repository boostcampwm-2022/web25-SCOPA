/** @jsxImportSource @emotion/react */

import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { currentUserState } from 'store';
import { LINK } from 'utils/constants';

import {
  loginPageBackgroundStyle,
  loginPageHeaderImageStyle,
  loginPageInnerStyle,
  loginPageWrapperStyle,
} from './styles';

export const LoginLayout = () => {
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.id) navigate(LINK.MAIN);
  }, [currentUser]);

  return (
    <div css={loginPageBackgroundStyle}>
      <div css={loginPageWrapperStyle}>
        <div css={loginPageInnerStyle}>
          <img src='/logo.png' alt='scopa logo' css={loginPageHeaderImageStyle} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
