/** @jsxImportSource @emotion/react */

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import { checkIdServerValidation } from './service';
import { isValidId, isValidIdLength, isValidIdStr } from './util';
import { VALIDATION_INFO, VALIDATION_RESULT } from './constants';

import { idButtonStyle, idInputStyle, idInputWrapperStyle, idValidationStyle } from './idInput.styles';

export const IdInput = ({ setId }: { setId: Dispatch<SetStateAction<string>> }) => {
  // 유효성이 확정되지 않은 예비 ID 값
  const [idDraft, setIdDraft] = useState<string>('');
  const [validationType, setValidationType] = useState<number>(VALIDATION_RESULT.NULL);

  // 아이디값 입력에 따른 상태관리
  // 사용자의 입력값 변화마다 호출되므로 useCallback으로 최적화
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIdDraft(e.target.value);
  }, []);

  // id값이 유효하면 서버로 보내주기
  // 버튼 클릭이 발생할 때만 일어나는 이벤트이고 id입력 시마다 client측 유효성 검사를 진행하고 있으므로 굳이 useCallback을 적용할만큼 자주 일어나진 않음
  const handleClick = () => {
    if (!isValidId(idDraft)) {
      return;
    }
    // 아이디값 서버측 유효성 검사
    checkIdServerValidation(idDraft)
      .then((res) => res.json())
      // code 10000 : 유효한ID, 10001 : 유효하지않음, 10002: 중복됨
      .then((res) => {
        if (res.code === 10000) {
          setId(idDraft);
          setValidationType(VALIDATION_RESULT.SUCCESS);
          return;
        }
        if (res.code === 20001) {
          setValidationType(VALIDATION_RESULT.WRONG_STR);
          return;
        }
        if (res.code === 20002) {
          setValidationType(VALIDATION_RESULT.DUPLICATED);
        }
      })
      .catch(() => {
        setValidationType(VALIDATION_RESULT.NULL);
        alert('잠시 후 다시 시도해주세요.');
      });
  };

  // 사용자가 id값을 입력할때마다 유효성 검사 결과를 알려주어 UX 향상
  useEffect(() => {
    setValidationType(VALIDATION_RESULT.NULL);
    if (!isValidIdStr(idDraft)) {
      setValidationType(VALIDATION_RESULT.WRONG_STR);
      return;
    }
    if (!isValidIdLength(idDraft)) {
      setValidationType(VALIDATION_RESULT.WRONG_LENGTH);
      return;
    }
    setValidationType(VALIDATION_RESULT.NULL);
  }, [idDraft]);

  return (
    <>
      <div css={idInputWrapperStyle(validationType)}>
        <input placeholder='아이디' value={idDraft} onChange={handleOnChange} css={idInputStyle} />
        <button type='button' aria-label='중복확인' onClick={handleClick} css={idButtonStyle}>
          <span>중복확인</span>
        </button>
      </div>
      {validationType !== VALIDATION_RESULT.NULL && (
        <span css={idValidationStyle(validationType)}>{VALIDATION_INFO[validationType]}</span>
      )}
    </>
  );
};
