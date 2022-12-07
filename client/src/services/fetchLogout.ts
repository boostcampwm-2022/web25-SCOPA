import { API } from 'utils/constants';

export function fetchLogout() {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.LOGOUT}`, {
    credentials: 'include',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    if (res.status !== 200) throw new Error();
    return res.json();
  });
}
