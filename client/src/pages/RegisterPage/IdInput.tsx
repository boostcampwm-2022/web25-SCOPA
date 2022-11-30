/** @jsxImportSource @emotion/react */

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import { RESULT } from 'utils/constants';

import { idButtonStyle, idInputStyle, idInputWrapperStyle, idValidationStyle } from './idInput.styles';
import { checkIdServerValidation } from './service';

export const IdInput = ({ setId }: { setId: Dispatch<SetStateAction<string>> }) => {
  const [idDraft, setIdDraft] = useState<string>('');
  const [idWarning, setIdWarning] = useState<string>('');
  const [idServerValidationCheckResult, setIdServerValidationCheckResult] = useState<string>('');
  const [isValid, setIsValid] = useState<number>(RESULT.NULL);

  // 아이디값 입력에 따른 상태관리
  // input change가 일어날 때마다 계속 사용되는 함수이므로 useCallback처리함
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIdDraft(e.target.value);
  }, []);

  // 클라이언트측 id 유효성 검사
  // 아이디 요소 확인
  const isValidIdStr = useCallback((id: string) => {
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    return regexEngNum.test(id);
  }, []);

  // 아이디 길이 확인
  const isValidIdLength = useCallback((id: string) => {
    if (id.length === 0) return true;
    return id.length >= 4 && id.length <= 15;
  }, []);

  // 아이디 유효성 검사
  const isValidId = useCallback((id: string) => {
    if (!isValidIdLength(id)) return false;
    return isValidIdStr(id);
  }, []);

  // id값이 유효하면 서버로 보내주기
  const handleClick = () => {
    if (!isValidId(idDraft)) {
      setIdWarning('4글자 이상, 15글자 이하의 알파벳과 숫자로 작성바랍니다.');
      return;
    }
    // 아이디값 서버측 유효성 검사
    checkIdServerValidation({ idDraft, setId, setIdServerValidationCheckResult, setIdWarning });
  };

  // 사용자가 id값을 입력할때마다 검사
  useEffect(() => {
    setIdServerValidationCheckResult('');
    if (!isValidIdStr(idDraft)) {
      setIdWarning('알파벳과 숫자로만 이루어져야 합니다.');
      return;
    }
    if (!isValidIdLength(idDraft)) {
      setIdWarning('4글자 이상 15글자 이하만 가능합니다.');
      return;
    }
    setIdWarning('');
  }, [idDraft]);

  useEffect(() => {
    if (idWarning.length > 0) return setIsValid(RESULT.FAIL);
    if (idServerValidationCheckResult.length > 0) return setIsValid(RESULT.SUCCESS);
    return setIsValid(RESULT.NULL);
  }, [idWarning, idServerValidationCheckResult]);

  return (
    <>
      <div css={idInputWrapperStyle(isValid)}>
        <input placeholder='아이디' value={idDraft} onChange={handleOnChange} css={idInputStyle} />
        <button type='button' onClick={handleClick} css={idButtonStyle}>
          <span>중복확인</span>
        </button>
      </div>
      {isValid !== RESULT.NULL && (
        <span css={idValidationStyle(isValid)}>
          {isValid === RESULT.FAIL ? idWarning : idServerValidationCheckResult}
        </span>
      )}
    </>
  );
};
