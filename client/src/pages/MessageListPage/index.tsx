/** @jsxImportSource @emotion/react */

import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { LoadingFallback, MiniNavBar, NavSubtitle } from 'common';
import { MessageListPageInner } from './MessageListPageInner';
import { fetchMessageList } from './services';
import { LINK } from 'utils/constants';

const ErrorFallback = () => {
  const nav = useNavigate();

  useEffect(() => {
    alert('쪽지 목록을 불러오는 데에 실패하였습니다.');
    nav(LINK.MAIN);
  }, []);
  return null;
};

export const MessageListPage = () => {
  const promise = fetchMessageList();
  return (
    <>
      <MiniNavBar>
        <NavSubtitle text='쪽지' />
      </MiniNavBar>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback text='메시지 목록을 불러오고 있어요' />}>
          <MessageListPageInner promise={promise} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
