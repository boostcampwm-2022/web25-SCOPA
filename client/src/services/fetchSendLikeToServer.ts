import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchSendLikeToServer(likedId: string, type: string) {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.LIKE}`, {
    credentials: 'include',
    method: type,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likedId }),
  })
    .then(checkStatusCode)
    .then(checkCustomCode)
    .catch((err) => {
      alert(err);
    });
}
