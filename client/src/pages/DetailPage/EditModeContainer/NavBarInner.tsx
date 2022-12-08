/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction } from 'react';

import { Button, Tooltip } from 'common';
import { useShowTooltip, useValidateUsername } from 'hooks';
import { VALIDATION_INFO, VALIDATION_RESULT } from 'utils/constants';

import {
  buttonWrapperStyle,
  cancelButtonStyle,
  editButtonStyle,
  errorIconWrapperStyle,
  inputWrapperStyle,
  usernameEditorInputStyle,
  validateButtonStyle,
} from './NavBarInner.styles';

import { CheckIcon, ErrorIcon, SaveIcon, XIcon } from 'assets/svgs';

interface Props {
  onClickCancelButton: () => void;
  onClickSaveProfile: () => Promise<void>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

export const NavBarInner = ({ onClickCancelButton, onClickSaveProfile, username, setUsername }: Props) => {
  const { handleClickValidateButton, validationType, usernameDraft, handleChangeUsername } = useValidateUsername(
    setUsername,
    username
  );
  const { isTooltipShown, handleMouseOutTooltip, handleMouseOverTooltip } = useShowTooltip();

  return (
    <>
      <div css={inputWrapperStyle}>
        <input type='text' css={usernameEditorInputStyle} value={usernameDraft} onChange={handleChangeUsername} />
        <div
          css={errorIconWrapperStyle(validationType)}
          onFocus={handleMouseOverTooltip}
          onMouseOver={handleMouseOverTooltip}
          onBlur={handleMouseOutTooltip}
          onMouseOut={handleMouseOutTooltip}
        >
          {validationType === VALIDATION_RESULT.SUCCESS ? <CheckIcon /> : <ErrorIcon />}
        </div>
        <Button css={validateButtonStyle} onClick={handleClickValidateButton}>
          <span>중복확인</span>
        </Button>
        {isTooltipShown && <Tooltip text={VALIDATION_INFO[validationType]} />}
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
