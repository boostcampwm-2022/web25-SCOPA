import { useCallback, useEffect, useState } from 'react';

import { ViewModeContainer } from './ViewModeContainer';
import { EditModeContainer } from './EditModeContainer';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  isMine: boolean;
  userId: string | null;
  promise: any;
}

export const DetailInner = ({ isMine, userId, promise }: Props) => {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const mode = params.get('mode');
  const profileData = promise.read();

  const handleClickEditButton = useCallback(() => {
    nav(mode === 'edit' ? '/mypage' : '/mypage?mode=edit');
  }, []);

  if (!userId) return null;
  return mode === 'edit' ? (
    <EditModeContainer userId={userId} profileData={profileData} onClickCancelButton={handleClickEditButton} />
  ) : (
    <ViewModeContainer profileData={profileData} onClickEditButton={handleClickEditButton} isMine={isMine} />
  );
};
