/** @jsxImportSource @emotion/react */

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { currentUserState } from 'store';
import { ProfileType } from 'types/profile';
import { ViewModeContainer } from './ViewModeContainer';
import { EditModeContainer } from './EditModeContainer';
import { fetchUserData } from './services';
import { MockUpData } from './mockData';
import { LoadingFallback } from 'common';

const VIEW_MODE = true;
const EDIT_MODE = false;

interface Props {
  isMine?: boolean;
}

interface InnerProps {
  isMine: boolean;
  userId: string | null;
  promise: any;
}

export const DetailInner = ({ isMine, userId, promise }: InnerProps) => {
  const [mode, setMode] = useState(VIEW_MODE);
  const nav = useNavigate();
  const profileData = promise.read();

  const handleClickEditButton = useCallback(() => {
    setMode((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (!userId) {
      alert('ID가 입력되지 않았습니다!');
      nav('/');
    }
  }, []);

  if (!userId) return null;
  return mode === EDIT_MODE ? (
    <EditModeContainer userId={userId} profileData={profileData} onClickCancelButton={handleClickEditButton} />
  ) : (
    <ViewModeContainer profileData={MockUpData} onClickEditButton={handleClickEditButton} isMine={isMine} />
  );
};

export const DetailPage = ({ isMine }: Props) => {
  const { id = null } = useParams();
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const data = fetchUserData(isMine ? currentUserID : id);

  return (
    <Suspense fallback={<LoadingFallback text='유저 정보를 불러오고 있어요...' />}>
      <DetailInner isMine={!!(id === currentUserID || isMine)} userId={isMine ? currentUserID : id} promise={data} />
    </Suspense>
  );
};
