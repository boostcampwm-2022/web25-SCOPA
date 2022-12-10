import { ProfileType } from 'types/profile';
import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';

const PENDING = 0;
const SUCCESS = 1;
const ERROR = 2;

export function fetchUserData(userID: string | null) {
  let status = PENDING;
  let result: Error | ProfileType;

  const suspender = fetch(`${process.env.REACT_APP_FETCH_URL}${API.DETAIL}${userID}`)
    .then(checkStatusCode)
    .then(checkCustomCode)
    .then(
      (res) => {
        status = SUCCESS;
        result = res;
      },
      (err) => {
        status = ERROR;
        result = err;
      }
    );

  return {
    read: () => {
      if (status === PENDING) throw suspender;
      else if (status === ERROR) throw result;
      else return result as unknown as ProfileType; // Error 타입의 변수의 경우 위에서 반드시 throw됨
    },
  };
}
