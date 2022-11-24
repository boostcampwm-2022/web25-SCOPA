/** @jsxImportSource @emotion/react */

import { useState } from 'react';

import { MiniNavBar } from 'common';
import { ProfileType } from 'types/profile';
import { BottomProfileEditor } from './BottomProfileEditor';
import { CodeEditor } from './CodeEditor';
import { TopProfileEditor } from './TopProfileEditor';

import { nicknameEditorInputStyle, editButtonStyle, detailProfileWrapperStyle } from '../styles';

import { SaveIcon } from 'assets/svgs';

interface Props {
  userId: string;
  profileData: ProfileType;
  onClickCancelButton: () => void;
}

export const EditModeContainer = ({ userId, profileData, onClickCancelButton }: Props) => {
  return (
    <>
      <MiniNavBar>
        <>
          <input type='text' css={nicknameEditorInputStyle} />
          <button type='button' css={editButtonStyle} onClick={onClickCancelButton}>
            <SaveIcon />
          </button>
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <CodeEditor />
        <TopProfileEditor userId={userId} profileData={profileData} />
        <BottomProfileEditor userId={userId} profileData={profileData} />
      </div>
    </>
  );
};
