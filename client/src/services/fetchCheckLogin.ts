import { API } from 'utils/constants';

export function fetchCheckLogin() {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.CHECK}`, {
    credentials: 'include',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (response.status !== 200) throw new Error();
    return response.json();
  });
}
