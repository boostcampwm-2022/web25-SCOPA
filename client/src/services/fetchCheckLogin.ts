import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchCheckLogin() {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.CHECK}`, {
    credentials: 'include',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(checkStatusCode)
    .then(checkCustomCode);
}
