import { API } from 'utils/constants';

interface Params {
  username: string;
  interest: string;
  techStack: Array<string>;
}

export const requestRegister = ({ username, interest, techStack }: Params) => {
  fetch(`${process.env.REACT_APP_FETCH_URL}${API.REGISTER}`, {
    credentials: 'include',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, interest, techStack }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 10000) {
        alert('회원가입에 성공하였습니다.');
        return true;
      }
      alert('회원가입에 실패하였습니다.');
      return false;
    });
  return false;
};
