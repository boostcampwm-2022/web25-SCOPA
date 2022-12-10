import { ProfileType } from 'types/profile';
import { API, FETCH_STATUS } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

export function fetchUserData(userID: string | null) {
  let status = FETCH_STATUS.PENDING;
  let result: Error | ProfileType;

  const suspender = fetch(`${process.env.REACT_APP_FETCH_URL}${API.DETAIL}${userID}`)
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
      else if (status === FETCH_STATUS.ERROR) throw result;
      else return result as unknown as ProfileType; // Error 타입의 변수의 경우 위에서 반드시 throw됨
    },
  };
}
