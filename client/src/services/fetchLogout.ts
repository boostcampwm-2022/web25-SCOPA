import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchLogout() {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.LOGOUT}`, {
    credentials: 'include',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(checkStatusCode)
    .then(checkCustomCode);
}
