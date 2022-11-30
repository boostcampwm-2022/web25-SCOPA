import { API } from 'utils/constants';

interface registerParams {
  username: string;
  interest: string;
  techStack: Array<string>;
}

export const isRegisterRequestDone = async ({ username, interest, techStack }: registerParams) => {
  const res = await fetch(`${process.env.REACT_APP_FETCH_URL}${API.REGISTER}`, {
    credentials: 'include',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, interest, techStack }),
  });
  return res;
};

export const checkIdServerValidation = async (idDraft: string) => {
  // 서버측 id 유효성 검사를 위해 fetch 통신(쿼리스트링)
  const res = await fetch(`${process.env.REACT_APP_FETCH_URL}${API.VALIDATE}?${new URLSearchParams({ id: idDraft })}`);
  return res;
};
