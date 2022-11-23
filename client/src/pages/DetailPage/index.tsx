/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MiniNavBar } from 'common';
import { ViewModeContainer } from './ViewModeContainer';
import { MockUpData } from './mockData';
import { EditModeContainer } from './EditModeContainer';

import { detailProfileWrapperStyle, editButtonStyle, nicknameEditorInputStyle, nicknameSpanStyle } from './styles';

import { EditIcon, SaveIcon } from 'assets/svgs';
import { useSetEditor } from './EditModeContainer/useSetEditor';

const VIEW_MODE = true;
const EDIT_MODE = false;

export const DetailPage = () => {
  const { id } = useParams();
  const [mode, setMode] = useState(VIEW_MODE);
  const { newProfileData, handleChangeNickname } = useSetEditor(id as string, MockUpData);

  const handleClickEditButton = useCallback(() => {
    setMode((prevState) => !prevState);
  }, [mode]);

  return (
    <>
      <MiniNavBar>
        <>
          {mode === EDIT_MODE ? (
            <input
              type='text'
              value={newProfileData.nickname}
              onChange={handleChangeNickname}
              css={nicknameEditorInputStyle}
            />
          ) : (
            <span css={nicknameSpanStyle}>{MockUpData.nickname}</span>
          )}
          <button type='button' css={editButtonStyle} onClick={handleClickEditButton}>
            {mode === EDIT_MODE ? <SaveIcon /> : <EditIcon />}
          </button>
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        {mode === EDIT_MODE ? (
          <EditModeContainer userId={id as string} profileData={MockUpData} />
        ) : (
          <ViewModeContainer profileData={MockUpData} />
        )}
      </div>
    </>
  );
};
