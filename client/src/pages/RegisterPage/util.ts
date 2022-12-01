// 클라이언트측 id 유효성 검사
// 아이디 요소 확인
export const isValidIdStr = (id: string) => {
  const regexEngNum = /^[a-zA-Z0-9]*$/;
  return regexEngNum.test(id);
};

// 아이디 길이 확인
export const isValidIdLength = (id: string) => {
  if (id.length === 0) return true;
  return id.length >= 4 && id.length <= 15;
};

// 아이디 유효성 검사
export const isValidId = (id: string) => {
  if (!isValidIdLength(id)) return false;
  return isValidIdStr(id);
};
