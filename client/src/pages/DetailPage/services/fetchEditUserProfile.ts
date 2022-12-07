import { ProfileType } from 'types/profile';
import { API } from 'utils/constants';

export function fetchEditUserProfile(data: ProfileType) {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.EDIT}`, {
    credentials: 'include',
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) throw new Error();
    console.log(res);
    return res.json();
  });
}
