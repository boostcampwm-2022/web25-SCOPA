import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { ErrorInfo } from 'src/d';
import { Request, Response } from 'express';
import { CustomException, errors } from './response/error-response';

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
    let customException: CustomException;

    // 직접 정의한 에러 처리(ErrorInfo)
    if (this.isErrorInfoType(exception)) {
      customException = new CustomException(...(exception as ErrorInfo));
    } // 이외 build in exception 혹은 custom exception
    else if (exception instanceof HttpException) {
      customException = new CustomException(
        exception instanceof CustomException ? exception.getCode() : 99999,
        exception.message,
        exception.getStatus(),
      );
    } // 처리하지 못한 모든 오류는 internal server error
    else {
      customException = new CustomException(...errors.INTERNER_ERROR);
    }

    return customException;
  }
}
