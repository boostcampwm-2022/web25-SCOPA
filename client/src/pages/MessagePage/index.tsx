/** @jsxImportSource @emotion/react */

import { Suspense, useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { LoadingFallback, MiniNavBar, NavSubtitle } from 'common';
import { isNewMessageState } from 'store';
import { MessageList } from './MessageList';
import { MessageDetail } from './MessageDetail';
import { fetchMessageList } from './services';
import { LINK } from 'utils/constants';
import { MessageTopBar } from './MessageTopBar';

import { messagePageSectionStyle, messagePageWrapperStyle } from './styles';

const ErrorFallback = () => {
  const nav = useNavigate();

  useEffect(() => {
    alert('쪽지 목록을 불러오는 데에 실패하였습니다.');
    nav(LINK.MAIN);
  }, []);
  return null;
};

export const MessagePage = () => {
  const resetIsNewMessage = useResetRecoilState(isNewMessageState);
  const promise = fetchMessageList();

  useEffect(() => {
    resetIsNewMessage();
  }, []);
  return (
    <>
      <MiniNavBar>
        <NavSubtitle text='쪽지' />
      </MiniNavBar>
      <div css={messagePageWrapperStyle}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <section css={messagePageSectionStyle}>
            <MessageTopBar>
              <h4>대화 목록</h4>
            </MessageTopBar>
            <Suspense fallback={<LoadingFallback text='메시지 목록을 불러오고 있어요' />}>
              <MessageList promise={promise} />
            </Suspense>
          </section>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
};

export { MessageDetail };
