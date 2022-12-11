/** @jsxImportSource @emotion/react */

import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { LoadingFallback } from 'common';
import { MessageDetailInner } from './MessageDetailInner';
import { fetchMessageDetail } from '../services';
import { MessageTopBar } from '../MessageTopBar';

import { goBackButtonStyle } from './styles';

import { ArrowDownIcon } from 'assets/svgs';

export const MessageDetail = () => {
  const { id = null } = useParams();
  const promise = fetchMessageDetail(id);

  return (
    <>
      <MessageTopBar>
        <>
          <button type='button' css={goBackButtonStyle}>
            <ArrowDownIcon />
          </button>
          <h4>{id}</h4>
        </>
      </MessageTopBar>
      <Suspense fallback={<LoadingFallback text='메시지 내역을 불러오고 있어요' />}>
        <MessageDetailInner promise={promise} />
      </Suspense>
    </>
  );
};
