import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  readonly code: number;
  constructor(code: number, message: string, statusCode: number) {
    super(message, statusCode);
    this.code = code;
  }
}

export const errors: { [key: string]: [number, string, number] } = {
  INTERNER_ERROR: [
    99999,
    '내부 오류가 발생했습니다.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ],
  INVALID_ID: [20001, '유효하지 않은 ID 입니다.', HttpStatus.BAD_REQUEST],
  ID_DUPLICATED: [20002, '중복된 ID 입니다.', HttpStatus.BAD_REQUEST],
  NOT_LOGGED_IN: [20003, '로그인 상태가 아닙니다.', HttpStatus.UNAUTHORIZED],
  REGIST_FAIL: [20004, '회원가입 실패', HttpStatus.BAD_REQUEST],
};
