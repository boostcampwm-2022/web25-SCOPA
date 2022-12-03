/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { ViewModeContainer } from './ViewModeContainer';
import { EditModeContainer } from './EditModeContainer';
import { currentUserState } from 'store';
import { MockUpData } from './mockData';

const VIEW_MODE = true;
const EDIT_MODE = false;

interface Props {
  isMine?: boolean;
}

export const DetailPage = ({ isMine }: Props) => {
  const { id } = useParams();
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const [mode, setMode] = useState(VIEW_MODE);
  const nav = useNavigate();

  const handleClickEditButton = useCallback(() => {
    setMode((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (!currentUserID && isMine) nav('/');
  }, [isMine]);

  return mode === EDIT_MODE ? (
    <EditModeContainer userId={id as string} profileData={MockUpData} onClickCancelButton={handleClickEditButton} />
  ) : (
    <ViewModeContainer
      profileData={MockUpData}
      onClickEditButton={handleClickEditButton}
      isMine={id === currentUserID || isMine}
    />
  );
};
