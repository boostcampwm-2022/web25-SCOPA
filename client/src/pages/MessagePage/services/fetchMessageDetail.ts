import { MessageDetailType } from 'types/message';
import { API, FETCH_STATUS } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchMessageDetail(userId: string | null) {
  if (!userId) throw new Error('존재하지 않는 아이디입니다');
  let status = FETCH_STATUS.PENDING;
  let result: Error | MessageDetailType;

  const suspender = fetch(`${process.env.REACT_APP_FETCH_URL}${API.MESSAGE_DETAIL}${userId}`, {
    credentials: 'include',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(checkStatusCode)
    .then(checkCustomCode)
    .then(
      (res) => {
        status = FETCH_STATUS.SUCCESS;
        result = res;
      },
      (err) => {
        status = FETCH_STATUS.ERROR;
        result = err;
      }
    );

  return {
    read: () => {
      if (status === FETCH_STATUS.PENDING) throw suspender;
      if (status === FETCH_STATUS.ERROR) throw result;
      return result as unknown as MessageDetailType;
    },
  };
}
