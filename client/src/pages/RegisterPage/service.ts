import { API } from 'utils/constants';
import { Dispatch, SetStateAction } from 'react';

interface registerParams {
  username: string;
  interest: string;
  techStack: Array<string>;
}

export const isRegisterRequestSucceed = ({ username, interest, techStack }: registerParams) => {
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
  setIdDuplicationCheckResult: Dispatch<SetStateAction<string>>;
  setIdWarning: Dispatch<SetStateAction<string>>;
}

export const checkIdValidation = ({
  idDraft,
  setId,
  setIdDuplicationCheckResult,
  setIdWarning,
}: idValidationParams) => {
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
};
