/** @jsxImportSource @emotion/react */

import { Suspense, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import { LoadingFallback, MiniNavBar } from 'common';
import { currentUserState } from 'store';
import { fetchUserData } from './services';
import { LINK } from 'utils/constants';
import { DetailInner } from './DetailInner';

import { detailDummyNavBarStyle, detailLoadingFallbackStyle } from './ViewModeContainer/styles';

const ErrorFallback = (isMine: boolean) => {
  const nav = useNavigate();

  useEffect(() => {
    alert(isMine ? '로그인 정보가 없습니다.' : '존재하지 않는 페이지이거나, 권한이 없습니다.');
    nav(LINK.MAIN);
  }, []);
  return null;
};

const DetailLoadingFallback = () => {
  return (
    <>
      <MiniNavBar>
        <div css={detailDummyNavBarStyle} />
      </MiniNavBar>
      <LoadingFallback text='유저 정보를 불러오고 있어요...' css={detailLoadingFallbackStyle} />
    </>
  );
};

export const DetailPage = () => {
  const { pathname } = useLocation();
  const { id = null } = useParams();
  const { id: currentUserID } = useRecoilValue(currentUserState);

  const isMine = pathname === LINK.MYPAGE;
  const promise = fetchUserData(isMine ? currentUserID : id);

  return (
    <ErrorBoundary FallbackComponent={() => ErrorFallback(isMine)}>
      <Suspense fallback={<DetailLoadingFallback />}>
        <DetailInner userId={isMine ? currentUserID : id} promise={promise} />
      </Suspense>
    </ErrorBoundary>
  );
};
