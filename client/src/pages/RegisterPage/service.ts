import { API } from 'utils/constants';

interface registerParams {
  username: string;
  interest: string;
  techStack: Array<string>;
}

export function requestRegistration({ username, interest, techStack }: registerParams) {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.REGISTER}`, {
    credentials: 'include',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, interest, techStack }),
  });
}

export function checkIdServerValidation(idDraft: string) {
  // 서버측 id 유효성 검사를 위해 fetch 통신(쿼리스트링)
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.VALIDATE}?${new URLSearchParams({ id: idDraft })}`);
}
