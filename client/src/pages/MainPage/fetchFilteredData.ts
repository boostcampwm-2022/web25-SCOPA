import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchFilteredData(paramObject: Record<string, string>) {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.PROFILE}?${new URLSearchParams(paramObject)}`)
    .then(checkStatusCode)
    .then(checkCustomCode)
    .catch((err) => {
      alert(err);
    });
}
