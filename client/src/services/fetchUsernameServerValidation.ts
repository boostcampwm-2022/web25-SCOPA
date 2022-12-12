import { API } from 'utils/constants';
import { checkStatusCode } from 'utils/fetchUtils';

export function fetchUsernameServerValidation(usernameDraft: string) {
  // 서버측 id 유효성 검사를 위해 fetch 통신(쿼리스트링)
  return fetch(
    `${process.env.REACT_APP_FETCH_URL}${API.VALIDATE}?${new URLSearchParams({ username: usernameDraft })}`
  ).then(checkStatusCode);
}
