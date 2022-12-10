import { Suspense, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import { LoadingFallback } from 'common';
import { currentUserState } from 'store';
import { fetchUserData } from './services';
import { DetailPageInner } from './DetailPageInner';
import { LINK } from 'utils/constants';

interface Props {
  isMine?: boolean;
}

const ErrorFallback = (isMine: boolean) => {
  const nav = useNavigate();

  useEffect(() => {
    alert(isMine ? '로그인 정보가 없습니다.' : '존재하지 않는 페이지이거나, 오류가 발생하였습니다.');
    nav(LINK.MAIN);
  }, []);
  return null;
};

export const DetailPage = ({ isMine = false }: Props) => {
  const { id = null } = useParams();
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const promise = fetchUserData(isMine ? currentUserID : id);

  return (
    <ErrorBoundary FallbackComponent={() => ErrorFallback(isMine)}>
      <Suspense fallback={<LoadingFallback text='유저 정보를 불러오고 있어요...' />}>
        <DetailPageInner
          isMine={id === currentUserID || isMine}
          userId={isMine ? currentUserID : id}
          promise={promise}
        />
      </Suspense>
    </ErrorBoundary>
  );
};
