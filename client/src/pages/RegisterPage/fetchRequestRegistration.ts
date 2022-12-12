import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

interface registerParams {
  username: string;
  interest: string;
  techStack: Array<string>;
}

export function fetchRequestRegistration({ username, interest, techStack }: registerParams) {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.REGISTER}`, {
    credentials: 'include',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, interest, techStack }),
  })
    .then(checkStatusCode)
    .then(checkCustomCode);
}
