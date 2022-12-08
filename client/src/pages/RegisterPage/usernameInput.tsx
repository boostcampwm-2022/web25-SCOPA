/** @jsxImportSource @emotion/react */

import { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

import { VALIDATION_INFO, VALIDATION_RESULT } from 'utils/constants';
import { useValidateUsername } from 'hooks';

import {
  usernameButtonStyle,
  usernameInputStyle,
  usernameInputWrapperStyle,
  usernameValidationStyle,
} from './usernameInput.styles';

export const UsernameInput = ({ setUsername }: { setUsername: Dispatch<SetStateAction<string>> }) => {
  const [usernameDraft, setUsernameDraft] = useState<string>('');
  const { validationType, handleClickValidateButton } = useValidateUsername(usernameDraft, setUsername);

  const handleChangeUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setUsernameDraft(e.currentTarget.value),
    []
  );

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
