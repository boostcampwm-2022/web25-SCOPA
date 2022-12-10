import { COMMON_ERROR } from './constants';

interface JSONResult {
  code: number;
  message: string;
  data?: any;
}

export function checkStatusCode(res: Response) {
  return res.json().then((data) => {
    if (res.status < 400) return data;
    if (data.message) throw new Error(data.message);
    throw new Error(COMMON_ERROR);
  });
}

export function checkCustomCode(res: JSONResult) {
  if (res.code !== 10000) throw new Error(res.message);
  return res.data;
}
