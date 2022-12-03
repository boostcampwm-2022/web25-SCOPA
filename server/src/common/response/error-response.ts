import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorInfo, ErrorResponse } from '../../d';

export class CustomException extends HttpException {
  private readonly code: number;
  constructor(
    code: number,
    message: string | Record<string, any>,
    statusCode: number,
  ) {
    super(message, statusCode);
    this.code = code;
  }

  getCode(): number {
    return this.code;
  }

  getErrorResponse(): ErrorResponse {
    return {
      code: this.code,
      message: this.getResponse(),
    };
  }
}

export const errors: { readonly [key: string]: ErrorInfo } = {
  INTERNER_ERROR: [
    99999,
    '내부 오류가 발생했습니다.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ],
  INVALID_ID: [20001, '유효하지 않은 ID 입니다.', HttpStatus.BAD_REQUEST],
  ID_DUPLICATED: [20002, '중복된 ID 입니다.', HttpStatus.BAD_REQUEST],
  NOT_LOGGED_IN: [20003, '로그인 상태가 아닙니다.', HttpStatus.UNAUTHORIZED],
  REGIST_FAIL: [20004, '회원가입 실패', HttpStatus.BAD_REQUEST],
  INVALID_AUTH_CODE: [
    20005,
    '유효하지 않은 authorization code입니다.',
    HttpStatus.UNAUTHORIZED,
  ],
  NOT_MATCHED_USER: [
    20006,
    '일치하는 유저 정보가 없습니다.',
    HttpStatus.BAD_REQUEST,
  ],
  LOGGED_IN: [20007, '이미 로그인 했습니다.', HttpStatus.UNAUTHORIZED],
  NOT_OAUTH_LOGGED_IN: [
    20008,
    '소셜 로그인이 필요합니다.',
    HttpStatus.UNAUTHORIZED,
  ],
  INVALID_SESSION: [
    20009,
    '유효하지 않은 세션입니다.',
    HttpStatus.UNAUTHORIZED,
  ],
  ALREADY_EXIST_ID: [
    40001,
    '이미 좋아요 리스트에 존재하는 사용자입니다.',
    HttpStatus.BAD_REQUEST,
  ],
};
