/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction } from 'react';

import { VALIDATION_INFO, VALIDATION_RESULT } from 'utils/constants';
import { useValidateUsername } from 'hooks';

import {
  usernameButtonStyle,
  usernameInputStyle,
  usernameInputWrapperStyle,
  usernameValidationStyle,
} from './usernameInput.styles';

export const UsernameInput = ({ setUsername }: { setUsername: Dispatch<SetStateAction<string>> }) => {
  const { validationType, handleClickValidateButton, usernameDraft, handleChangeUsername } =
    useValidateUsername(setUsername);

  return (
    <>
      <div css={usernameInputWrapperStyle(validationType)}>
        <input placeholder='아이디' value={usernameDraft} onChange={handleChangeUsername} css={usernameInputStyle} />
        <button type='button' aria-label='중복확인' onClick={handleClickValidateButton} css={usernameButtonStyle}>
          <span>중복확인</span>
        </button>
      </div>
      {validationType !== VALIDATION_RESULT.NULL && (
        <span css={usernameValidationStyle(validationType)}>{VALIDATION_INFO[validationType]}</span>
      )}
    </>
  );
};
