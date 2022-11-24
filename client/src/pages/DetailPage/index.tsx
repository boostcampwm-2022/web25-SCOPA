/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ViewModeContainer } from './ViewModeContainer';
import { MockUpData } from './mockData';
import { EditModeContainer } from './EditModeContainer';

const VIEW_MODE = true;
const EDIT_MODE = false;

export const DetailPage = () => {
  const { id } = useParams();
  const [mode, setMode] = useState(VIEW_MODE);

  const handleClickEditButton = useCallback(() => {
    setMode((prevState) => !prevState);
  }, [mode]);

  return mode === EDIT_MODE ? (
    <EditModeContainer userId={id as string} profileData={MockUpData} onClickCancelButton={handleClickEditButton} />
  ) : (
    <ViewModeContainer profileData={MockUpData} onClickEditButton={handleClickEditButton} />
  );
};
