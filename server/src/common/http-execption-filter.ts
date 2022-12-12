import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ErrorInfo } from 'src/common/d';
import { CustomException, errors } from './response/index';

/**
 * 모든 exception을 처리하는 필터
 * throw 된 것인 ErrorInfo, HttpException 혹은 그 외 타입인지 판단하여 CustomException 생성 후 응답 객체로 변환
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | ErrorInfo, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const customException = this.getCustomException(exception);
    const response = customException.getErrorResponse();

    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
    };

    console.log(log);

    res.status(customException.getStatus()).json(response);
  }

  private isErrorInfoType(exception: Error | ErrorInfo) {
    return (
      exception instanceof Array &&
      exception.length === 3 &&
      typeof exception[0] === 'number' &&
      typeof exception[1] === 'string' &&
      typeof exception[2] === 'number'
    );
  }

  private getCustomException(exception: Error | ErrorInfo): CustomException {
    const UNDEFIND_CODE = 99999;

    // 직접 정의한 에러 처리(ErrorInfo)
    if (this.isErrorInfoType(exception)) {
      return new CustomException(...(exception as ErrorInfo));
    }
    console.log((exception as Error)?.stack);
    // 이외 build in exception 혹은 custom exception
    if (exception instanceof HttpException) {
      return new CustomException(
        exception instanceof CustomException
          ? exception.getCode()
          : UNDEFIND_CODE,
        (exception.getResponse() as Record<string, any>)?.message,
        exception.getStatus(),
      );
    }
    // 처리하지 못한 모든 오류는 internal server error
    return new CustomException(...errors.INTERNER_ERROR);
  }
}
