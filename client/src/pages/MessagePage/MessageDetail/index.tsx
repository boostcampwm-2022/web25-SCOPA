/** @jsxImportSource @emotion/react */

import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { LoadingFallback } from 'common';
import { MessageDetailInner } from './MessageDetailInner';
import { fetchMessageDetail } from '../services';

import { messagePageSectionStyle } from '../styles';

export const MessageDetail = () => {
  const { id = null } = useParams();
  const promise = fetchMessageDetail(id);

  if (!id) return null;
  return (
    <section css={messagePageSectionStyle}>
      <Suspense fallback={<LoadingFallback text='메시지 내역을 불러오고 있어요' />}>
        <MessageDetailInner promise={promise} userId={id} />
      </Suspense>
    </section>
  );
};
