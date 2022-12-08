import { COMMON_ERROR } from './constants';

interface JSONResult {
  code: number;
  message: string;
  data?: any;
}

export function checkStatusCode(res: Response) {
  if (res.status >= 400) throw new Error(COMMON_ERROR);
  return res.json();
}

export function checkCustomCode(res: JSONResult) {
  if (res.code !== 10000) throw new Error(res.message);
  return res.data;
}
