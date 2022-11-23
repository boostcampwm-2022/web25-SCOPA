/** @jsxImportSource @emotion/react */

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { API, RESULT } from 'utils/constants';

import {
  idValidationStyle,
  registerPageIdButtonStyle,
  registerPageInputStyle,
  registerPageInputWrapperStyle,
} from './styles';

export const IdInput = ({ setId }: { setId: Dispatch<SetStateAction<string>> }) => {
  const [idDraft, setIdDraft] = useState<string>('');
  const [idWarning, setIdWarning] = useState<string>('');
  const [idDuplicationCheckResult, setIdDuplicationCheckResult] = useState<string>('');

  // 아이디값 입력에 따른 상태관리
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIdDraft(e.target.value);
  }, []);

  // 서버측 id 유효성 검사를 위해 fetch 통신(쿼리스트링)
  // code 10000 : 유효한ID, 10001 : 유효하지않음, 10002: 중복됨
  const sendIdToServer = useCallback(() => {
    fetch(`${process.env.REACT_APP_FETCH_URL}${API.VALIDATE}?${new URLSearchParams({ id: idDraft })}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 10000) {
          setId(idDraft);
          setIdDuplicationCheckResult('유효한 아이디 입니다.');
          return;
        }
        if (res.code === 20001) {
          setIdWarning('유효하지 않은 Id 형식입니다.');
          return;
        }
        if (res.code === 20002) {
          setIdWarning('중복되는 Id 입니다.');
        }
      })
      .catch(() => {
        setIdWarning('중복검사에 실패했습니다.');
      });
  }, [idDraft]);

  // 클라이언트측 id 유효성 검사
  // 아이디 요소 확인
  const isValidIdStr = useCallback((id: string) => {
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    return regexEngNum.test(id);
  }, []);

  // 아이디 길이 확인
  const isValidIdLength = useCallback((id: string) => {
    if (id.length == 0) return true;
    return id.length >= 4 && id.length <= 15;
  }, []);

  // 아이디 유효성 검사
  const isValidId = useCallback(() => {
    if (!isValidIdLength(idDraft)) return false;
    return isValidIdStr(idDraft);
  }, [idDraft]);

  // id값이 유효하면 서버로 보내주기
  const handleClick = useCallback(() => {
    if (!isValidId()) {
      setIdWarning('4글자 이상, 10글자 이하의 알파벳과 숫자로 작성바랍니다.');
      return;
    }
    sendIdToServer();
  }, [idDraft]);

  // 사용자가 id값을 입력할때마다 검사
  useEffect(() => {
    setIdDuplicationCheckResult('');
    if (!isValidIdStr(idDraft)) {
      setIdWarning('알파벳과 숫자로만 이루어져야 합니다.');
      return;
    }
    if (!isValidIdLength(idDraft)) {
      setIdWarning('4글자 이상 10글자 이하만 가능합니다.');
      return;
    }
    setIdWarning('');
  }, [idDraft]);

  const isAllValid = useCallback(() => {
    if (idWarning.length > 0) return RESULT.FAIL;
    if (idDuplicationCheckResult.length > 0) return RESULT.SUCCESS;
    return RESULT.NULL;
  }, [idWarning, idDuplicationCheckResult]);

  return (
    <div>
      <div css={registerPageInputWrapperStyle}>
        <input
          css={css(registerPageInputStyle, { width: 300 })}
          placeholder='아이디'
          value={idDraft}
          onChange={handleOnChange}
        />
        <button type='button' css={registerPageIdButtonStyle} onClick={handleClick}>
          <span>중복확인</span>
        </button>
      </div>
      {isAllValid() !== RESULT.NULL && (
        <span css={idValidationStyle(isAllValid())}>
          {isAllValid() === RESULT.FAIL ? idWarning : idDuplicationCheckResult}
        </span>
      )}
    </div>
  );
};
