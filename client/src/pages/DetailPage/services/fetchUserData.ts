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
  let status = PENDING;
  let result: any; // TODO: any 치우기

  const suspender = fetch(`${process.env.REACT_APP_FETCH_URL}${API.DETAIL}${userID}`)
    .then((res) => res.json())
    .then(setFetchDelayPromise(1000)) // TODO: 이거 없애야함 (디버깅용 고의 시간끌기)
    .then((res) => {
      if (res.code !== 10000) throw new Error();
      return res.data;
    })
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
      else return result;
    },
  };
}
