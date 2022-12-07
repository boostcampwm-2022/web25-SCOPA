import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ViewModeContainer } from './ViewModeContainer';
import { EditModeContainer } from './EditModeContainer';
import { LINK } from 'utils/constants';
import { ProfileType } from 'types/profile';

interface Props {
  isMine: boolean;
  userId: string | null;
  promise: {
    read: () => ProfileType;
  };
}

export const DetailInner = ({ isMine, userId, promise }: Props) => {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const mode = params.get('mode');
  const profileData = promise.read();

  const handleClickEditButton = useCallback(() => {
    nav(`${LINK.MYPAGE}${mode === 'edit' ? '' : '?mode=edit'}`);
  }, []);

  if (!userId) return null;
  return mode === 'edit' ? (
    <EditModeContainer userId={userId} profileData={profileData} onClickCancelButton={handleClickEditButton} />
  ) : (
    <ViewModeContainer profileData={profileData} onClickEditButton={handleClickEditButton} isMine={isMine} />
  );
};
