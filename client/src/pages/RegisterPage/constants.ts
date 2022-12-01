export const VALIDATION_RESULT: Readonly<Record<string, number>> = {
  NULL: 0,
  SUCCESS: 1,
  WRONG_STR: 2,
  WRONG_LENGTH: 3,
  DUPLICATED: 4,
  CLIENT_FAIL: 5,
};

export const VALIDATION_INFO: Readonly<Record<string, string>> = {
  1: '유효한 아이디 입니다.',
  2: '알파벳과 숫자로만 이루어져야 합니다.',
  3: '4글자 이상 15글자 이하만 가능합니다.',
  4: '중복되는 Id 입니다.',
  5: '4글자 이상, 15글자 이하의 알파벳과 숫자로 작성바랍니다.',
};
