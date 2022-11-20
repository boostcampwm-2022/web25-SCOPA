import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ErrorInfo } from 'src/d';
import { Request, Response } from 'express';
import { CustomException, errors } from './response/error-response';

/**
 * throw 된 것인 ErrorInfo, HttpException 혹은 그 외 타입인지 판단하여 CustomException 생성 후 응답 객체로 변환
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | ErrorInfo, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // 직접 정의한 에러 처리(ErrorInfo)
    if (this.isErrorInfoType(exception)) {
      exception = new CustomException(...(exception as ErrorInfo));
    } // 이외 build in exception 혹은 custom exception
    else if (exception instanceof HttpException) {
      exception = new CustomException(
        exception instanceof CustomException ? exception.getCode() : 99999,
        exception.message,
        exception.getStatus(),
      );
    } // 처리하지 못한 모든 오류는 internal server error
    else {
      exception = new CustomException(...errors.INTERNER_ERROR);
    }

    // exception은 모두 CustomException이 되는데 타입 추론이 안되는 이유가...?
    const response = (exception as CustomException).getErrorResponse();

    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
    };

    console.log(log);

    res.status((exception as CustomException).getStatus()).json(response);
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
}
