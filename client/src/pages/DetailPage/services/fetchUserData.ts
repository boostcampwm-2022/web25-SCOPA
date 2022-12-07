import { ProfileType } from 'types/profile';
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
  let result: Error | { data: ProfileType };

  const suspender = fetch(`${process.env.REACT_APP_FETCH_URL}${API.DETAIL}${userID}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.code !== 10000) throw new Error('유저 정보가 존재하지 않습니다');
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
      else return result as unknown as ProfileType; // Error 타입의 변수의 경우 위에서 반드시 throw됨
    },
  };
}
