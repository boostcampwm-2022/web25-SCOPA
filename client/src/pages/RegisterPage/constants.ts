export const VALIDATION_RESULT = {
  SUCCESS: 'SUCCESS',
  WRONG_STR: 'WRONG_STR',
  WRONG_LENGTH: 'WRONG_LENGTH',
  DUPLICATED: 'DUPLICATED',
  CLIENT_FAIL: 'CLINET_FARL',
  NULL: 'NULL',
};

export const VALIDATION_INFO: Record<string, string> = {
  SUCCESS: '유효한 아이디 입니다.',
  WRONG_STR: '알파벳과 숫자로만 이루어져야 합니다.',
  WRONG_LENGTH: '4글자 이상 15글자 이하만 가능합니다.',
  DUPLICATED: '중복되는 Id 입니다.',
  CLIENT_FAIL: '4글자 이상, 15글자 이하의 알파벳과 숫자로 작성바랍니다.',
};
