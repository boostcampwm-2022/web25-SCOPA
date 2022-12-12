/** @jsxImportSource @emotion/react */

import { Suspense, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingFallback } from 'common';
import { MessageDetailInner } from './MessageDetailInner';
import { fetchMessageDetail } from '../services';
import { MessageTopBar } from '../MessageTopBar';

import { goBackButtonStyle } from './styles';
import { messagePageSectionStyle } from '../styles';

import { ArrowDownIcon } from 'assets/svgs';

export const MessageDetail = () => {
  const { id = null } = useParams();
  const nav = useNavigate();
  const promise = fetchMessageDetail(id);

  const handleClickBackButton = useCallback(() => {
    nav('/message');
  }, []);

  if (!id) return null;
  return (
    <section css={messagePageSectionStyle}>
      <MessageTopBar>
        <>
          <button type='button' css={goBackButtonStyle} onClick={handleClickBackButton}>
            <ArrowDownIcon />
          </button>
          <h4>{id}</h4>
        </>
      </MessageTopBar>
      <Suspense fallback={<LoadingFallback text='메시지 내역을 불러오고 있어요' />}>
        <MessageDetailInner promise={promise} />
      </Suspense>
    </section>
  );
};
