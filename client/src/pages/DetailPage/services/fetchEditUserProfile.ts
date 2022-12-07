import { ProfileType } from 'types/profile';
import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchEditUserProfile(data: ProfileType) {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.EDIT}`, {
    credentials: 'include',
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(checkStatusCode)
    .then(checkCustomCode);
}
