import { Dispatch, SetStateAction } from 'react';

import { API, RESULT } from 'utils/constants';

interface registerParams {
  username: string;
  interest: string;
  techStack: Array<string>;
}

export const isRegisterRequestDone = ({ username, interest, techStack }: registerParams) => {
  fetch(`${process.env.REACT_APP_FETCH_URL}${API.REGISTER}`, {
    credentials: 'include',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, interest, techStack }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 10000) {
        alert('회원가입에 성공하였습니다.');
        return true;
      }
      alert('회원가입에 실패하였습니다.');
      return false;
    });
  return false;
};

interface idValidationParams {
  idDraft: string;
  setId: Dispatch<SetStateAction<string>>;
  setIdServerValidationCheckResult: Dispatch<SetStateAction<string>>;
  setIdWarning: Dispatch<SetStateAction<string>>;
  setIsValid: Dispatch<SetStateAction<number>>;
}

export const checkIdServerValidation = ({
  idDraft,
  setId,
  setIdServerValidationCheckResult,
  setIdWarning,
  setIsValid,
}: idValidationParams) => {
  // 서버측 id 유효성 검사를 위해 fetch 통신(쿼리스트링)
  fetch(`${process.env.REACT_APP_FETCH_URL}${API.VALIDATE}?${new URLSearchParams({ id: idDraft })}`)
    .then((res) => res.json())
    // code 10000 : 유효한ID, 10001 : 유효하지않음, 10002: 중복됨
    .then((res) => {
      if (res.code === 10000) {
        setId(idDraft);
        setIdServerValidationCheckResult('유효한 아이디 입니다.');
        setIsValid(RESULT.SUCCESS);
        return;
      }
      if (res.code === 20001) {
        setIdWarning('유효하지 않은 Id 형식입니다.');
        setIsValid(RESULT.FAIL);
        return;
      }
      if (res.code === 20002) {
        setIdWarning('중복되는 Id 입니다.');
        setIsValid(RESULT.FAIL);
      }
    })
    .catch(() => {
      setIdWarning('중복검사에 실패했습니다.');
    });
};
