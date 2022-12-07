import { Suspense, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import { LoadingFallback } from 'common';
import { currentUserState } from 'store';
import { fetchUserData } from './services';
import { DetailInner } from './DetailPageInner';
import { LINK } from 'utils/constants';

interface Props {
  isMine?: boolean;
}

export const ErrorFallback = ({ error }: { error: Error }) => {
  const nav = useNavigate();

  useEffect(() => {
    alert(error);
    nav(LINK.MAIN);
  }, []);
  return null;
};

export const DetailPage = ({ isMine = false }: Props) => {
  const { id = null } = useParams();
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const data = fetchUserData(isMine ? currentUserID : id);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback text='유저 정보를 불러오고 있어요...' />}>
        <DetailInner isMine={id === currentUserID || isMine} userId={isMine ? currentUserID : id} promise={data} />
      </Suspense>
    </ErrorBoundary>
  );
};
