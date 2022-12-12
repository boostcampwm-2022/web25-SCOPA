import { API } from 'utils/constants';
import { checkStatusCode, checkCustomCode } from 'utils/fetchUtils';

export function fetchSendMessage(userId: string, content: string) {
  return fetch(`${process.env.REACT_APP_FETCH_URL}${API.MESSAGE_SEND}`, {
    credentials: 'include',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: userId,
      content,
    }),
  })
    .then(checkStatusCode)
    .then(checkCustomCode);
}
