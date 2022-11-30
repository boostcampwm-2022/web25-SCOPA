/** @jsxImportSource @emotion/react */

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import { RESULT } from 'utils/constants';
import { checkIdServerValidation } from './service';

import { idButtonStyle, idInputStyle, idInputWrapperStyle, idValidationStyle } from './idInput.styles';

export const IdInput = ({ setId }: { setId: Dispatch<SetStateAction<string>> }) => {
  // 유효성이 확정되지 않은 예비 ID 값
  const [idDraft, setIdDraft] = useState<string>('');
  const [idWarning, setIdWarning] = useState<string>('');
  const [idServerValidationCheckResult, setIdServerValidationCheckResult] = useState<string>('');
  // Client 및 Server측 Validation에 대한 최종 Valid 여부(안내문구 여부 판단하는 기준으로 활용)
  const [isValid, setIsValid] = useState<number>(RESULT.NULL);

  // 아이디값 입력에 따른 상태관리
  // 사용자의 입력값 변화마다 호출되므로 useCallback으로 최적화
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIdDraft(e.target.value);
  }, []);

  // 클라이언트측 id 유효성 검사
  // 아이디 요소 확인
  // 사용자의 입력값 변화마다 호출되므로 useCallback으로 최적화
  const isValidIdStr = useCallback((id: string) => {
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    return regexEngNum.test(id);
  }, []);

  // 아이디 길이 확인
  // 사용자의 입력값 변화마다 호출되므로 useCallback으로 최적화
  const isValidIdLength = useCallback((id: string) => {
    if (id.length === 0) return true;
    return id.length >= 4 && id.length <= 15;
  }, []);

  // 아이디 유효성 검사
  // 버튼 클릭 시에만 실행되는 전체 유효성 검사이므로 굳이 useCallback을 적용할 필요는 없음
  const isValidId = (id: string) => {
    if (!isValidIdLength(id)) return false;
    return isValidIdStr(id);
  };

  // id값이 유효하면 서버로 보내주기
  // 버튼 클릭이 발생할 때만 일어나는 이벤트이고 id입력 시마다 client측 유효성 검사를 진행하고 있으므로 굳이 useCallback을 적용할만큼 자주 일어나진 않음
  const handleClick = () => {
    if (!isValidId(idDraft)) {
      setIdWarning('4글자 이상, 15글자 이하의 알파벳과 숫자로 작성바랍니다.');
      return;
    }
    // 아이디값 서버측 유효성 검사
    checkIdServerValidation({ idDraft, setId, setIdServerValidationCheckResult, setIdWarning, setIsValid });
  };

  // 사용자가 id값을 입력할때마다 유효성 검사 결과를 알려주어 UX 향상
  useEffect(() => {
    setIdServerValidationCheckResult('');
    if (!isValidIdStr(idDraft)) {
      setIdWarning('알파벳과 숫자로만 이루어져야 합니다.');
      setIsValid(RESULT.FAIL);
      return;
    }
    if (!isValidIdLength(idDraft)) {
      setIdWarning('4글자 이상 15글자 이하만 가능합니다.');
      setIsValid(RESULT.FAIL);
      return;
    }
    setIdWarning('');
    setIsValid(RESULT.NULL);
  }, [idDraft]);

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
