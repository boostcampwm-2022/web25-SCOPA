/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MiniNavBar } from 'common';
import { ViewModeContainer } from './ViewModeContainer';
import { MockUpData } from './mockData';
import { EditModeContainer } from './EditModeContainer';

import { detailProfileWrapperStyle, editButtonStyle, nicknameSpanStyle } from './styles';

import { EditIcon, SaveIcon } from 'assets/svgs';

const VIEW_MODE = true;
const EDIT_MODE = false;

export const DetailPage = () => {
  const { id } = useParams();
  const [mode, setMode] = useState(VIEW_MODE);

  const handleClickEditButton = useCallback(() => {
    setMode((prevState) => !prevState);
  }, [mode]);

  return (
    <>
      <MiniNavBar>
        <>
          {mode === EDIT_MODE ? <input type='text' /> : <span css={nicknameSpanStyle}>{MockUpData.nickname}</span>}
          <button type='button' css={editButtonStyle} onClick={handleClickEditButton}>
            {mode === EDIT_MODE ? <SaveIcon /> : <EditIcon />}
          </button>
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        {mode === EDIT_MODE ? (
          <EditModeContainer profileData={MockUpData} />
        ) : (
          <ViewModeContainer profileData={MockUpData} />
        )}
      </div>
    </>
  );
};
