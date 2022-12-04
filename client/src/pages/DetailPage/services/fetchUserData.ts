import { API } from 'utils/constants';

const PENDING = 0;
const SUCCESS = 1;
const ERROR = 2;

export const setFetchDelayPromise = (ms: number) => {
  return (x: any) => {
    return new Promise<any>((resolve) => {
      setTimeout(() => resolve(x), ms);
    });
  };
};

export function fetchUserData(userID: string | null) {
  if (!userID) throw new Error('ID가 입력되지 않았습니다!');
  let status = PENDING;
  let result: any;

  const suspender = fetch(`${process.env.REACT_APP_FETCH_URL}${API.DETAIL}${userID}`)
    .then((res) => res.json())
    .then((res) => setFetchDelayPromise(1000)(res))
    .then(
      (res) => {
        status = SUCCESS;
        return res;
      },
      (err) => {
        status = ERROR;
        return err;
      }
    );

  return {
    read: () => {
      if (status === PENDING) throw suspender;
      else if (status === ERROR) throw result;
      else return result;
    },
  };
}
