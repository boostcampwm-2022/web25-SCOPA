import { SingleMessageType } from 'types/message';
import { API, FETCH_STATUS } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchMessageDetail(userID: string) {
  let status = FETCH_STATUS.PENDING;
  let result: Error | SingleMessageType[];

  //   const suspender = fetch(`${process.env.REACT_APP_FETCH_URL}${API.MESSAGE_DETAIL}`)
  const suspender = fetch(`/dummy-${userID}.json`)
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
      return result as unknown as SingleMessageType[];
    },
  };
}
