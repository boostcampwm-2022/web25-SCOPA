/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { ViewModeContainer } from 'common';
import { currentUserState } from 'store';
import { EditModeContainer } from './EditModeContainer';

import { MockUpData } from './mockData';

const VIEW_MODE = true;
const EDIT_MODE = false;

export const Mypage = () => {
  const { id } = useRecoilValue(currentUserState);
  const [mode, setMode] = useState(VIEW_MODE);

  const handleClickEditButton = useCallback(() => {
    setMode((prevState) => !prevState);
  }, [mode]);

  return mode === EDIT_MODE ? (
    <EditModeContainer userId={id as string} profileData={MockUpData} onClickCancelButton={handleClickEditButton} />
  ) : (
    <ViewModeContainer profileData={MockUpData} onClickEditButton={handleClickEditButton} isMine />
  );
};
