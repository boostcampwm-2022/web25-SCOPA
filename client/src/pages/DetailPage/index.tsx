/** @jsxImportSource @emotion/react */

import { Suspense, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import { LoadingFallback, MiniNavBar } from 'common';
import { currentUserState } from 'store';
import { fetchUserData } from './services';
import { LINK } from 'utils/constants';
import { DetailInner } from './DetailPageInner';

import { detailDummyNavBarStyle, detailLoadingFallbackStyle } from './ViewModeContainer/styles';

interface Props {
  isMine?: boolean;
}

const ErrorFallback = (isMine) => {
  const nav = useNavigate();

  useEffect(() => {
    alert(isMine ? '로그인 정보가 없습니다.' : '존재하지 않는 페이지이거나, 오류가 발생하였습니다.');
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

export const DetailPage = ({ isMine = false }: Props) => {
  const { id = null } = useParams();
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const promise = fetchUserData(isMine ? currentUserID : id);

  return (
    <ErrorBoundary fallbackRender={() => ErrorFallback(isMine)}>
      <Suspense fallback={<DetailLoadingFallback />}>
        <DetailInner userId={isMine ? currentUserID : id} promise={promise} />
      </Suspense>
    </ErrorBoundary>
  );
};
