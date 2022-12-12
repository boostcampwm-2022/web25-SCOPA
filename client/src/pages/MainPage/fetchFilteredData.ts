import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchFilteredData(paramObject: URLSearchParams) {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.PROFILE}?${paramObject}`, {
    credentials: 'include',
  })
    .then(checkStatusCode)
    .then(checkCustomCode)
    .catch((err) => {
      alert(err);
    });
}
