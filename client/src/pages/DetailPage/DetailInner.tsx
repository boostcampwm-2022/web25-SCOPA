import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ViewModeContainer } from './ViewModeContainer';
import { EditModeContainer } from './EditModeContainer';
import { LINK } from 'utils/constants';
import { ProfileType } from 'types/profile';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'store';

interface Props {
  userId: string | null;
  promise: {
    read: () => ProfileType;
  };
}

export const DetailInner = ({ userId, promise }: Props) => {
  const [params] = useSearchParams();
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const nav = useNavigate();
  const mode = params.get('mode');
  const profileData = promise.read();

  const handleClickEditButton = useCallback(() => {
    nav(`${LINK.MYPAGE}${mode === 'edit' ? '' : '?mode=edit'}`);
  }, [mode]);

  if (!userId) return null;
  return mode === 'edit' ? (
    <EditModeContainer
      isEditable={currentUserID === userId}
      profileData={profileData}
      onClickCancelButton={handleClickEditButton}
    />
  ) : (
    <ViewModeContainer profileData={profileData} onClickEditButton={handleClickEditButton} />
  );
};
