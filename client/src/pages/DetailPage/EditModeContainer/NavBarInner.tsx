/** @jsxImportSource @emotion/react */

import { RefObject } from 'react';

import { Button } from 'common';

import {
  buttonWrapperStyle,
  cancelButtonStyle,
  editButtonStyle,
  usernameEditorInputStyle,
  validateButtonStyle,
} from './NavBarInner.styles';

import { SaveIcon, XIcon } from 'assets/svgs';

interface Props {
  onClickCancelButton: () => void;
  onClickSaveProfile: () => Promise<void>;
  usernameRef: RefObject<HTMLInputElement>;
  defaultUsername: string;
}

export const NavBarInner = ({ onClickCancelButton, onClickSaveProfile, usernameRef, defaultUsername }: Props) => {
  return (
    <>
      <div>
        <input type='text' css={usernameEditorInputStyle} ref={usernameRef} defaultValue={defaultUsername} />
        <Button css={validateButtonStyle}>
          <span>중복확인</span>
        </Button>
      </div>
      <div css={buttonWrapperStyle}>
        <Button css={cancelButtonStyle} onClick={onClickCancelButton}>
          <XIcon />
        </Button>
        <Button css={editButtonStyle} onClick={onClickSaveProfile}>
          <>
            <SaveIcon />
            <span>저장</span>
          </>
        </Button>
      </div>
    </>
  );
};
